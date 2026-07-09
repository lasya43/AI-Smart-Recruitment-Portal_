import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Brain, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { CircularScore } from "@/components/ui-kit";
import { jobsFull, computeAts } from "@/lib/jobs-data";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/candidate/match")({
  head: () => ({ meta: [{ title: "AI Resume Match — SmartRecruit" }] }),
  component: MatchPage,
});

function MatchPage() {
  const { profile } = useAuth();
  const [jobId, setJobId] = useState(jobsFull[0].id);
  const job = jobsFull.find(j => j.id === jobId)!;
  const candidate = {
    skills: profile?.skills ?? [],
    qualification: profile?.qualification,
    is_fresher: profile?.is_fresher,
    experience: profile?.experience,
  };
  const { matched, missing, score } = useMemo(() => computeAts(job, candidate), [job, candidate]);

  return (
    <DashboardLayout role="candidate" title="AI Resume Match">
      <Card><CardContent className="p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-semibold"><Brain className="h-5 w-5 text-primary" /> AI Compatibility</h2>
            <p className="text-sm text-muted-foreground">We compared your profile skills with this job's requirements.</p>
          </div>
          <select value={jobId} onChange={(e) => setJobId(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            {jobsFull.map(j => <option key={j.id} value={j.id}>{j.title} — {j.company}</option>)}
          </select>
        </div>
      </CardContent></Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card><CardContent className="flex flex-col items-center justify-center p-6">
          <CircularScore value={score} size={180} />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {score >= 75 ? "Excellent match — apply with confidence." : score >= 55 ? "Decent match — strengthen missing skills." : "Low match — add relevant skills to your profile."}
          </p>
        </CardContent></Card>

        <div className="grid gap-4">
          <Card><CardContent className="p-6">
            <h3 className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4 text-success" /> Matched Skills ({matched.length})</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {matched.length ? matched.map(s => (
                <span key={s} className="rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success">{s}</span>
              )) : <p className="text-sm text-muted-foreground">No overlap yet. Add skills in Settings.</p>}
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <h3 className="flex items-center gap-2 font-semibold"><XCircle className="h-4 w-4 text-destructive" /> Missing Skills ({missing.length})</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {missing.length ? missing.map(s => (
                <span key={s} className="rounded-full bg-destructive/15 px-3 py-1 text-sm font-medium text-destructive">{s}</span>
              )) : <p className="text-sm text-muted-foreground">You have every required skill 🎉</p>}
            </div>
          </CardContent></Card>

          {missing.length > 0 && (
            <Card><CardContent className="p-6">
              <h3 className="flex items-center gap-2 font-semibold"><Lightbulb className="h-4 w-4 text-warning-foreground" /> AI Suggestions</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {missing.slice(0, 4).map(s => (
                  <li key={s} className="flex items-center gap-2 rounded-md bg-muted p-3">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span>Learn <strong>{s}</strong> — take a certified course or build a portfolio project.</span>
                  </li>
                ))}
              </ul>
            </CardContent></Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
