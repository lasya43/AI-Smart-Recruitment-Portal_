import { createFileRoute } from "@tanstack/react-router";
import { Check, X, CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusPill } from "@/components/ui-kit";
import { hrApplications } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/applications")({
  head: () => ({ meta: [{ title: "Applications — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="hr" title="Application Review">
      <div className="grid gap-3">
        {hrApplications.map((a) => (
          <Card key={a.id}><CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary text-primary-foreground">{a.candidateName.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold">{a.candidateName}</p>
                <p className="text-xs text-muted-foreground">{a.jobTitle} · Applied {a.appliedAt}</p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusPill status={a.status} />
                  <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{a.matchScore}% AI match</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.success("Resume viewer opened")}>View Resume</Button>
              <Button variant="outline" size="sm" onClick={() => toast.success("Candidate shortlisted")}><Check className="mr-1 h-4 w-4" />Shortlist</Button>
              <Button variant="outline" size="sm" onClick={() => toast.error("Candidate rejected")}><X className="mr-1 h-4 w-4" />Reject</Button>
              <Button size="sm" onClick={() => toast.success("Interview scheduled")}><CalendarPlus className="mr-1 h-4 w-4" />Schedule</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </DashboardLayout>
  ),
});
