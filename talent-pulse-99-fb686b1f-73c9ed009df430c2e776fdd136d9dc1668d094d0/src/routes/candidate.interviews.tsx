import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Video, MapPin } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui-kit";
import { interviews } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/interviews")({
  head: () => ({ meta: [{ title: "Interviews — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="candidate" title="Interview Schedule">
      <div className="grid gap-4">
        {interviews.map((i) => (
          <Card key={i.id}><CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary"><CalendarDays /></div>
              <div>
                <p className="font-semibold">{i.jobTitle}</p>
                <p className="text-sm text-muted-foreground">{i.company} · {i.interviewer}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{i.date} · {i.time}</span>
                  <span className="flex items-center gap-1">{i.mode === "Online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />} {i.mode}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill status={i.status} />
              {i.link ? <Button size="sm">Join</Button> : <Button size="sm" variant="outline">Directions</Button>}
            </div>
          </CardContent></Card>
        ))}
      </div>
    </DashboardLayout>
  ),
});
