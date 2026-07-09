import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin } from "lucide-react";
import { PublicLayout } from "@/components/site-chrome";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { companies } from "@/lib/mock-data";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Companies Hiring — SmartRecruit" },
      { name: "description", content: "Explore companies actively hiring on SmartRecruit." },
      { property: "og:title", content: "Companies Hiring on SmartRecruit" },
      { property: "og:description", content: "Browse verified enterprise employers actively hiring on SmartRecruit." },
      { property: "og:url", content: "https://talent-pulse-99.lovable.app/companies" },
    ],
    links: [{ rel: "canonical", href: "https://talent-pulse-99.lovable.app/companies" }],
  }),
  component: () => (
    <PublicLayout>
      <section className="bg-gradient-soft">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold md:text-4xl">Companies hiring on SmartRecruit</h1>
          <p className="mt-2 text-muted-foreground">{companies.length} verified enterprise employers.</p>
        </div>
      </section>
      <section className="container mx-auto grid gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <Card key={c.id} className="shadow-card-soft transition hover:shadow-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-hero text-lg font-bold text-primary-foreground">{c.logo}</div>
                <div>
                  <h2 className="font-semibold">{c.name}</h2>
                  <p className="text-xs text-muted-foreground">{c.industry}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
                <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{c.employees}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{c.openJobs} open jobs</span>
                <Button asChild size="sm" variant="outline"><Link to="/jobs">View Jobs</Link></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </PublicLayout>
  ),
});
