import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell, Briefcase, Building2, ChartBar, FileText, Home, LogOut, Search,
  Settings, Sparkles, User, Users, CalendarDays, ClipboardList, FilePlus,
  ShieldCheck, BarChart3,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/lib/mock-data";

type NavItem = { label: string; to: string; icon: typeof Home };

const candidateNav: NavItem[] = [
  { label: "Dashboard", to: "/candidate", icon: Home },
  { label: "My Profile", to: "/candidate/profile", icon: User },
  { label: "Resume", to: "/candidate/resume", icon: FileText },
  { label: "Applied Jobs", to: "/candidate/applied", icon: ClipboardList },
  { label: "Recommended", to: "/candidate/recommended", icon: Sparkles },
  { label: "AI Match", to: "/candidate/match", icon: Sparkles },
  { label: "Interviews", to: "/candidate/interviews", icon: CalendarDays },
  { label: "Notifications", to: "/candidate/notifications", icon: Bell },
  { label: "Settings", to: "/candidate/settings", icon: Settings },
];

const hrNav: NavItem[] = [
  { label: "Dashboard", to: "/hr", icon: Home },
  { label: "Post New Job", to: "/hr/post-job", icon: FilePlus },
  { label: "Manage Jobs", to: "/hr/jobs", icon: Briefcase },
  { label: "Applications", to: "/hr/applications", icon: ClipboardList },
  { label: "Candidates", to: "/hr/candidates", icon: Users },
  { label: "Interviews", to: "/hr/interviews", icon: CalendarDays },
  { label: "Reports", to: "/hr/reports", icon: BarChart3 },
  { label: "Analytics", to: "/hr/analytics", icon: ChartBar },
  { label: "Settings", to: "/hr/settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: Home },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Recruiters", to: "/admin/recruiters", icon: ShieldCheck },
  { label: "Candidates", to: "/admin/candidates", icon: User },
  { label: "Companies", to: "/admin/companies", icon: Building2 },
  { label: "Jobs", to: "/admin/jobs", icon: Briefcase },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function navFor(role: Role): NavItem[] {
  if (role === "hr") return hrNav;
  if (role === "admin") return adminNav;
  return candidateNav;
}

function AppSidebar({ role }: { role: Role }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const items = navFor(role);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2 px-3 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground font-bold">
            SR
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">SmartRecruit</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {role} portal
              </span>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.to;
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Back to site</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function DashboardLayout({
  role,
  title,
  children,
}: {
  role: Role;
  title: string;
  children: ReactNode;
}) {
  const { user, profile, roles, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/login" }); return; }
    // Role gate: user must hold the requested role
    if (roles.length > 0 && !roles.includes(role)) {
      const dest = roles.includes("admin") ? "/admin" : roles.includes("hr") ? "/hr" : "/candidate";
      navigate({ to: dest });
    }
  }, [loading, user, roles, role, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }


  const displayName =
    profile?.full_name ?? user?.email ?? (role === "hr" ? "Priya Mehta" : role === "admin" ? "Admin User" : "Candidate");
  const initials = displayName
    .split(/\s+/)
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar role={role} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-border bg-background/90 px-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-base font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search…"
                  className="h-9 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="hidden sm:inline-flex capitalize">
                {role}
              </Badge>
              <Avatar className="h-8 w-8">
                {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={displayName} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </div>
          </header>
          <main className="flex-1 bg-muted/30 p-4 md:p-6 animate-fade-in">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
