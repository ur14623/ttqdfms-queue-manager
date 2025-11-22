import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Route, 
  List, 
  DollarSign, 
  Ticket,
  Calendar,
  Menu,
  X,
  LogOut,
  Car,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Drivers", href: "/drivers", icon: Users },
  { name: "Vehicles", href: "/vehicles", icon: Car },
  { name: "Routes", href: "/routes", icon: Route },
  { name: "Queue", href: "/queue", icon: List },
  { name: "Fare Collection", href: "/fare-collection", icon: DollarSign },
  { name: "Trip Tickets", href: "/trip-tickets", icon: Ticket },
  { name: "Schedule", href: "/schedule", icon: Calendar },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 border-r border-sidebar-border/50 backdrop-blur-xl transition-all duration-300 ease-in-out lg:translate-x-0 shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="relative flex h-20 items-center justify-between px-6 border-b border-sidebar-border/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground tracking-tight">Station Manager</h1>
              <p className="text-xs text-muted-foreground">Control Center</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-all"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          <div className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main Menu
          </div>
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 overflow-hidden",
                  "hover:scale-[1.02] hover:shadow-md",
                  isActive
                    ? "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/70"
                )}
                onClick={() => setSidebarOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary-foreground animate-scale-in" />
                )}
                
                {/* Icon with animation */}
                <div className={cn(
                  "flex items-center justify-center transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive ? "drop-shadow-sm" : ""
                  )} />
                </div>
                
                {/* Text */}
                <span className="flex-1">{item.name}</span>
                
                {/* Chevron indicator */}
                <ChevronRight className={cn(
                  "h-4 w-4 transition-all duration-200 opacity-0",
                  isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-1"
                )} />
                
                {/* Hover effect background */}
                {!isActive && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border/30 p-4 bg-sidebar-accent/20">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive transition-all duration-200 rounded-xl py-3 group"
          >
            <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card/95 backdrop-blur-md px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-accent transition-all duration-200 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <p className="text-sm font-medium text-foreground">Welcome, Station Manager</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
