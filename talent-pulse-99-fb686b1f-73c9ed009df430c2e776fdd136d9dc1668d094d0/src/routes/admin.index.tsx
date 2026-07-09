import { createFileRoute } from "@tanstack/react-router";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Pie, PieChart, Cell, Legend,
} from "recharts";
import { Briefcase, Building2, ClipboardList, ShieldCheck, UserCheck, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui-kit";
import { adminStats, departmentHiring, monthlyHiring } from "@/lib/mock-data";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Candidates" value={adminStats.totalCandidates.toLocaleString()} icon={Users} accent="primary" />
        <StatCard label="Companies" value={adminStats.totalCompanies} icon={Building2} accent="info" />
        <StatCard label="Recruiters" value={adminStats.activeRecruiters} icon={ShieldCheck} accent="warning" />
        <StatCard label="Jobs" value={adminStats.totalJobs.toLocaleString()} icon={Briefcase} accent="success" />
        <StatCard label="Applications" value={adminStats.totalApplications.toLocaleString()} icon={ClipboardList} accent="primary" />
        <StatCard label="Hires" value={adminStats.selectedCandidates.toLocaleString()} icon={UserCheck} accent="success" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h2 className="font-semibold">Hiring across months</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={monthlyHiring}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="hires" fill="var(--color-primary)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">By Department</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={departmentHiring} dataKey="count" nameKey="dept" outerRadius={75} innerRadius={40}>
                  {departmentHiring.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  ),
});
