import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { hrApplications } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/candidates")({
  head: () => ({ meta: [{ title: "Candidates — SmartRecruit" }] }),
  component: () => {
    const unique = Array.from(new Map(hrApplications.map(a => [a.candidateId, a])).values());
    return (
      <DashboardLayout role="hr" title="Candidate List">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {unique.map(c => (
            <Card key={c.candidateId}><CardContent className="p-6 text-center">
              <Avatar className="mx-auto h-16 w-16"><AvatarFallback className="bg-primary text-primary-foreground text-lg">{c.candidateName.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
              <h3 className="mt-3 font-semibold">{c.candidateName}</h3>
              <p className="text-xs text-muted-foreground">Applied to {c.jobTitle}</p>
              <div className="mt-3 inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{c.matchScore}% match</div>
              <Button variant="outline" size="sm" className="mt-4 w-full">View Profile</Button>
            </CardContent></Card>
          ))}
        </div>
      </DashboardLayout>
    );
  },
});
