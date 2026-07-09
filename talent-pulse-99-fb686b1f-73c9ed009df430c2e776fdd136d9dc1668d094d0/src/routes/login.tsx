import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sparkles, Mail, Lock, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — SmartRecruit" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    role: (s.role === "admin" || s.role === "hr") ? s.role : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signInGoogle, user, primaryRole } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill demo credentials if role hint present
  useEffect(() => {
    if (search.role === "admin") {
      setEmail("lasyaadmin43@gmail.com");
      setPassword("lasyaadmin43");
    } else if (search.role === "hr") {
      setEmail("lasyahr43@gmail.com");
      setPassword("lasyahr43");
    }
  }, [search.role]);

  // Redirect once signed in
  useEffect(() => {
    if (!user) return;
    const dest = primaryRole === "admin" ? "/admin" : primaryRole === "hr" ? "/hr" : "/candidate";
    navigate({ to: dest });
  }, [user, primaryRole, navigate]);

  const routeAfterLogin = async (email: string) => {
    // Look up role directly to avoid waiting for context refresh
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
    const roles = (roleRows ?? []).map((r: any) => r.role);
    const dest = roles.includes("admin") ? "/admin" : roles.includes("hr") ? "/hr" : "/candidate";
    navigate({ to: dest });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      if (/invalid|credential/i.test(error)) {
        toast.error("Wrong email or password. Register first if you don't have an account.");
      } else {
        toast.error(error);
      }
      return;
    }
    toast.success("Welcome back!");
    await routeAfterLogin(email);
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
              <h1 className="text-lg font-semibold">SmartRecruit</h1>
              <p className="text-xs text-muted-foreground">Sign in to your portal</p>
            </div>
          </div>

          {/* Role quick-pick */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            <Button type="button" size="sm" variant={search.role === undefined ? "default" : "outline"} onClick={() => navigate({ to: "/login" })}>Candidate</Button>
            <Button type="button" size="sm" variant={search.role === "hr" ? "default" : "outline"} onClick={() => navigate({ to: "/login", search: { role: "hr" } })}><Users className="mr-1 h-3 w-3" />HR</Button>
            <Button type="button" size="sm" variant={search.role === "admin" ? "default" : "outline"} onClick={() => navigate({ to: "/login", search: { role: "admin" } })}><ShieldCheck className="mr-1 h-3 w-3" />Admin</Button>
          </div>

          {search.role && (
            <div className="mb-4 rounded-md bg-primary-soft p-3 text-xs text-primary">
              Demo {search.role.toUpperCase()} credentials are prefilled. First time? Click Register with the same email/password to create the account — it will be granted the {search.role} role automatically.
            </div>
          )}

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
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-8" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <Link to="/register" className="font-medium text-primary hover:underline">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
