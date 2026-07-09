import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Briefcase, GraduationCap, Languages, Mail, Phone, Pencil, User, FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/candidate/profile")({
  head: () => ({ meta: [{ title: "My Profile — SmartRecruit" }] }),
  component: ProfilePage,
});

function empty(v?: string | null) { return v && v.trim() !== "" ? v : "—"; }

function ProfilePage() {
  const { user, profile } = useAuth();
  if (!user) return null;
  const p = profile;
  const name = p?.full_name ?? user.email ?? "You";
  const initials = name.split(/\s+/).map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardLayout role="candidate" title="My Profile">
      <Card><CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20"><AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback></Avatar>
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-sm text-muted-foreground">{empty(p?.qualification)} · {empty(p?.experience)}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{user.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{empty(p?.phone)}</span>
              </div>
            </div>
          </div>
          <Button asChild><Link to="/candidate/settings"><Pencil className="mr-2 h-4 w-4" />Edit Profile</Link></Button>
        </div>
      </CardContent></Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-semibold"><User className="h-4 w-4 text-primary" />Personal Details</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {[["Gender", p?.gender], ["DOB", p?.dob], ["College", p?.college], ["CGPA", p?.cgpa]].map(([k, v]) => (
              <div key={k as string}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{empty(v as string | null)}</dd></div>
            ))}
          </dl>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-semibold"><Languages className="h-4 w-4 text-primary" />Languages</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(p?.languages ?? []).length === 0 && <p className="text-xs text-muted-foreground">Add languages in Settings.</p>}
            {(p?.languages ?? []).map(l => <span key={l} className="rounded-full bg-muted px-3 py-1 text-xs">{l}</span>)}
          </div>
        </CardContent></Card>

        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-semibold"><Briefcase className="h-4 w-4 text-primary" />Projects</h3>
          {(p?.projects ?? []).length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No projects yet. Add them in Settings.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {p!.projects.map((pr, i) => (
                <li key={i} className="rounded-lg border border-border p-3">
                  <p className="font-medium">{pr.name}</p>
                  <p className="text-xs text-primary">{pr.tech}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pr.desc}</p>
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-6 flex items-center gap-2 font-semibold"><Briefcase className="h-4 w-4 text-primary" />Internships</h3>
          {(p?.internships ?? []).length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No internships added yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {p!.internships.map((pr, i) => (
                <li key={i} className="rounded-lg border border-border p-3">
                  <p className="font-medium">{pr.role} · {pr.company}</p>
                  <p className="text-xs text-primary">{pr.duration}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pr.desc}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-semibold"><GraduationCap className="h-4 w-4 text-primary" />Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(p?.skills ?? []).length === 0 && <p className="text-xs text-muted-foreground">Add skills in Settings.</p>}
            {(p?.skills ?? []).map(s => <span key={s} className="rounded-full bg-primary-soft px-3 py-1 text-xs text-primary">{s}</span>)}
          </div>
          <h3 className="mt-6 flex items-center gap-2 font-semibold"><Award className="h-4 w-4 text-primary" />Certificates</h3>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {(p?.certificates ?? []).length === 0 && <li>Add certificates in Settings.</li>}
            {(p?.certificates ?? []).map(c => <li key={c}>• {c}</li>)}
          </ul>
          <h3 className="mt-6 flex items-center gap-2 font-semibold"><FileText className="h-4 w-4 text-primary" />Resume</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p?.resume_name ?? "No resume uploaded yet."}</p>
          <Button asChild size="sm" variant="outline" className="mt-3"><Link to="/candidate/resume">Manage resume</Link></Button>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
