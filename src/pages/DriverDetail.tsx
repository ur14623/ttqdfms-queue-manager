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
import { ArrowLeft, Edit, Trash2, PlusCircle, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock trip history data
const tripHistory = [
  { id: 1, date: "2025-01-15", route: "Manila → Baguio", passengers: 12, fare: "₱5,400", status: "Completed", time: "08:30 AM" },
  { id: 2, date: "2025-01-15", route: "Manila → Batangas", passengers: 8, fare: "₱1,600", status: "Completed", time: "02:15 PM" },
  { id: 3, date: "2025-01-14", route: "Manila → Baguio", passengers: 10, fare: "₱4,500", status: "Completed", time: "09:00 AM" },
  { id: 4, date: "2025-01-14", route: "Manila → Pampanga", passengers: 15, fare: "₱2,250", status: "Completed", time: "03:30 PM" },
  { id: 5, date: "2025-01-13", route: "Manila → Baguio", passengers: 11, fare: "₱4,950", status: "Completed", time: "07:45 AM" },
  { id: 6, date: "2025-01-13", route: "Manila → Batangas", passengers: 9, fare: "₱1,800", status: "Completed", time: "01:00 PM" },
];

export default function DriverDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Mock driver data - in real app, fetch based on id
  const [driver, setDriver] = useState({
    id: id || "1",
    name: "Juan Dela Cruz",
    phone: "0917-123-4567",
    plate: "ABC-1234",
    type: "Van",
    status: "Active",
    trips: 145,
    email: "juan.delacruz@email.com",
    licenseNumber: "N01-12-345678",
    licenseExpiry: "2026-12-31",
    vehicleModel: "Toyota Hiace",
    vehicleYear: "2020",
    vehicleColor: "White",
    seatingCapacity: "15",
    dateRegistered: "2023-01-15",
  });

  const [editForm, setEditForm] = useState(driver);

  const handleEdit = () => {
    setDriver(editForm);
    setIsEditDialogOpen(false);
    toast.success("Driver information updated successfully");
  };

  const handleDelete = () => {
    toast.success("Driver deleted successfully");
    navigate("/drivers");
  };

  const handleAddToQueue = () => {
    navigate("/add-queue");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success">{status}</Badge>;
      case "Resting":
        return <Badge variant="secondary">{status}</Badge>;
      case "Suspended":
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/drivers")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{driver.name}</h1>
              <p className="text-muted-foreground">Driver ID: #{driver.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="default" onClick={handleAddToQueue} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add to Queue
            </Button>
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
              <CardTitle>Driver Information</CardTitle>
              <CardDescription>Personal and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{driver.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(driver.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{driver.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{driver.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Number</p>
                  <p className="font-medium">{driver.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Expiry</p>
                  <p className="font-medium">{driver.licenseExpiry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                  <p className="font-medium">{driver.trips}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Registered</p>
                  <p className="font-medium">{driver.dateRegistered}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Vehicle details and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plate Number</p>
                  <p className="font-medium">{driver.plate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Type</p>
                  <p className="font-medium">{driver.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{driver.vehicleModel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{driver.vehicleYear}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-medium">{driver.vehicleColor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seating Capacity</p>
                  <p className="font-medium">{driver.seatingCapacity} passengers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Trip History
            </CardTitle>
            <CardDescription>All trips completed by this driver</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Fare Collected</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tripHistory.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.date}</TableCell>
                      <TableCell>{trip.time}</TableCell>
                      <TableCell>{trip.route}</TableCell>
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
            <DialogTitle>Edit Driver Information</DialogTitle>
            <DialogDescription>Update driver and vehicle details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-license">License Number</Label>
                <Input
                  id="edit-license"
                  value={editForm.licenseNumber}
                  onChange={(e) => setEditForm({ ...editForm, licenseNumber: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-expiry">License Expiry</Label>
                <Input
                  id="edit-expiry"
                  type="date"
                  value={editForm.licenseExpiry}
                  onChange={(e) => setEditForm({ ...editForm, licenseExpiry: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-plate">Vehicle Plate Number</Label>
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
                  value={editForm.vehicleModel}
                  onChange={(e) => setEditForm({ ...editForm, vehicleModel: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  value={editForm.vehicleYear}
                  onChange={(e) => setEditForm({ ...editForm, vehicleYear: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color">Color</Label>
                <Input
                  id="edit-color"
                  value={editForm.vehicleColor}
                  onChange={(e) => setEditForm({ ...editForm, vehicleColor: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-capacity">Seating Capacity</Label>
              <Input
                id="edit-capacity"
                value={editForm.seatingCapacity}
                onChange={(e) => setEditForm({ ...editForm, seatingCapacity: e.target.value })}
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
              This will permanently delete {driver.name} and all associated records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Driver
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
