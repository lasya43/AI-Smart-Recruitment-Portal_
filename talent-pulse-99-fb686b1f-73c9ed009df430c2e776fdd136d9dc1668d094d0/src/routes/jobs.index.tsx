import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Filter, MapPin, Search } from "lucide-react";
import { PublicLayout } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Browse Jobs — SmartRecruit" },
      { name: "description", content: "Search and filter open roles across top global companies." },
      { property: "og:title", content: "Browse Jobs on SmartRecruit" },
      { property: "og:description", content: "Search and filter open roles across top global companies." },
      { property: "og:url", content: "https://talent-pulse-99.lovable.app/jobs" },
    ],
    links: [{ rel: "canonical", href: "https://talent-pulse-99.lovable.app/jobs" }],
  }),
  component: JobsPage,
});

function JobsPage() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const filtered = jobs.filter(
    (j) =>
      (q === "" || j.title.toLowerCase().includes(q.toLowerCase()) || j.skills.some((s) => s.toLowerCase().includes(q.toLowerCase()))) &&
      (loc === "" || j.location.toLowerCase().includes(loc.toLowerCase())),
  );

  return (
    <PublicLayout>
      <section className="bg-gradient-soft">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Find your next role</h1>
          <p className="mt-2 text-muted-foreground">{jobs.length} open positions across top companies.</p>
          <Card className="mt-6 shadow-card-soft">
            <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Job title, skill, company" className="pl-9" />
              </div>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Location" className="pl-9" />
              </div>
              <Button size="lg"><Filter className="mr-2 h-4 w-4" /> Search</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <Card><CardContent className="p-4">
            <h2 className="font-semibold">Filters</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="mb-2 font-medium">Experience</p>
                {["0-2 years", "2-5 years", "5+ years"].map((v) => (
                  <label key={v} className="flex items-center gap-2 py-1 text-muted-foreground">
                    <input type="checkbox" /> {v}
                  </label>
                ))}
              </div>
              <div>
                <p className="mb-2 font-medium">Job Type</p>
                {["Full-time", "Part-time", "Contract", "Internship"].map((v) => (
                  <label key={v} className="flex items-center gap-2 py-1 text-muted-foreground">
                    <input type="checkbox" defaultChecked={v === "Full-time"} /> {v}
                  </label>
                ))}
              </div>
              <div>
                <p className="mb-2 font-medium">Top Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Java", "React", "Python", "AWS", "Spring Boot", "Docker"].map((s) => (
                    <span key={s} className="cursor-pointer rounded-full bg-muted px-2 py-0.5 text-xs hover:bg-primary-soft hover:text-primary">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent></Card>
        </aside>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Showing {filtered.length} of {jobs.length} jobs</p>
          {filtered.map((j) => (
            <Card key={j.id} className="shadow-card-soft transition hover:shadow-elevated">
              <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"><Briefcase /></div>
                  <div>
                    <h2 className="font-semibold">{j.title}</h2>
                    <p className="text-sm text-muted-foreground">{j.company} · {j.location} · {j.experience}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {j.skills.slice(0, 5).map((s) => (
                        <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <p className="text-sm font-semibold text-primary">{j.salary}</p>
                  <p className="text-xs text-muted-foreground">Posted {j.postedAt}</p>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/jobs/$jobId" params={{ jobId: j.id }}>View</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/jobs/$jobId/apply" params={{ jobId: j.id }}>Apply</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card><CardContent className="p-12 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-medium">No jobs found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </CardContent></Card>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
