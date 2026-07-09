import { createFileRoute } from "@tanstack/react-router";
import { UserTable } from "./admin.users";

export const Route = createFileRoute("/admin/recruiters")({
  head: () => ({ meta: [{ title: "Recruiters — SmartRecruit" }] }),
  component: () => <UserTable role="admin" title="Manage Recruiters" filter="HR" />,
});
