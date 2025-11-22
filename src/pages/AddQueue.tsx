import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Clock, User, Car } from "lucide-react";
import { toast } from "sonner";

export default function AddQueue() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  const handleAddToQueue = () => {
    if (!selectedRoute || !selectedDriver) {
      toast.error("Please select both route and driver");
      return;
    }
    
    toast.success("Driver added to queue successfully!", {
      description: `Driver has been added to the queue for ${selectedRoute}`,
    });
    
    setSelectedRoute("");
    setSelectedDriver("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add to Queue</h1>
          <p className="text-muted-foreground">Add drivers to route queues</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Queue Assignment</CardTitle>
              <CardDescription>Select route and driver to add to queue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="route">Select Route</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger id="route">
                    <SelectValue placeholder="Choose route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manila → Baguio">Manila → Baguio (₱450)</SelectItem>
                    <SelectItem value="Manila → Batangas">Manila → Batangas (₱200)</SelectItem>
                    <SelectItem value="Manila → Pampanga">Manila → Pampanga (₱150)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="driver">Select Driver / Vehicle</Label>
                <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                  <SelectTrigger id="driver">
                    <SelectValue placeholder="Choose driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driver1">Juan Dela Cruz - ABC-1234</SelectItem>
                    <SelectItem value="driver2">Maria Santos - DEF-5678</SelectItem>
                    <SelectItem value="driver3">Pedro Reyes - GHI-9012</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority (Optional)</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Normal priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Scheduled Time (Optional)</Label>
                <Input id="time" type="time" />
              </div>

              <Button className="w-full" size="lg" onClick={handleAddToQueue}>
                <PlusCircle className="h-5 w-5 mr-2" />
                Add to Queue
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Queue Status</CardTitle>
                <CardDescription>Active queues for all routes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Manila → Baguio</p>
                      <p className="text-sm text-muted-foreground">5 drivers waiting</p>
                    </div>
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Manila → Batangas</p>
                      <p className="text-sm text-muted-foreground">3 drivers waiting</p>
                    </div>
                    <Clock className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Manila → Pampanga</p>
                      <p className="text-sm text-muted-foreground">7 drivers waiting</p>
                    </div>
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Juan Dela Cruz</p>
                      <p className="text-xs text-muted-foreground">ABC-1234</p>
                    </div>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Active</span>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maria Santos</p>
                      <p className="text-xs text-muted-foreground">DEF-5678</p>
                    </div>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Active</span>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pedro Reyes</p>
                      <p className="text-xs text-muted-foreground">GHI-9012</p>
                    </div>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
