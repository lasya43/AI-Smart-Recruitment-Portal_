import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, ShieldCheck, Brain, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/site-chrome";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularScore } from "@/components/ui-kit";
import { getJob, computeAts } from "@/lib/jobs-data";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/jobs/$jobId/apply")({
  head: () => ({ meta: [{ title: "Apply — SmartRecruit" }] }),
  loader: ({ params }) => {
    const job = getJob(params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  component: ApplyPage,
});

type Stage = "ats" | "assessment" | "done";

function ApplyPage() {
  const { job } = Route.useLoaderData() as { job: import("@/lib/jobs-data").JobFull };
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("ats");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [already, setAlready] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("applications").select("id").eq("user_id", user.id).eq("job_id", job.id).maybeSingle().then(({ data }) => {
      if (data) setAlready(true);
    });
  }, [user, job.id]);

  if (loading || !user) return null;

  const ats = computeAts(job, {
    skills: profile?.skills ?? [],
    qualification: profile?.qualification,
    is_fresher: profile?.is_fresher,
    experience: profile?.experience,
  });

  const passedAts = ats.score >= job.atsThreshold && !ats.freshersOnlyBlocked;

  const submitApplication = async (assessmentScore: number | null) => {
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("applications").insert({
      user_id: user.id,
      job_id: job.id,
      job_title: job.title,
      company: job.company,
      match_score: ats.score,
      ats_score: ats.score,
      assessment_score: assessmentScore,
      status: "Applied",
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Application submitted!");
    setStage("done");
  };

  const submitAssessment = () => {
    const total = job.assessment.length;
    const correct = job.assessment.filter(q => answers[q.id] === q.correctIndex).length;
    const pct = Math.round((correct / total) * 100);
    submitApplication(pct);
  };

  if (already && stage !== "done") {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-2xl px-4 py-12">
          <Card><CardContent className="p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <h1 className="mt-4 text-xl font-semibold">Already applied</h1>
            <p className="mt-2 text-sm text-muted-foreground">You have already applied to {job.title} at {job.company}.</p>
            <Button asChild className="mt-6"><Link to="/candidate/applied">View my applications</Link></Button>
          </CardContent></Card>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold">Apply · {job.title}</h1>
        <p className="text-sm text-muted-foreground">{job.company} · {job.location}</p>

        {stage === "ats" && (
          <Card className="mt-6"><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-primary" />Resume ATS Check</h2>
              <span className="text-xs text-muted-foreground">Threshold: {job.atsThreshold}%</span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-around">
              <CircularScore value={ats.score} size={160} />
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Matched skills</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {ats.matched.length === 0 && <span className="text-sm text-muted-foreground">None yet.</span>}
                    {ats.matched.map(s => <span key={s} className="rounded-full bg-success/20 px-2.5 py-0.5 text-xs text-success">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Missing skills</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {ats.missing.length === 0 && <span className="text-sm text-muted-foreground">None 🎉</span>}
                    {ats.missing.map(s => <span key={s} className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs text-destructive">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {!passedAts ? (
              <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-destructive"><AlertTriangle className="h-4 w-4" />Not eligible yet</p>
                <p className="mt-2 text-muted-foreground">
                  {ats.freshersOnlyBlocked
                    ? "This role is for freshers only. Update your Experience in Settings to \"Fresher\" if that applies to you."
                    : `Your ATS accuracy is ${ats.score}%, below the ${job.atsThreshold}% threshold. Add more matching skills in your profile and re-upload a stronger resume.`}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button asChild variant="outline" size="sm"><Link to="/candidate/settings">Update profile</Link></Button>
                  <Button asChild variant="outline" size="sm"><Link to="/candidate/resume">Manage resume</Link></Button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setStage("assessment")}>Continue to Assessment <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            )}
          </CardContent></Card>
        )}

        {stage === "assessment" && (
          <Card className="mt-6"><CardContent className="p-6">
            <h2 className="flex items-center gap-2 font-semibold"><Brain className="h-5 w-5 text-primary" />Online Assessment</h2>
            <p className="mt-1 text-sm text-muted-foreground">Answer the {job.assessment.length} questions below. Your score is recorded with the application.</p>

            <ol className="mt-6 space-y-5">
              {job.assessment.map((q, i) => (
                <li key={q.id} className="rounded-lg border border-border p-4">
                  <p className="font-medium">{i + 1}. {q.question}</p>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((opt, oi) => (
                      <label key={oi} className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition ${answers[q.id] === oi ? "border-primary bg-primary-soft/30" : "border-border hover:bg-muted"}`}>
                        <input type="radio" name={q.id} className="accent-primary" checked={answers[q.id] === oi} onChange={() => setAnswers({ ...answers, [q.id]: oi })} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStage("ats")}>Back</Button>
              <Button onClick={submitAssessment} disabled={submitting || Object.keys(answers).length < job.assessment.length}>
                {submitting ? "Submitting…" : "Submit application"}
              </Button>
            </div>
          </CardContent></Card>
        )}

        {stage === "done" && (
          <Card className="mt-6"><CardContent className="p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <h2 className="mt-4 text-xl font-semibold">Application submitted</h2>
            <p className="mt-2 text-sm text-muted-foreground">The HR team at {job.company} will review your ATS + assessment results and get back to you.</p>
            <div className="mt-6 flex justify-center gap-2">
              <Button asChild><Link to="/candidate/applied">View my applications</Link></Button>
              <Button asChild variant="outline"><Link to="/candidate/recommended">Find more jobs</Link></Button>
            </div>
          </CardContent></Card>
        )}
      </div>
    </PublicLayout>
  );
}
