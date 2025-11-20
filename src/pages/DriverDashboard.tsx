import { Wallet, Clock, MapPin, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DriverDashboard = () => {
  const queueInfo = {
    route: "Central - Airport",
    position: 3,
    estimatedWait: "12 minutes",
    vehiclesAhead: 2,
    status: "waiting"
  };

  const walletInfo = {
    balance: "$342.50",
    todayEarnings: "$125.00",
    tripsCompleted: 8
  };

  const recentTrips = [
    { id: "T-001", route: "Central - Airport", fare: "$25.00", passengers: 4, time: "10:30 AM" },
    { id: "T-002", route: "Downtown - Harbor", fare: "$18.50", passengers: 3, time: "9:15 AM" },
    { id: "T-003", route: "Central - Airport", fare: "$25.00", passengers: 4, time: "8:00 AM" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Driver Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
            </div>
            <Button variant="outline">Profile</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Current Queue Status */}
        <Card className="border-primary/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Current Queue Position
            </CardTitle>
            <CardDescription>Your position in the active queue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Route</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {queueInfo.route}
                </p>
              </div>
              <Badge className="bg-warning text-warning-foreground">In Queue</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-2xl font-bold text-primary">{queueInfo.position}</p>
                <p className="text-xs text-muted-foreground">Your Position</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{queueInfo.vehiclesAhead}</p>
                <p className="text-xs text-muted-foreground">Ahead of You</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">{queueInfo.estimatedWait}</p>
                <p className="text-xs text-muted-foreground">Est. Wait</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Wallet Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{walletInfo.balance}</div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Earnings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{walletInfo.todayEarnings}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {walletInfo.tripsCompleted} trips completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Trip Tickets
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{walletInfo.tripsCompleted}</div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                View All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>Your trip history for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border border-border">
                  <div className="space-y-1">
                    <p className="font-mono text-sm text-muted-foreground">{trip.id}</p>
                    <p className="font-medium">{trip.route}</p>
                    <p className="text-xs text-muted-foreground">{trip.passengers} passengers • {trip.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">{trip.fare}</p>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;
