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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Users, Receipt, Wallet, Smartphone, QrCode, Phone, Printer, Download, Banknote } from "lucide-react";
import { toast } from "sonner";

export default function FareCollection() {
  const [passengerCount, setPassengerCount] = useState("1");
  const [farePerPassenger] = useState(450);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  
  const totalFare = parseInt(passengerCount || "0") * farePerPassenger;
  const todayCollections = 15420; // Mock data
  const todayTrips = 24; // Mock data

  const handleCollectPayment = () => {
    if (!selectedRoute || !selectedVehicle) {
      toast.error("Please select route and vehicle");
      return;
    }
    
    toast.success("Payment collected successfully!", {
      description: `Total: ₱${totalFare.toLocaleString()} via ${paymentMethod}`,
    });
    
    setShowTicket(true);
  };

  const handlePrintTicket = () => {
    toast.success("Printing ticket...");
  };

  const handleDownloadTicket = () => {
    toast.success("Ticket downloaded");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cashier / Ticket Collector</h1>
          <p className="text-muted-foreground">Fare collection & ticket generation</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Collection Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>Select route, vehicle and passenger information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Label htmlFor="vehicle">Select Vehicle</Label>
                    <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                      <SelectTrigger id="vehicle">
                        <SelectValue placeholder="Choose vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle1">ABC-1234 - Juan Dela Cruz</SelectItem>
                        <SelectItem value="vehicle2">DEF-5678 - Maria Santos</SelectItem>
                        <SelectItem value="vehicle3">GHI-9012 - Pedro Reyes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(e.target.value)}
                    className="text-lg font-semibold"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Selection</CardTitle>
                <CardDescription>Choose how the passenger will pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid grid-cols-2 gap-4">
                    <Label
                      htmlFor="cash"
                      className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="cash" id="cash" className="sr-only" />
                      <Banknote className={`h-8 w-8 mb-2 ${paymentMethod === "cash" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="font-semibold">Cash</span>
                    </Label>

                    <Label
                      htmlFor="mobile"
                      className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        paymentMethod === "mobile" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="mobile" id="mobile" className="sr-only" />
                      <Smartphone className={`h-8 w-8 mb-2 ${paymentMethod === "mobile" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="font-semibold">Mobile Money</span>
                    </Label>

                    <Label
                      htmlFor="qr"
                      className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        paymentMethod === "qr" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="qr" id="qr" className="sr-only" />
                      <QrCode className={`h-8 w-8 mb-2 ${paymentMethod === "qr" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="font-semibold">QR Code</span>
                    </Label>

                    <Label
                      htmlFor="ussd"
                      className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        paymentMethod === "ussd" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="ussd" id="ussd" className="sr-only" />
                      <Phone className={`h-8 w-8 mb-2 ${paymentMethod === "ussd" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="font-semibold">USSD</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Trip Ticket Preview */}
            {showTicket && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Trip Ticket</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={handlePrintTicket}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleDownloadTicket}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-muted/30 p-6">
                  <div className="bg-background p-6 rounded-lg space-y-4 border">
                    <div className="text-center border-b pb-4">
                      <h2 className="text-2xl font-bold">Station Management System</h2>
                      <p className="text-sm text-muted-foreground">Official Trip Ticket</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-semibold">{selectedRoute}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle</p>
                        <p className="font-semibold">{selectedVehicle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Passengers</p>
                        <p className="font-semibold">{passengerCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <p className="font-semibold capitalize">{paymentMethod}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Total Fare</p>
                        <p className="text-2xl font-bold text-success">₱{totalFare.toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Departure Time</p>
                        <p className="font-semibold">{new Date().toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 text-center">
                      <div className="bg-muted h-24 flex items-center justify-center rounded">
                        <QrCode className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Scan for verification</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Passengers</span>
                  </div>
                  <span className="font-semibold">{passengerCount}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Fare per passenger</span>
                  <span className="font-semibold">₱{farePerPassenger}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-semibold capitalize">{paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    <span className="text-lg font-bold">Total Fare</span>
                  </div>
                  <span className="text-2xl font-bold text-success">
                    ₱{totalFare.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleCollectPayment}>
              <Wallet className="h-5 w-5 mr-2" />
              Confirm & Collect Payment
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-success" />
                  Daily Cash Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Collections</span>
                  <span className="text-xl font-bold text-success">₱{todayCollections.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Trips</span>
                  <span className="text-xl font-bold">{todayTrips}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Average per Trip</span>
                  <span className="font-semibold">₱{Math.round(todayCollections / todayTrips)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
