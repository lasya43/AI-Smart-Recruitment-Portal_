import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "System Settings — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="admin" title="System Settings">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Platform</h2>
          <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success("Saved"); }}>
            <div><Label>Platform name</Label><Input defaultValue="SmartRecruit" /></div>
            <div><Label>Support email</Label><Input defaultValue="support@smartrecruit.io" /></div>
            <div><Label>JWT expiry (minutes)</Label><Input type="number" defaultValue={60} /></div>
            <Button type="submit">Save changes</Button>
          </form>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Feature Flags</h2>
          <div className="mt-4 space-y-3">
            {["AI Matching", "Email notifications", "Public job listings", "Recruiter analytics", "Dark mode"].map(l => (
              <div key={l} className="flex items-center justify-between rounded-md border border-border p-3">
                <span className="text-sm">{l}</span><Switch defaultChecked />
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  ),
});
