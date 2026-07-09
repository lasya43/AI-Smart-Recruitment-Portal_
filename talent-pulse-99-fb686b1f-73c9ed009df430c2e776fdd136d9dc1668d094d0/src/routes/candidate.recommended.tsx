import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, CalendarDays, IndianRupee, Rocket } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jobsFull, computeAts } from "@/lib/jobs-data";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/candidate/recommended")({
  head: () => ({ meta: [{ title: "Recommended Jobs — SmartRecruit" }] }),
  component: Recommended,
});

function Recommended() {
  const { profile } = useAuth();
  const candidate = {
    skills: profile?.skills ?? [],
    qualification: profile?.qualification,
    is_fresher: profile?.is_fresher,
    experience: profile?.experience,
  };

  const ranked = jobsFull
    .map((j) => ({ job: j, ats: computeAts(j, candidate) }))
    .sort((a, b) => b.ats.score - a.ats.score);

  return (
    <DashboardLayout role="candidate" title="Recommended for you">
      {profile && (profile.skills ?? []).length === 0 && (
        <Card className="mb-4"><CardContent className="p-4 text-sm">
          <span className="text-muted-foreground">Add your skills in </span>
          <Link to="/candidate/settings" className="text-primary font-medium hover:underline">Settings</Link>
          <span className="text-muted-foreground"> to see better match scores.</span>
        </CardContent></Card>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ranked.map(({ job: j, ats }) => (
          <Card key={j.id} className="shadow-card-soft transition hover:shadow-elevated hover:glow-primary">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <Briefcase className="h-9 w-9 rounded-md bg-primary-soft p-2 text-primary" />
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ats.score >= 75 ? "bg-success/20 text-success" : ats.score >= 55 ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"}`}>{ats.score}% match</span>
              </div>
              <h3 className="mt-3 font-semibold">{j.title}</h3>
              <p className="text-xs text-muted-foreground">{j.company} · {j.location}</p>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{j.description}</p>
              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />₹{j.lpaMin}–{j.lpaMax} LPA</div>
                <div className="flex items-center gap-1"><Rocket className="h-3 w-3" />Starts {new Date(j.startDate).toLocaleDateString()}</div>
                <div className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />Apply by {new Date(j.deadline).toLocaleDateString()}</div>
              </div>
              <Button asChild size="sm" className="mt-4 w-full"><Link to="/jobs/$jobId" params={{ jobId: j.id }}>View Details</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
