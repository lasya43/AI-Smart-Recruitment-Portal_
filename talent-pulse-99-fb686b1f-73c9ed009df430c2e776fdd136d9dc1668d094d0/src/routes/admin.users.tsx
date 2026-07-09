import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const users = [
  { id: "u1", name: "Arjun Sharma", email: "arjun@email.com", role: "Candidate", status: "Active" },
  { id: "u2", name: "Priya Mehta", email: "priya@infosys.com", role: "HR", status: "Active" },
  { id: "u3", name: "Rahul Kumar", email: "rahul@email.com", role: "Candidate", status: "Active" },
  { id: "u4", name: "Anita Desai", email: "anita@tcs.com", role: "HR", status: "Active" },
  { id: "u5", name: "Sneha Reddy", email: "sneha@email.com", role: "Candidate", status: "Suspended" },
  { id: "u6", name: "Admin User", email: "admin@smartrecruit.io", role: "Admin", status: "Active" },
];

function UserTable({ role, title, filter }: { role: "admin"; title: string; filter?: string }) {
  const rows = filter ? users.filter(u => u.role === filter) : users;
  return (
    <DashboardLayout role={role} title={title}>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Name</TableHead><TableHead>Email</TableHead>
            <TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {rows.map(u => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                    {u.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => toast.success(`${u.name} edited`)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </DashboardLayout>
  );
}

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Manage Users — SmartRecruit" }] }),
  component: () => <UserTable role="admin" title="Manage Users" />,
});

export { UserTable };
