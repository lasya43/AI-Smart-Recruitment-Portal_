import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { companies } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/companies")({
  head: () => ({ meta: [{ title: "Companies — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="admin" title="Manage Companies">
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Company</TableHead><TableHead>Industry</TableHead>
            <TableHead>Location</TableHead><TableHead>Employees</TableHead><TableHead>Open Jobs</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {companies.map(c => (
              <TableRow key={c.id}>
                <TableCell className="flex items-center gap-3 font-medium">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-hero text-xs text-primary-foreground">{c.logo}</span>
                  {c.name}
                </TableCell>
                <TableCell>{c.industry}</TableCell>
                <TableCell>{c.location}</TableCell>
                <TableCell>{c.employees}</TableCell>
                <TableCell><span className="font-semibold text-primary">{c.openJobs}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </DashboardLayout>
  ),
});
