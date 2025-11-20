import { Users, Car, DollarSign, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const metrics = [
    { title: "Active Drivers", value: "48", icon: Users, change: "+12%", trend: "up" },
    { title: "Vehicles in Queue", value: "23", icon: Car, change: "-5%", trend: "down" },
    { title: "Passengers Today", value: "1,247", icon: TrendingUp, change: "+18%", trend: "up" },
    { title: "Revenue Today", value: "$12,450", icon: DollarSign, change: "+23%", trend: "up" },
  ];

  const queueData = [
    { route: "Central - Airport", queueNo: 1, driver: "John Doe", plate: "ABC-1234", status: "called", eta: "2 min" },
    { route: "Central - Airport", queueNo: 2, driver: "Jane Smith", plate: "XYZ-5678", status: "waiting", eta: "8 min" },
    { route: "Downtown - Harbor", queueNo: 1, driver: "Mike Johnson", plate: "DEF-9012", status: "completed", eta: "-" },
    { route: "Downtown - Harbor", queueNo: 2, driver: "Sarah Williams", plate: "GHI-3456", status: "waiting", eta: "5 min" },
    { route: "North Station - Mall", queueNo: 1, driver: "Robert Brown", plate: "JKL-7890", status: "waiting", eta: "3 min" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "called":
        return <Badge className="bg-warning text-warning-foreground">Called</Badge>;
      default:
        return <Badge variant="outline">Waiting</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time fleet management overview</p>
            </div>
            <Button>Add Driver</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {metric.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Queue Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Live Queue Status
            </CardTitle>
            <CardDescription>Real-time vehicle queue monitoring across all routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Route</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Queue #</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Driver</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Plate</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {queueData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-accent/30 transition-colors">
                      <td className="py-3 px-4">{item.route}</td>
                      <td className="py-3 px-4 font-mono">{item.queueNo}</td>
                      <td className="py-3 px-4">{item.driver}</td>
                      <td className="py-3 px-4 font-mono">{item.plate}</td>
                      <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertCircle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm">Route "Central - Airport" has 15 vehicles waiting (above threshold)</p>
                <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm">Driver "ABC-1234" has been waiting for 45+ minutes</p>
                <p className="text-xs text-muted-foreground mt-1">8 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
