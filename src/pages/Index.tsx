import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bus, Users, Wallet, BarChart3, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6">
            <Bus className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-foreground">TTQDFMS</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transport & Traffic Queue Digital Fleet Management System
          </p>
          <p className="mt-4 text-muted-foreground">
            Streamline operations, manage queues, and optimize fleet performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Queue Management</h3>
            <p className="text-sm text-muted-foreground">
              Real-time queue monitoring and driver coordination
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <Wallet className="w-8 h-8 text-success mb-4" />
            <h3 className="font-semibold mb-2">Digital Payments</h3>
            <p className="text-sm text-muted-foreground">
              Cashless transactions and automated fare collection
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <BarChart3 className="w-8 h-8 text-warning mb-4" />
            <h3 className="font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive insights and performance tracking
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 text-destructive mb-4" />
            <h3 className="font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security and 24/7 monitoring
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate("/login")} className="px-8">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
