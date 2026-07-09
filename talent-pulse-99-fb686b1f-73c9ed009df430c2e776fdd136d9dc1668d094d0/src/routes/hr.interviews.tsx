import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/ui-kit";
import { interviews } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/interviews")({
  head: () => ({ meta: [{ title: "Interviews — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="hr" title="Interview Schedule">
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Candidate</TableHead><TableHead>Job</TableHead>
            <TableHead>Date</TableHead><TableHead>Mode</TableHead>
            <TableHead>Interviewer</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {interviews.map(i => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.candidateName}</TableCell>
                <TableCell>{i.jobTitle}</TableCell>
                <TableCell>{i.date} {i.time}</TableCell>
                <TableCell>{i.mode}</TableCell>
                <TableCell>{i.interviewer}</TableCell>
                <TableCell><StatusPill status={i.status} /></TableCell>
                <TableCell><Button size="sm" variant="outline">Reschedule</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </DashboardLayout>
  ),
});
