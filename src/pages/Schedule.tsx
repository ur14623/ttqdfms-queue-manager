import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const scheduleData = [
    { driver: "Juan Dela Cruz", shift: "Morning", status: "Scheduled" },
    { driver: "Maria Santos", shift: "Full Day", status: "Scheduled" },
    { driver: "Pedro Reyes", shift: "Rest Day", status: "Off" },
    { driver: "Ana Garcia", shift: "Afternoon", status: "Scheduled" },
    { driver: "Carlos Lopez", shift: "Morning", status: "Scheduled" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Schedule</h1>
          <p className="text-muted-foreground">Manage driver work shifts and rest days</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Schedule for {date?.toLocaleDateString("en-US", { 
                    month: "long", 
                    day: "numeric", 
                    year: "numeric" 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduleData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{item.driver}</p>
                      <p className="text-sm text-muted-foreground">{item.shift}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          item.status === "Off"
                            ? "bg-secondary"
                            : "bg-success"
                        }
                      >
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Shift Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border p-4 text-center">
                    <p className="font-semibold">Morning Shift</p>
                    <p className="text-sm text-muted-foreground">6:00 AM - 2:00 PM</p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="font-semibold">Afternoon Shift</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - 10:00 PM</p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="font-semibold">Full Day</p>
                    <p className="text-sm text-muted-foreground">6:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
