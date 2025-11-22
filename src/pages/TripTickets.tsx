import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Printer, Download, QrCode } from "lucide-react";

export default function TripTickets() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trip Ticket Preview</h1>
          <p className="text-muted-foreground">View and print trip tickets</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-2">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-center text-2xl">TRIP TICKET</CardTitle>
              <p className="text-center text-sm opacity-90">Central Bus Terminal</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Number</p>
                  <p className="font-bold text-lg">#TKT-001234</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">Nov 20, 2025</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Route</p>
                  <p className="font-bold text-xl">Manila → Baguio</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-semibold">Juan Dela Cruz</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-semibold">ABC-1234</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-bold text-2xl">4</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Fare</p>
                    <p className="font-bold text-2xl text-success">₱1,800</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Departure Time</p>
                  <p className="font-semibold">10:30 AM</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-center py-4">
                <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <p>Scan QR code for verification</p>
                <p className="mt-1">Keep this ticket for your records</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" size="lg">
                  <Printer className="h-5 w-5" />
                  Print Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <Download className="h-5 w-5" />
                  Save as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <Printer className="h-5 w-5" />
                  Reprint Ticket
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-semibold">#TKT-00123{i}</p>
                      <p className="text-sm text-muted-foreground">Manila → Baguio</p>
                    </div>
                    <p className="text-sm text-muted-foreground">10:{20 + i} AM</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
