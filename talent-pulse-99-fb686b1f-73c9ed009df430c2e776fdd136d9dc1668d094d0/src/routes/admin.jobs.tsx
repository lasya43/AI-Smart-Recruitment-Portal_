import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/jobs")({
  head: () => ({ meta: [{ title: "Jobs — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="admin" title="Manage Jobs">
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Title</TableHead><TableHead>Company</TableHead>
            <TableHead>Location</TableHead><TableHead>Vacancies</TableHead><TableHead>Deadline</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {jobs.map(j => (
              <TableRow key={j.id}>
                <TableCell className="font-medium">{j.title}</TableCell>
                <TableCell>{j.company}</TableCell>
                <TableCell>{j.location}</TableCell>
                <TableCell>{j.vacancies}</TableCell>
                <TableCell className="text-muted-foreground">{j.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </DashboardLayout>
  ),
});
