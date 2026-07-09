import { createFileRoute } from "@tanstack/react-router";
import { Brain, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { PublicLayout } from "@/components/site-chrome";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SmartRecruit" },
      { name: "description", content: "Learn how SmartRecruit reinvents enterprise hiring with AI." },
      { property: "og:title", content: "About — SmartRecruit" },
      { property: "og:description", content: "How SmartRecruit pairs enterprise UX with AI matching to help teams hire faster." },
      { property: "og:url", content: "https://talent-pulse-99.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://talent-pulse-99.lovable.app/about" }],
  }),
  component: () => (
    <PublicLayout>
      <section className="bg-gradient-soft">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Reinventing enterprise hiring</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            SmartRecruit pairs world-class enterprise UX with an AI matching engine to help recruiters move from a thousand resumes to a perfect shortlist in minutes.
          </p>
        </div>
      </section>
      <section className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Brain, t: "AI-first", d: "Resume parsing + skill scoring built-in." },
          { i: ShieldCheck, t: "Enterprise security", d: "JWT auth, role-based access, audit logs." },
          { i: Globe, t: "Global reach", d: "12k+ candidates across 300+ companies." },
          { i: Sparkles, t: "Beautiful by default", d: "Material Design + modern interactions." },
        ].map((f) => (
          <Card key={f.t}><CardContent className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary"><f.i /></div>
            <h3 className="mt-4 font-semibold">{f.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
          </CardContent></Card>
        ))}
      </section>
    </PublicLayout>
  ),
});
