import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Briefcase, Building2, CalendarDays, IndianRupee, MapPin, Rocket, GraduationCap, ShieldCheck } from "lucide-react";
import { PublicLayout } from "@/components/site-chrome";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getJob, computeAts } from "@/lib/jobs-data";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/jobs/$jobId")({
  head: ({ params }) => ({ meta: [{ title: `${params.jobId} — Job Details` }] }),
  loader: ({ params }) => {
    const job = getJob(params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  component: JobDetail,
});

function JobDetail() {
  const { job } = Route.useLoaderData() as { job: import("@/lib/jobs-data").JobFull };
  const { user, profile } = useAuth();
  const ats = profile
    ? computeAts(job, { skills: profile.skills ?? [], qualification: profile.qualification, is_fresher: profile.is_fresher, experience: profile.experience })
    : null;

  return (
    <PublicLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Card><CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-10 w-10 rounded-md bg-primary-soft p-2 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-2"><Building2 className="h-3.5 w-3.5" />{job.company} · <MapPin className="h-3.5 w-3.5" />{job.location}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{job.type}</span>
                <span className="rounded-full bg-muted px-3 py-1">{job.experience}</span>
                {job.freshersAllowed && <span className="rounded-full bg-success/20 px-3 py-1 text-success">Freshers welcome</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {user ? (
                <Button asChild size="lg"><Link to="/jobs/$jobId/apply" params={{ jobId: job.id }}>Apply now</Link></Button>
              ) : (
                <Button asChild size="lg"><Link to="/login">Sign in to apply</Link></Button>
              )}
              {ats && <p className="text-center text-xs text-muted-foreground">Your ATS accuracy: <strong className={ats.score >= job.atsThreshold ? "text-success" : "text-destructive"}>{ats.score}%</strong></p>}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border p-3"><p className="flex items-center gap-1 text-xs text-muted-foreground"><IndianRupee className="h-3 w-3" />Package</p><p className="mt-1 font-semibold">₹{job.lpaMin} – {job.lpaMax} LPA</p></div>
            <div className="rounded-lg border border-border p-3"><p className="flex items-center gap-1 text-xs text-muted-foreground"><Rocket className="h-3 w-3" />Start date</p><p className="mt-1 font-semibold">{new Date(job.startDate).toLocaleDateString()}</p></div>
            <div className="rounded-lg border border-border p-3"><p className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" />Apply by</p><p className="mt-1 font-semibold">{new Date(job.deadline).toLocaleDateString()}</p></div>
            <div className="rounded-lg border border-border p-3"><p className="flex items-center gap-1 text-xs text-muted-foreground"><ShieldCheck className="h-3 w-3" />ATS threshold</p><p className="mt-1 font-semibold">{job.atsThreshold}%</p></div>
          </div>
        </CardContent></Card>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2"><CardContent className="p-6">
            <h2 className="font-semibold">About the role</h2>
            <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>

            <h3 className="mt-6 font-semibold">Responsibilities</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {job.responsibilities.map(r => <li key={r}>{r}</li>)}
            </ul>

            <h3 className="mt-6 font-semibold">Skills required</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.map(s => <span key={s} className="rounded-full bg-primary-soft px-3 py-1 text-xs text-primary">{s}</span>)}
            </div>

            <h3 className="mt-6 flex items-center gap-1 font-semibold"><GraduationCap className="h-4 w-4" />Eligibility</h3>
            <p className="mt-2 text-sm text-muted-foreground">{job.eligibility}</p>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <h2 className="font-semibold">About {job.company}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{job.companyDescription}</p>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-muted-foreground">Department:</span> <strong>{job.department}</strong></p>
              <p><span className="text-muted-foreground">Vacancies:</span> <strong>{job.vacancies}</strong></p>
              <p><span className="text-muted-foreground">Posted:</span> <strong>{new Date(job.postedAt).toLocaleDateString()}</strong></p>
            </div>
          </CardContent></Card>
        </div>
      </div>
    </PublicLayout>
  );
}
