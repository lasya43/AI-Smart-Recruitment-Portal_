import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Mail, Lock, User, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — SmartRecruit" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signUp, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) {
      setLoading(false);
      toast.error(error);
      return;
    }

    // With auto-confirm on, signUp usually creates a session. If not, sign in explicitly.
    let { data: sess } = await supabase.auth.getSession();
    if (!sess.session) {
      await supabase.auth.signInWithPassword({ email, password });
      sess = (await supabase.auth.getSession()).data;
    }
    const uid = sess.session?.user.id;

    // Optional resume upload
    if (uid && resume) {
      const path = `${uid}/${Date.now()}_${resume.name}`;
      const { error: upErr } = await supabase.storage.from("resumes").upload(path, resume, { upsert: true });
      if (!upErr) {
        const { data: signed } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 60 * 24 * 365);
        await supabase.from("profiles").update({
          resume_name: resume.name,
          resume_url: signed?.signedUrl ?? path,
          resume_uploaded_at: new Date().toISOString(),
        }).eq("id", uid);
      }
    }

    setLoading(false);
    toast.success("Account created — welcome!");

    // Route based on role assigned by trigger
    if (uid) {
      const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const roles = (roleRows ?? []).map((r: any) => r.role);
      if (roles.includes("admin")) return navigate({ to: "/admin" });
      if (roles.includes("hr")) return navigate({ to: "/hr" });
    }
    navigate({ to: "/candidate/settings" });
  };

  const google = async () => {
    setLoading(true);
    const { error } = await signInGoogle();
    setLoading(false);
    if (error) toast.error(error);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-elevated">
        <CardContent className="p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground font-bold">SR</div>
            <div>
              <h1 className="text-lg font-semibold">Create your account</h1>
              <p className="text-xs text-muted-foreground">Register to unlock your candidate portal</p>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full mb-4" onClick={google} disabled={loading}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <div className="relative mt-1">
                <User className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-8" placeholder="Arjun Sharma" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-8" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-8" placeholder="At least 6 characters" />
              </div>
            </div>
            <div>
              <Label htmlFor="resume">Resume (optional)</Label>
              <div className="relative mt-1">
                <FileUp className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files?.[0] ?? null)} className="pl-8 file:mr-3 file:rounded file:border-0 file:bg-muted file:px-2 file:py-1" />
              </div>
              {resume && <p className="mt-1 text-xs text-muted-foreground">Selected: {resume.name}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Creating…" : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
