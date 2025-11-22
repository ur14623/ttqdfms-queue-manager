import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowUp, ArrowDown, X, PlayCircle, CheckCircle } from "lucide-react";

const queueData = [
  { id: 1, position: 1, driver: "Juan Dela Cruz", plate: "ABC-1234", timeJoined: "08:30 AM", status: "Waiting" },
  { id: 2, position: 2, driver: "Maria Santos", plate: "DEF-5678", timeJoined: "08:45 AM", status: "Waiting" },
  { id: 3, position: 3, driver: "Pedro Reyes", plate: "GHI-9012", timeJoined: "09:00 AM", status: "On Trip" },
  { id: 4, position: 4, driver: "Ana Garcia", plate: "JKL-3456", timeJoined: "09:15 AM", status: "Waiting" },
  { id: 5, position: 5, driver: "Carlos Lopez", plate: "MNO-7890", timeJoined: "09:30 AM", status: "Delayed" },
];

export default function Queue() {
  const [selectedRoute, setSelectedRoute] = useState("manila-baguio");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Waiting":
        return <Badge variant="secondary">{status}</Badge>;
      case "On Trip":
        return <Badge className="bg-primary">{status}</Badge>;
      case "Delayed":
        return <Badge variant="destructive">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-success">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Queue Management</h1>
            <p className="text-muted-foreground">Manage driver queues per route</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add to Queue
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-64">
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger>
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manila-baguio">Manila → Baguio</SelectItem>
                <SelectItem value="manila-batangas">Manila → Batangas</SelectItem>
                <SelectItem value="manila-pampanga">Manila → Pampanga</SelectItem>
                <SelectItem value="manila-zambales">Manila → Zambales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-base px-4 py-1">
              Queue Length: {queueData.length}
            </Badge>
            <Badge className="bg-success text-base px-4 py-1">
              Next Departure: 10:00 AM
            </Badge>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Position</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Vehicle Plate</TableHead>
                <TableHead>Time Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queueData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold text-primary">#{item.position}</TableCell>
                  <TableCell className="font-medium">{item.driver}</TableCell>
                  <TableCell>{item.plate}</TableCell>
                  <TableCell className="text-muted-foreground">{item.timeJoined}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Move up">
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Move down">
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Start trip">
                        <PlayCircle className="h-4 w-4 text-success" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Complete trip">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Remove from queue">
                        <X className="h-4 w-4 text-destructive" />
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
