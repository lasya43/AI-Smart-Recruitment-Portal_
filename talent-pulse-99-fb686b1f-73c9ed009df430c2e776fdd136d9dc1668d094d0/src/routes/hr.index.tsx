import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ClipboardList, Users, CalendarDays } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Cell, Pie, PieChart, Legend,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard, StatusPill } from "@/components/ui-kit";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { departmentHiring, hrApplications, interviews, jobs, monthlyHiring } from "@/lib/mock-data";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

export const Route = createFileRoute("/hr/")({
  head: () => ({ meta: [{ title: "HR Dashboard — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="hr" title="HR Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Jobs" value={jobs.filter(j => j.company === "Infosys").length} icon={Briefcase} accent="primary" trend="+3 this month" />
        <StatCard label="Total Applications" value={hrApplications.length} icon={ClipboardList} accent="info" />
        <StatCard label="Shortlisted" value={hrApplications.filter(a => a.status === "Shortlisted").length} icon={Users} accent="success" />
        <StatCard label="Interviews" value={interviews.length} icon={CalendarDays} accent="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h2 className="font-semibold">Monthly Hiring</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={monthlyHiring}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="hires" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h2 className="font-semibold">By Department</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={departmentHiring} dataKey="count" nameKey="dept" outerRadius={80}>
                  {departmentHiring.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
      </div>

      <Card className="mt-6"><CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recent Applications</h2>
          <Button variant="ghost" size="sm" asChild><Link to="/hr/applications">View all</Link></Button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {hrApplications.slice(0, 5).map(a => (
            <li key={a.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{a.candidateName}</p>
                <p className="text-xs text-muted-foreground">{a.jobTitle} · {a.appliedAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-primary">{a.matchScore}%</span>
                <StatusPill status={a.status} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent></Card>
    </DashboardLayout>
  ),
});
