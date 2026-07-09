import { createFileRoute } from "@tanstack/react-router";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Briefcase, Building2, ClipboardList, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui-kit";
import { adminStats, departmentHiring, monthlyHiring } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="admin" title="Reports">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Candidates" value={adminStats.totalCandidates.toLocaleString()} icon={Users} accent="primary" />
        <StatCard label="Total Companies" value={adminStats.totalCompanies} icon={Building2} accent="info" />
        <StatCard label="Total Jobs" value={adminStats.totalJobs.toLocaleString()} icon={Briefcase} accent="success" />
        <StatCard label="Applications" value={adminStats.totalApplications.toLocaleString()} icon={ClipboardList} accent="warning" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Monthly Hiring</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyHiring}>
                <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Area type="monotone" dataKey="hires" stroke="var(--color-primary)" fill="url(#ar)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Department</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={departmentHiring}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="dept" fontSize={11} /><YAxis fontSize={12} /><Tooltip />
                <Bar dataKey="count" fill="var(--color-chart-2)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  ),
});
