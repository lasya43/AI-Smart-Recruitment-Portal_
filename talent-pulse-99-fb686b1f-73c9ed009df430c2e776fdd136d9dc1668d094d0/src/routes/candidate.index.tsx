import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Briefcase, CalendarDays, ClipboardList, Sparkles, TrendingUp, IndianRupee } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { CircularScore, StatCard, StatusPill } from "@/components/ui-kit";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { jobsFull, computeAts } from "@/lib/jobs-data";

export const Route = createFileRoute("/candidate/")({
  head: () => ({ meta: [{ title: "Candidate Dashboard — SmartRecruit" }] }),
  component: DashboardPage,
});

interface AppRow {
  id: string;
  job_id: string;
  job_title: string;
  company: string;
  match_score: number;
  ats_score: number;
  status: string;
  applied_at: string;
}

function computeCompletion(p: {
  full_name: string | null; phone: string | null; qualification: string | null;
  college: string | null; skills: string[]; resume_url: string | null;
  projects: unknown[]; certificates: string[];
}) {
  const parts = [
    !!p.full_name, !!p.phone, !!p.qualification, !!p.college,
    (p.skills?.length ?? 0) > 0, !!p.resume_url,
    (p.projects?.length ?? 0) > 0, (p.certificates?.length ?? 0) > 0,
  ];
  return Math.round((parts.filter(Boolean).length / parts.length) * 100);
}

function DashboardPage() {
  const { user, profile } = useAuth();
  const [apps, setApps] = useState<AppRow[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("applications").select("*").eq("user_id", user.id).order("applied_at", { ascending: false }).then(({ data }) => {
      setApps((data ?? []) as AppRow[]);
    });
  }, [user]);

  const completion = profile ? computeCompletion({
    full_name: profile.full_name,
    phone: profile.phone,
    qualification: profile.qualification,
    college: profile.college,
    skills: profile.skills,
    resume_url: profile.resume_url,
    projects: profile.projects,
    certificates: profile.certificates,
  }) : 0;

  const candidate = {
    skills: profile?.skills ?? [],
    qualification: profile?.qualification,
    is_fresher: profile?.is_fresher,
    experience: profile?.experience,
  };
  const recommended = jobsFull
    .map((j) => ({ job: j, ats: computeAts(j, candidate) }))
    .sort((a, b) => b.ats.score - a.ats.score)
    .slice(0, 4);

  const avg = apps.length ? Math.round(apps.reduce((s, a) => s + a.ats_score, 0) / apps.length) : 0;

  return (
    <DashboardLayout role="candidate" title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={apps.length} icon={ClipboardList} accent="primary" />
        <StatCard label="Shortlisted" value={apps.filter(a => a.status === "Shortlisted" || a.status === "Interview Scheduled" || a.status === "Offer Released").length} icon={Sparkles} accent="success" />
        <StatCard label="Avg ATS score" value={`${avg}%`} icon={TrendingUp} accent="info" />
        <StatCard label="Profile complete" value={`${completion}%`} icon={CalendarDays} accent="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Jobs matched to your resume</h2>
            <Button variant="ghost" size="sm" asChild><Link to="/candidate/recommended">All</Link></Button>
          </div>
          <ul className="mt-4 space-y-3">
            {recommended.map(({ job: j, ats }) => (
              <li key={j.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Briefcase className="h-9 w-9 shrink-0 rounded-md bg-primary-soft p-2 text-primary" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{j.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{j.company} · ₹{j.lpaMin}-{j.lpaMax} LPA · Apply by {new Date(j.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${ats.score >= 75 ? "text-success" : ats.score >= 55 ? "text-primary" : "text-muted-foreground"}`}>{ats.score}%</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">accuracy</div>
                  </div>
                  <Button size="sm" asChild><Link to="/jobs/$jobId" params={{ jobId: j.id }}>View</Link></Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Profile Completion</h2>
          <p className="mt-1 text-sm text-muted-foreground">Complete your profile to unlock better matches.</p>
          <div className="mt-6 flex items-center justify-center">
            <CircularScore value={completion} />
          </div>
          <div className="mt-6 space-y-3">
            {[
              ["Personal details", !!profile?.full_name && !!profile?.phone ? 100 : 50],
              ["Education", !!profile?.qualification && !!profile?.college ? 100 : 40],
              ["Skills added", Math.min(100, (profile?.skills?.length ?? 0) * 15)],
              ["Resume uploaded", profile?.resume_url ? 100 : 0],
              ["Projects / Certs", ((profile?.projects?.length ?? 0) + (profile?.certificates?.length ?? 0)) > 0 ? 100 : 0],
            ].map(([l, v]) => (
              <div key={l as string}>
                <div className="flex justify-between text-xs">
                  <span>{l}</span><span className="text-muted-foreground">{v}%</span>
                </div>
                <Progress value={v as number} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
          <Button asChild size="sm" variant="outline" className="mt-4 w-full"><Link to="/candidate/settings">Edit profile</Link></Button>
        </CardContent></Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent Applications</h2>
            <Button variant="ghost" size="sm" asChild><Link to="/candidate/applied">All</Link></Button>
          </div>
          {apps.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No applications yet. Browse recommended jobs to apply.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {apps.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{a.job_title}</p>
                    <p className="text-xs text-muted-foreground">{a.company} · ATS {a.ats_score}%</p>
                  </div>
                  <StatusPill status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Quick actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" asChild><Link to="/candidate/resume">Update Resume</Link></Button>
            <Button variant="outline" asChild><Link to="/candidate/match">AI Match</Link></Button>
            <Button variant="outline" asChild><Link to="/candidate/settings">Edit Profile</Link></Button>
            <Button variant="outline" asChild><Link to="/candidate/recommended">Find Jobs</Link></Button>
          </div>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
