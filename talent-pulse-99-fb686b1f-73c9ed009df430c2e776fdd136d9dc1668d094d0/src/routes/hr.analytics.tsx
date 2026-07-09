import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { departmentHiring, monthlyHiring } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/hr/analytics")({
  head: () => ({ meta: [{ title: "Analytics — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="hr" title="Analytics">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Pipeline conversion</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={[
                { stage: "Applied", v: 480 }, { stage: "Screened", v: 320 },
                { stage: "Shortlist", v: 180 }, { stage: "Interview", v: 92 },
                { stage: "Offer", v: 38 }, { stage: "Hired", v: 27 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="stage" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Time-to-hire (days)</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <LineChart data={monthlyHiring.map(m => ({ month: m.month, days: 30 - (m.hires % 12) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip />
                <Line dataKey="days" stroke="var(--color-chart-3)" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  ),
});
