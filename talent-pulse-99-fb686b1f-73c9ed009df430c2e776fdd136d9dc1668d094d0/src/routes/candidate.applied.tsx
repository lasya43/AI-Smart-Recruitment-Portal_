import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/candidate/applied")({
  head: () => ({ meta: [{ title: "Applied Jobs — SmartRecruit" }] }),
  component: AppliedPage,
});

interface Row {
  id: string;
  job_id: string;
  job_title: string;
  company: string;
  applied_at: string;
  match_score: number;
  ats_score: number;
  assessment_score: number | null;
  status: string;
}

function AppliedPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("applications").select("*").eq("user_id", user.id).order("applied_at", { ascending: false }).then(({ data }) => {
      setRows((data ?? []) as Row[]);
      setLoading(false);
    });
  }, [user]);

  return (
    <DashboardLayout role="candidate" title="Applied Jobs">
      <Card><CardContent className="p-0">
        {loading ? <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div> : rows.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">You haven't applied to any jobs yet.</p>
            <Button asChild className="mt-3"><Link to="/candidate/recommended">Browse recommended jobs</Link></Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>ATS</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium"><Link to="/jobs/$jobId" params={{ jobId: a.job_id }} className="hover:text-primary">{a.job_title}</Link></TableCell>
                  <TableCell>{a.company}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(a.applied_at).toLocaleDateString()}</TableCell>
                  <TableCell><span className="font-semibold text-primary">{a.ats_score}%</span></TableCell>
                  <TableCell>{a.assessment_score !== null ? `${a.assessment_score}%` : "—"}</TableCell>
                  <TableCell><StatusPill status={a.status as any} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>
    </DashboardLayout>
  );
}
