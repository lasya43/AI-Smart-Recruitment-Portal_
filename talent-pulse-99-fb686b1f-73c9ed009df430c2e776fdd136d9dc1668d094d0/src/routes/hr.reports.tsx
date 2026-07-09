import { createFileRoute } from "@tanstack/react-router";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui-kit";
import { adminStats, departmentHiring, monthlyHiring } from "@/lib/mock-data";
import { Briefcase, Building2, ClipboardList, Users } from "lucide-react";

function ReportsPage({ role }: { role: "hr" | "admin" }) {
  return (
    <DashboardLayout role={role} title="Reports & Analytics">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Candidates" value={adminStats.totalCandidates.toLocaleString()} icon={Users} accent="primary" />
        <StatCard label="Total Companies" value={adminStats.totalCompanies} icon={Building2} accent="info" />
        <StatCard label="Total Jobs" value={adminStats.totalJobs.toLocaleString()} icon={Briefcase} accent="success" />
        <StatCard label="Applications" value={adminStats.totalApplications.toLocaleString()} icon={ClipboardList} accent="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Monthly Hiring Trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyHiring}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                <Area type="monotone" dataKey="hires" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Department-wise Hiring</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={departmentHiring} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="dept" stroke="var(--color-muted-foreground)" fontSize={12} width={90} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="count" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
      </div>

      <Card className="mt-6"><CardContent className="p-6">
        <h2 className="font-semibold">Top Recruiters</h2>
        <ul className="mt-4 divide-y divide-border">
          {[
            ["Priya Mehta", "Infosys", 47],
            ["Anita Desai", "TCS", 41],
            ["Suresh Iyer", "Accenture", 38],
            ["Meera Joshi", "Wipro", 29],
          ].map(([n, c, k]) => (
            <li key={n as string} className="flex items-center justify-between py-3 text-sm">
              <span><strong>{n}</strong> <span className="text-muted-foreground">· {c}</span></span>
              <span className="font-semibold text-primary">{k} hires</span>
            </li>
          ))}
        </ul>
      </CardContent></Card>
    </DashboardLayout>
  );
}

export const Route = createFileRoute("/hr/reports")({
  head: () => ({ meta: [{ title: "Reports — SmartRecruit" }] }),
  component: () => <ReportsPage role="hr" />,
});
