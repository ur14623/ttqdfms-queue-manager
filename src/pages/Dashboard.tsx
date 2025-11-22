import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Car, CheckCircle, DollarSign, AlertCircle, Clock } from "lucide-react";

const kpiData = [
  {
    title: "Total Drivers",
    value: "48",
    icon: Users,
    trend: "+3 this week",
    color: "text-primary",
  },
  {
    title: "Active Today",
    value: "32",
    icon: Car,
    trend: "Currently working",
    color: "text-success",
  },
  {
    title: "Trips Completed",
    value: "156",
    icon: CheckCircle,
    trend: "Today",
    color: "text-accent",
  },
  {
    title: "Revenue Today",
    value: "₱24,800",
    icon: DollarSign,
    trend: "+12% vs yesterday",
    color: "text-warning",
  },
];

const queueSummary = [
  { route: "Manila → Baguio", drivers: 8, waitTime: "15 mins" },
  { route: "Manila → Batangas", drivers: 5, waitTime: "8 mins" },
  { route: "Manila → Pampanga", drivers: 12, waitTime: "22 mins" },
  { route: "Manila → Zambales", drivers: 7, waitTime: "12 mins" },
];

const alerts = [
  { type: "warning", message: "Driver missing schedule: Juan Dela Cruz", time: "10 mins ago" },
  { type: "info", message: "Queue delay on Manila → Baguio route", time: "25 mins ago" },
  { type: "error", message: "Fare mismatch reported on Trip #1234", time: "1 hour ago" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of station operations</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">{kpi.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Queue Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Live Queue Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queueSummary.map((queue) => (
                  <div
                    key={queue.route}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{queue.route}</p>
                      <p className="text-sm text-muted-foreground">
                        {queue.drivers} drivers waiting
                      </p>
                    </div>
                    <Badge variant="secondary">{queue.waitTime}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full ${
                        alert.type === "error"
                          ? "bg-destructive"
                          : alert.type === "warning"
                          ? "bg-warning"
                          : "bg-primary"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
