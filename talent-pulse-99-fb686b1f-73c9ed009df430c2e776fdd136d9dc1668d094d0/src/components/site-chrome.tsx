import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const nav = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, primaryRole } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const dashHref = primaryRole === "hr" ? "/hr" : primaryRole === "admin" ? "/admin" : "/candidate";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground font-bold">
            SR
          </div>
          <span className="text-lg font-semibold tracking-tight">SmartRecruit</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === n.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <Button asChild variant="default">
              <Link to={dashHref}>Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login" search={{ role: "hr" } as any}><Users className="mr-1 h-4 w-4" />HR</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login" search={{ role: "admin" } as any}><ShieldCheck className="mr-1 h-4 w-4" />Admin</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {user ? (
                <Button asChild className="flex-1">
                  <Link to={dashHref}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground font-bold">
              SR
            </div>
            <span className="text-lg font-semibold">SmartRecruit</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered recruitment for the modern enterprise.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">For Candidates</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/jobs" className="hover:text-primary">Browse Jobs</Link></li>
            <li><Link to="/companies" className="hover:text-primary">Companies</Link></li>
            <li><Link to="/register" className="hover:text-primary">Create Profile</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">For Recruiters</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/register" className="hover:text-primary">Post a Job</Link></li>
            <li><Link to="/about" className="hover:text-primary">Why SmartRecruit</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Talk to Sales</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><a className="hover:text-primary" href="#">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 SmartRecruit. Built for enterprise recruitment.
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
