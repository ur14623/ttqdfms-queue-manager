import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Edit, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock maintenance history data
const maintenanceHistory = [
  { id: 1, date: "2025-01-10", type: "Oil Change", cost: "₱2,500", status: "Completed", notes: "Regular maintenance" },
  { id: 2, date: "2025-01-05", type: "Tire Replacement", cost: "₱8,000", status: "Completed", notes: "Front tires replaced" },
  { id: 3, date: "2024-12-20", type: "General Checkup", cost: "₱1,500", status: "Completed", notes: "Routine inspection" },
  { id: 4, date: "2024-12-10", type: "Brake Repair", cost: "₱4,500", status: "Completed", notes: "Rear brakes serviced" },
];

// Mock trip history data
const tripHistory = [
  { id: 1, date: "2025-01-15", route: "Manila → Baguio", driver: "Juan Dela Cruz", passengers: 12, fare: "₱5,400", status: "Completed" },
  { id: 2, date: "2025-01-15", route: "Manila → Batangas", driver: "Juan Dela Cruz", passengers: 8, fare: "₱1,600", status: "Completed" },
  { id: 3, date: "2025-01-14", route: "Manila → Baguio", driver: "Juan Dela Cruz", passengers: 10, fare: "₱4,500", status: "Completed" },
  { id: 4, date: "2025-01-14", route: "Manila → Pampanga", driver: "Juan Dela Cruz", passengers: 15, fare: "₱2,250", status: "Completed" },
];

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Mock vehicle data
  const [vehicle, setVehicle] = useState({
    id: id || "1",
    plate: "ABC-1234",
    type: "Van",
    model: "Toyota Hiace",
    year: "2020",
    color: "White",
    capacity: "15",
    status: "Active",
    driver: "Juan Dela Cruz",
    vin: "JT2BG12K6X0123456",
    registrationDate: "2020-03-15",
    registrationExpiry: "2026-03-15",
    insuranceProvider: "ABC Insurance Co.",
    insuranceExpiry: "2025-12-31",
    lastMaintenance: "2025-01-10",
    totalTrips: 145,
    totalRevenue: "₱324,500",
  });

  const [editForm, setEditForm] = useState(vehicle);

  const handleEdit = () => {
    setVehicle(editForm);
    setIsEditDialogOpen(false);
    toast.success("Vehicle information updated successfully");
  };

  const handleDelete = () => {
    toast.success("Vehicle deleted successfully");
    navigate("/vehicles");
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/vehicles")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{vehicle.plate}</h1>
              <p className="text-muted-foreground">{vehicle.model} - {vehicle.type}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(true)} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Vehicle specifications and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plate Number</p>
                  <p className="font-medium">{vehicle.plate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(vehicle.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{vehicle.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-medium">{vehicle.color}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seating Capacity</p>
                  <p className="font-medium">{vehicle.capacity} passengers</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">VIN Number</p>
                  <p className="font-medium">{vehicle.vin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Driver</p>
                  <p className="font-medium">{vehicle.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                  <p className="font-medium">{vehicle.totalTrips}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration & Insurance</CardTitle>
              <CardDescription>Legal and documentation details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p className="font-medium">{vehicle.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registration Expiry</p>
                  <p className="font-medium">{vehicle.registrationExpiry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Provider</p>
                  <p className="font-medium">{vehicle.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Expiry</p>
                  <p className="font-medium">{vehicle.insuranceExpiry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Maintenance</p>
                  <p className="font-medium">{vehicle.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="font-medium">{vehicle.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Maintenance History
            </CardTitle>
            <CardDescription>All maintenance and repair records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.cost}</TableCell>
                      <TableCell>
                        <Badge className="bg-success">{record.status}</Badge>
                      </TableCell>
                      <TableCell>{record.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Trip History
            </CardTitle>
            <CardDescription>Recent trips completed by this vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Fare Collected</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tripHistory.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.date}</TableCell>
                      <TableCell>{trip.route}</TableCell>
                      <TableCell>{trip.driver}</TableCell>
                      <TableCell>{trip.passengers}</TableCell>
                      <TableCell>{trip.fare}</TableCell>
                      <TableCell>
                        <Badge className="bg-success">{trip.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Information</DialogTitle>
            <DialogDescription>Update vehicle details and documentation</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-plate">Plate Number</Label>
                <Input
                  id="edit-plate"
                  value={editForm.plate}
                  onChange={(e) => setEditForm({ ...editForm, plate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Vehicle Type</Label>
                <Input
                  id="edit-type"
                  value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-model">Model</Label>
                <Input
                  id="edit-model"
                  value={editForm.model}
                  onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  value={editForm.year}
                  onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color">Color</Label>
                <Input
                  id="edit-color"
                  value={editForm.color}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-capacity">Seating Capacity</Label>
                <Input
                  id="edit-capacity"
                  value={editForm.capacity}
                  onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-vin">VIN Number</Label>
                <Input
                  id="edit-vin"
                  value={editForm.vin}
                  onChange={(e) => setEditForm({ ...editForm, vin: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-registration-expiry">Registration Expiry</Label>
                <Input
                  id="edit-registration-expiry"
                  type="date"
                  value={editForm.registrationExpiry}
                  onChange={(e) => setEditForm({ ...editForm, registrationExpiry: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-insurance-expiry">Insurance Expiry</Label>
                <Input
                  id="edit-insurance-expiry"
                  type="date"
                  value={editForm.insuranceExpiry}
                  onChange={(e) => setEditForm({ ...editForm, insuranceExpiry: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-insurance-provider">Insurance Provider</Label>
              <Input
                id="edit-insurance-provider"
                value={editForm.insuranceProvider}
                onChange={(e) => setEditForm({ ...editForm, insuranceProvider: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-driver">Assigned Driver</Label>
              <Input
                id="edit-driver"
                value={editForm.driver}
                onChange={(e) => setEditForm({ ...editForm, driver: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete vehicle {vehicle.plate} and all associated records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Vehicle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
