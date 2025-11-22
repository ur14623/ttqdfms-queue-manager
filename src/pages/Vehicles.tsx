import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, Eye, Edit } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockVehicles = [
  { id: 1, plate: "ABC-1234", type: "Van", model: "Toyota Hiace", year: "2020", color: "White", capacity: 15, status: "Active", driver: "Juan Dela Cruz" },
  { id: 2, plate: "XYZ-5678", type: "Bus", model: "Mitsubishi Rosa", year: "2019", color: "Blue", capacity: 25, status: "Active", driver: "Maria Santos" },
  { id: 3, plate: "DEF-9012", type: "Van", model: "Nissan Urvan", year: "2021", color: "Silver", capacity: 12, status: "Maintenance", driver: "Pedro Garcia" },
  { id: 4, plate: "GHI-3456", type: "Van", model: "Toyota Hiace", year: "2022", color: "White", capacity: 15, status: "Active", driver: "Ana Lopez" },
  { id: 5, plate: "JKL-7890", type: "Bus", model: "Hino", year: "2018", color: "Red", capacity: 30, status: "Inactive", driver: "Carlos Rivera" },
];

export default function Vehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plate: "",
    type: "",
    model: "",
    year: "",
    color: "",
    capacity: "",
    driver: "",
  });

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddVehicle = () => {
    const vehicle = {
      id: vehicles.length + 1,
      ...newVehicle,
      capacity: parseInt(newVehicle.capacity),
      status: "Active",
    };
    setVehicles([...vehicles, vehicle]);
    setIsAddDialogOpen(false);
    setNewVehicle({
      plate: "",
      type: "",
      model: "",
      year: "",
      color: "",
      capacity: "",
      driver: "",
    });
    toast.success("Vehicle added successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success">{status}</Badge>;
      case "Maintenance":
        return <Badge variant="secondary">{status}</Badge>;
      case "Inactive":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vehicle Management</h1>
            <p className="text-muted-foreground">Manage all vehicles in the station</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Vehicles</CardTitle>
            <CardDescription>Total vehicles: {vehicles.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by plate number, type, model, or driver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plate Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Assigned Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.plate}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.capacity} seats</TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Vehicle Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>Register a new vehicle to the station</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="plate">Plate Number</Label>
                <Input
                  id="plate"
                  placeholder="ABC-1234"
                  value={newVehicle.plate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Input
                  id="type"
                  placeholder="Van, Bus, etc."
                  value={newVehicle.type}
                  onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="Toyota Hiace"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="2020"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="White"
                  value={newVehicle.color}
                  onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="capacity">Seating Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="15"
                  value={newVehicle.capacity}
                  onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driver">Assigned Driver</Label>
                <Input
                  id="driver"
                  placeholder="Driver Name"
                  value={newVehicle.driver}
                  onChange={(e) => setNewVehicle({ ...newVehicle, driver: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVehicle}>Add Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
