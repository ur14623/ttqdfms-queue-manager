import { BarChart, Download, Building2, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MinistryDashboard = () => {
  const systemStats = {
    totalStations: 12,
    activeVehicles: 234,
    dailyRevenue: "$45,230",
    dailyPassengers: 8942
  };

  const stationData = [
    { name: "Central Station", vehicles: 45, revenue: "$12,450", status: "normal" },
    { name: "Airport Terminal", vehicles: 38, revenue: "$9,820", status: "normal" },
    { name: "Downtown Hub", vehicles: 52, revenue: "$15,340", status: "warning" },
    { name: "Harbor Terminal", vehicles: 28, revenue: "$7,620", status: "normal" },
  ];

  const alerts = [
    { type: "warning", message: "Downtown Hub exceeds capacity threshold by 15%", station: "Downtown Hub" },
    { type: "info", message: "Central Station performing above average today", station: "Central Station" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ministry Dashboard</h1>
              <p className="text-sm text-muted-foreground">System-wide monitoring & oversight</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* System-wide Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Stations
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalStations}</div>
              <p className="text-xs text-muted-foreground mt-1">Monitored locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Vehicles
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeVehicles}</div>
              <p className="text-xs text-success mt-1">+8% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Revenue
              </CardTitle>
              <BarChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{systemStats.dailyRevenue}</div>
              <p className="text-xs text-muted-foreground mt-1">All stations combined</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Passengers
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.dailyPassengers}</div>
              <p className="text-xs text-muted-foreground mt-1">System-wide traffic</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <Card className="border-warning/50 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.station}</p>
                      </div>
                      <Badge variant={alert.type === "warning" ? "destructive" : "default"}>
                        {alert.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Station Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Station Performance Overview</CardTitle>
            <CardDescription>Real-time monitoring across all stations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Station</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vehicles</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stationData.map((station, index) => (
                    <tr key={index} className="border-b hover:bg-accent/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{station.name}</td>
                      <td className="py-3 px-4">{station.vehicles}</td>
                      <td className="py-3 px-4 font-mono">{station.revenue}</td>
                      <td className="py-3 px-4">
                        {station.status === "normal" ? (
                          <Badge className="bg-success text-success-foreground">Normal</Badge>
                        ) : (
                          <Badge className="bg-warning text-warning-foreground">Warning</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinistryDashboard;
