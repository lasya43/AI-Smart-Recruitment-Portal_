import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/hr/post-job")({
  head: () => ({ meta: [{ title: "Post Job — SmartRecruit" }] }),
  component: () => (
    <DashboardLayout role="hr" title="Post a New Job">
      <Card><CardContent className="p-6">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Job posted successfully — visible to candidates."); }} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><Label>Job Title</Label><Input required placeholder="e.g. Senior Backend Engineer" /></div>
          <div className="md:col-span-2"><Label>Description</Label><Textarea required rows={5} placeholder="Role overview, responsibilities…" /></div>
          <div><Label>Location</Label><Input required placeholder="Bengaluru" /></div>
          <div><Label>Salary Range</Label><Input required placeholder="₹15-25 LPA" /></div>
          <div><Label>Experience</Label><Input required placeholder="3-6 years" /></div>
          <div><Label>Vacancies</Label><Input required type="number" min={1} defaultValue={5} /></div>
          <div><Label>Required Skills (comma separated)</Label><Input required placeholder="Java, Spring Boot, MySQL" /></div>
          <div><Label>Deadline</Label><Input required type="date" /></div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <Button type="button" variant="outline">Save Draft</Button>
            <Button type="submit">Publish Job</Button>
          </div>
        </form>
      </CardContent></Card>
    </DashboardLayout>
  ),
});
