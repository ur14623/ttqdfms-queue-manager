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
import { Plus, Edit, ToggleLeft, ToggleRight, Loader2, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { routesService, CreateRoutePayload } from "@/services/routes.service";
import { useToast } from "@/hooks/use-toast";

export default function RoutesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateRoutePayload>({
    name: "",
    distance: "",
    price_per_passenger: "",
    start_location: "",
    end_location: "",
    is_active: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: routesResponse, isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: () => routesService.getRoutes(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateRoutePayload) => routesService.createRoute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      toast({ title: "Success", description: "Route created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateRoutePayload }) =>
      routesService.updateRoute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      toast({ title: "Success", description: "Route updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => routesService.deleteRoute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      toast({ title: "Success", description: "Route deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, route }: { id: number; route: CreateRoutePayload }) =>
      routesService.updateRoute(id, { ...route, is_active: !route.is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      toast({ title: "Success", description: "Route status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      distance: "",
      price_per_passenger: "",
      start_location: "",
      end_location: "",
      is_active: true,
    });
    setEditingRoute(null);
  };

  const handleSubmit = () => {
    if (editingRoute) {
      updateMutation.mutate({ id: editingRoute, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (route: any) => {
    setEditingRoute(route.id);
    setFormData({
      name: route.name,
      distance: route.distance,
      price_per_passenger: route.price_per_passenger,
      start_location: route.start_location,
      end_location: route.end_location,
      is_active: route.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (route: any) => {
    toggleStatusMutation.mutate({
      id: route.id,
      route: {
        name: route.name,
        distance: route.distance,
        price_per_passenger: route.price_per_passenger,
        start_location: route.start_location,
        end_location: route.end_location,
        is_active: route.is_active,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Route Management</h1>
            <p className="text-muted-foreground">Manage station routes and pricing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingRoute ? "Edit Route" : "Add New Route"}</DialogTitle>
                <DialogDescription>
                  {editingRoute ? "Update route details" : "Create a new route for your station"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input
                    id="routeName"
                    placeholder="City Center - Airport"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startLocation">Start Location</Label>
                    <Input
                      id="startLocation"
                      placeholder="City Center"
                      value={formData.start_location}
                      onChange={(e) => setFormData({ ...formData, start_location: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endLocation">End Location</Label>
                    <Input
                      id="endLocation"
                      placeholder="Airport"
                      value={formData.end_location}
                      onChange={(e) => setFormData({ ...formData, end_location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="distance">Distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      step="0.01"
                      placeholder="25.50"
                      value={formData.distance}
                      onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price per Passenger</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="5.00"
                      value={formData.price_per_passenger}
                      onChange={(e) => setFormData({ ...formData, price_per_passenger: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingRoute ? "Update Route" : "Add Route"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border bg-card">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Start → End</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Price/Passenger</TableHead>
                  <TableHead>Queue</TableHead>
                  <TableHead>Drivers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routesResponse?.results.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No routes found. Create your first route to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  routesResponse?.results.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {route.start_location} → {route.end_location}
                      </TableCell>
                      <TableCell>{route.distance} km</TableCell>
                      <TableCell className="font-semibold text-success">
                        ${route.price_per_passenger}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{route.queue_count} vehicles</Badge>
                      </TableCell>
                      <TableCell>{route.driver_count} drivers</TableCell>
                      <TableCell>
                        {route.is_active ? (
                          <Badge className="bg-success">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(route)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleToggleStatus(route)}
                            disabled={toggleStatusMutation.isPending}
                          >
                            {route.is_active ? (
                              <ToggleRight className="h-4 w-4 text-success" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this route?")) {
                                deleteMutation.mutate(route.id);
                              }
                            }}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
