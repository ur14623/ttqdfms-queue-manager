import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, ToggleLeft, ToggleRight } from "lucide-react";

const routesData = [
  { id: 1, name: "Manila → Baguio", distance: "250 km", price: "₱450", queue: 8, drivers: 12, status: "Active" },
  { id: 2, name: "Manila → Batangas", distance: "110 km", price: "₱200", queue: 5, drivers: 8, status: "Active" },
  { id: 3, name: "Manila → Pampanga", distance: "80 km", price: "₱150", queue: 12, drivers: 15, status: "Active" },
  { id: 4, name: "Manila → Zambales", distance: "180 km", price: "₱320", queue: 7, drivers: 10, status: "Active" },
  { id: 5, name: "Manila → Laguna", distance: "65 km", price: "₱120", queue: 0, drivers: 3, status: "Inactive" },
];

export default function RoutesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Route Management</h1>
            <p className="text-muted-foreground">Manage station routes and pricing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogDescription>Create a new route for your station</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input id="routeName" placeholder="Manila → Baguio" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input id="distance" type="number" placeholder="250" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price per Passenger</Label>
                  <Input id="price" placeholder="₱450" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Route</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Name</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Price/Passenger</TableHead>
                <TableHead>Queue Length</TableHead>
                <TableHead>Assigned Drivers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routesData.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.name}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                  <TableCell className="font-semibold text-success">{route.price}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{route.queue} vehicles</Badge>
                  </TableCell>
                  <TableCell>{route.drivers} drivers</TableCell>
                  <TableCell>
                    {route.status === "Active" ? (
                      <Badge className="bg-success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        {route.status === "Active" ? (
                          <ToggleRight className="h-4 w-4 text-success" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
