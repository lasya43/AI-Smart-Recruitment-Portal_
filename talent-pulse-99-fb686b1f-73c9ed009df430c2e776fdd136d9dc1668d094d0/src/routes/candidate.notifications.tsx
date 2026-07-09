import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/notifications")({
  head: () => ({ meta: [{ title: "Notifications — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="candidate" title="Notifications">
      <Card><CardContent className="p-0">
        <ul className="divide-y divide-border">
          {notifications.map((n) => (
            <li key={n.id} className={`flex items-start gap-4 p-5 ${!n.read ? "bg-primary-soft/30" : ""}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                n.type === "success" ? "bg-success/15 text-success" :
                n.type === "warning" ? "bg-warning/20 text-warning-foreground" :
                n.type === "error" ? "bg-destructive/15 text-destructive" :
                "bg-primary-soft text-primary"
              }`}><Bell className="h-4 w-4" /></div>
              <div className="flex-1">
                <p className="font-medium">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.createdAt}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
            </li>
          ))}
        </ul>
      </CardContent></Card>
    </DashboardLayout>
  ),
});
