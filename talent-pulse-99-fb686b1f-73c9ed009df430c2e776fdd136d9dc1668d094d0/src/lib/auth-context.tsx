import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User as SbUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export type AppRole = "admin" | "hr" | "candidate";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  gender: string | null;
  dob: string | null;
  qualification: string | null;
  college: string | null;
  cgpa: string | null;
  experience: string | null;
  is_fresher: boolean | null;
  skills: string[];
  languages: string[];
  certificates: string[];
  projects: { name: string; tech: string; desc: string }[];
  internships: { role: string; company: string; duration: string; desc: string }[];
  resume_name: string | null;
  resume_url: string | null;
  resume_uploaded_at: string | null;
  avatar_url: string | null;
}

interface AuthState {
  user: SbUser | null;
  session: Session | null;
  profile: Profile | null;
  roles: AppRole[];
  primaryRole: AppRole;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    skills: data.skills ?? [],
    languages: data.languages ?? [],
    certificates: data.certificates ?? [],
    projects: (data.projects as any) ?? [],
    internships: (data.internships as any) ?? [],
    avatar_url: (data as any).avatar_url ?? null,
  } as Profile;
}

async function fetchRoles(userId: string): Promise<AppRole[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return ((data ?? []) as { role: AppRole }[]).map((r) => r.role);
}

function pickPrimary(roles: AppRole[]): AppRole {
  if (roles.includes("admin")) return "admin";
  if (roles.includes("hr")) return "hr";
  return "candidate";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SbUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  const hydrate = async (u: SbUser | null) => {
    if (!u) {
      setProfile(null);
      setRoles([]);
      return;
    }
    const [p, r] = await Promise.all([fetchProfile(u.id), fetchRoles(u.id)]);
    setProfile(p);
    setRoles(r);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setTimeout(() => { hydrate(s?.user ?? null); }, 0);
    });
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      await hydrate(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    await hydrate(user);
  };

  const signUp: AuthState["signUp"] = async (email, password, fullName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/candidate`,
        data: { full_name: fullName },
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn: AuthState["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signInGoogle: AuthState["signInGoogle"] = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return { error: (result.error as any).message ?? "Google sign-in failed" };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setRoles([]);
  };

  const primaryRole = pickPrimary(roles);

  return (
    <AuthContext.Provider
      value={{ user, session, profile, roles, primaryRole, loading, signUp, signIn, signInGoogle, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
