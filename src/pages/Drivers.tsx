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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Ban, Eye } from "lucide-react";

const driversData = [
  { id: 1, name: "Juan Dela Cruz", phone: "0917-123-4567", plate: "ABC-1234", type: "Van", status: "Active", trips: 145 },
  { id: 2, name: "Maria Santos", phone: "0918-234-5678", plate: "DEF-5678", type: "Bus", status: "Active", trips: 198 },
  { id: 3, name: "Pedro Reyes", phone: "0919-345-6789", plate: "GHI-9012", type: "Van", status: "Resting", trips: 87 },
  { id: 4, name: "Ana Garcia", phone: "0920-456-7890", plate: "JKL-3456", type: "Bus", status: "Active", trips: 156 },
  { id: 5, name: "Carlos Lopez", phone: "0921-567-8901", plate: "MNO-7890", type: "Van", status: "Suspended", trips: 72 },
];

export default function Drivers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDrivers = driversData.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
            <p className="text-muted-foreground">Manage and track all drivers</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>Enter driver details to register them in the system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Juan Dela Cruz" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="0917-123-4567" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plate">Vehicle Plate Number</Label>
                  <Input id="plate" placeholder="ABC-1234" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <Input id="type" placeholder="Van / Bus" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Driver</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Trips</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.plate}</TableCell>
                  <TableCell>{driver.type}</TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>{driver.trips}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate(`/drivers/${driver.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate(`/drivers/${driver.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Ban className="h-4 w-4" />
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
