import { useState } from "react";
import { DollarSign, Ticket, Users, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CashierDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleIssueTicket = () => {
    if (!selectedRoute || !selectedVehicle || !passengerCount || !paymentMethod) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Trip ticket issued successfully!");
    // Reset form
    setSelectedRoute("");
    setSelectedVehicle("");
    setPassengerCount("");
    setPaymentMethod("");
  };

  const dailySummary = {
    totalCollected: "$1,245.50",
    ticketsIssued: 52,
    cashPayments: 38,
    mobilePayments: 14
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cashier Dashboard</h1>
            <p className="text-sm text-muted-foreground">Fare collection & ticket issuance</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Collected
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{dailySummary.totalCollected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tickets Issued
              </CardTitle>
              <Ticket className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailySummary.ticketsIssued}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cash Payments
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailySummary.cashPayments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mobile Payments
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailySummary.mobilePayments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Fare Collection Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Issue Trip Ticket
            </CardTitle>
            <CardDescription>Collect fare and generate ticket for passengers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="route">Select Route</Label>
                  <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                    <SelectTrigger id="route">
                      <SelectValue placeholder="Choose route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central-airport">Central - Airport</SelectItem>
                      <SelectItem value="downtown-harbor">Downtown - Harbor</SelectItem>
                      <SelectItem value="north-mall">North Station - Mall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Select Vehicle</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger id="vehicle">
                      <SelectValue placeholder="Choose vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABC-1234">ABC-1234 (John Doe)</SelectItem>
                      <SelectItem value="XYZ-5678">XYZ-5678 (Jane Smith)</SelectItem>
                      <SelectItem value="DEF-9012">DEF-9012 (Mike Johnson)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    placeholder="Enter count"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="qr">QR Code</SelectItem>
                      <SelectItem value="ussd">USSD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Fare Amount:</span>
                  <span className="text-2xl font-bold text-primary">$25.00</span>
                </div>
                <Button onClick={handleIssueTicket} className="w-full" size="lg">
                  Confirm Payment & Issue Ticket
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashierDashboard;
