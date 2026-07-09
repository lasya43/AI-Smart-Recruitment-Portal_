import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Brain, Briefcase, Building2, CheckCircle2, Search,
  Sparkles, TrendingUp, Users,
} from "lucide-react";
import { PublicLayout } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { companies, jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartRecruit — Find the Right Talent with AI" },
      { name: "description", content: "Enterprise AI recruitment portal. Candidates apply, recruiters shortlist, AI matches resumes to jobs." },
      { property: "og:title", content: "SmartRecruit — Find the Right Talent with AI" },
      { property: "og:description", content: "Enterprise AI recruitment portal. Candidates apply, recruiters shortlist, AI matches resumes to jobs." },
      { property: "og:url", content: "https://talent-pulse-99.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://talent-pulse-99.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  const featured = jobs.slice(0, 6);
  const topCos = companies.slice(0, 8);
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center animate-slide-up">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> AI-powered hiring
            </span>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Find the Right Talent <span className="text-primary">with AI</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              SmartRecruit matches candidates to roles using intelligent resume scoring,
              streamlining shortlisting, interviews, and offers for global enterprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/jobs">
                  <Search className="mr-2 h-4 w-4" /> Explore Jobs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/register">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "12k+", l: "Candidates" },
                { v: "300+", l: "Companies" },
                { v: "1.8k+", l: "Open Jobs" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-hero opacity-10 blur-3xl" />
            <Card className="relative shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">AI Resume Match</p>
                    <p className="text-xs text-muted-foreground">Live compatibility scoring</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { k: "Java", m: true }, { k: "Spring Boot", m: true },
                    { k: "Docker", m: false }, { k: "AWS", m: false },
                  ].map((s) => (
                    <div key={s.k} className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                      <span className="text-sm font-medium">{s.k}</span>
                      <span className={`text-xs font-medium ${s.m ? "text-success" : "text-muted-foreground"}`}>
                        {s.m ? "✓ Matched" : "Missing"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-lg bg-gradient-hero p-4 text-primary-foreground">
                  <div>
                    <p className="text-xs opacity-90">Compatibility</p>
                    <p className="text-2xl font-bold">50%</p>
                  </div>
                  <CheckCircle2 className="h-10 w-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            From profile to offer letter — a streamlined, AI-assisted journey.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { i: Users, t: "Create Profile", d: "Sign up as a candidate or recruiter in minutes." },
            { i: Briefcase, t: "Post or Apply", d: "Recruiters post jobs; candidates apply with one click." },
            { i: Brain, t: "AI Matching", d: "Our engine scores resumes against role requirements." },
            { i: TrendingUp, t: "Hire Faster", d: "Shortlist, interview, and release offers seamlessly." },
          ].map((s, i) => (
            <Card key={s.t} className="shadow-card-soft transition hover:shadow-elevated" style={{ animationDelay: `${i * 60}ms` }}>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <s.i className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Top Companies Hiring</h2>
              <p className="mt-2 text-muted-foreground">Global enterprises trust SmartRecruit.</p>
            </div>
            <Button asChild variant="ghost"><Link to="/companies">View all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {topCos.map((c) => (
              <Card key={c.id} className="text-center shadow-card-soft transition hover:shadow-elevated">
                <CardContent className="p-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-hero font-bold text-primary-foreground">
                    {c.logo}
                  </div>
                  <p className="mt-3 truncate text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.openJobs} jobs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Jobs</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked openings updated daily.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/jobs">Browse all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((j) => (
            <Card key={j.id} className="group shadow-card-soft transition hover:shadow-elevated">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{j.company}</p>
                    <h3 className="mt-1 font-semibold leading-snug">{j.title}</h3>
                  </div>
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{j.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {j.skills.slice(0, 4).map((s) => (
                    <span key={s} className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>📍 {j.location}</span>
                  <span>💼 {j.salary}</span>
                </div>
                <Button asChild className="mt-4 w-full" variant="outline">
                  <Link to="/jobs/$jobId" params={{ jobId: j.id }}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-soft py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">What our users say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "Anita Desai", r: "HR Lead, TCS", q: "We cut shortlisting time by 60%. The AI match score is uncannily accurate." },
              { n: "Rahul Kumar", r: "Software Engineer", q: "Got matched to roles I'd never have found. Three offers in two weeks." },
              { n: "Meera Joshi", r: "Talent Manager, Infosys", q: "The dashboard makes pipeline tracking effortless for our entire team." },
            ].map((t) => (
              <Card key={t.n} className="shadow-card-soft">
                <CardContent className="p-6">
                  <p className="text-sm italic text-muted-foreground">"{t.q}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {t.n[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.n}</p>
                      <p className="text-xs text-muted-foreground">{t.r}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="overflow-hidden shadow-elevated">
          <CardContent className="grid gap-6 bg-gradient-hero p-10 text-primary-foreground md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold">Ready to transform your hiring?</h2>
              <p className="mt-2 opacity-90">Join 300+ companies and 12k+ candidates already on SmartRecruit.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" variant="secondary"><Link to="/register">Get Started</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Talk to Sales</Link></Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
