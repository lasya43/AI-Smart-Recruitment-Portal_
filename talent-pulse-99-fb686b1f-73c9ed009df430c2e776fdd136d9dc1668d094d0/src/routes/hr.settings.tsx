import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/hr/settings")({
  head: () => ({ meta: [{ title: "Settings — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="hr" title="Settings">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Company Profile</h2>
          <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }}>
            <div><Label>Company Name</Label><Input defaultValue="Infosys" /></div>
            <div><Label>HR Email</Label><Input defaultValue="hr@infosys.com" /></div>
            <Button type="submit">Save changes</Button>
          </form>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Notification Preferences</h2>
          <div className="mt-4 space-y-3">
            {["New applications", "Interview reminders", "Weekly reports", "Dark mode"].map(l => (
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
