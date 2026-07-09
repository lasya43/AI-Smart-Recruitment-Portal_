import { createFileRoute } from "@tanstack/react-router";
import { UserTable } from "./admin.users";

export const Route = createFileRoute("/admin/candidates")({
  head: () => ({ meta: [{ title: "Candidates — SmartRecruit" }] }),
  component: () => <UserTable role="admin" title="Manage Candidates" filter="Candidate" />,
});
