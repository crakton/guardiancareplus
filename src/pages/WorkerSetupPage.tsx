import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WorkerSetup } from "@/components/auth/WorkerSetup";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Worker } from "@/types/user.types";

export default function WorkerSetupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const worker = user as Worker | null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Short timeout to prevent flash of loading state
    const timer = setTimeout(() => setLoading(false), 300);

    // If no user is logged in, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }

    // If user is not a  worker, redirect to their dashboard
    if (user.role !== "worker") {
      redirectToDashboard(user.role);
      return;
    }

    // If  worker has already completed onboarding, show a message
    if (worker?.verificationStatus.profileSetupComplete) {
      toast.success("Your profile is already set up!");
      navigate("/worker");
      return;
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const handleSetupComplete = () => {
    // Navigate to dashboard after successful onboarding
    navigate("/worker");
  };

  const handleSkipSetup = () => {
    navigate("/worker");
  };

  const redirectToDashboard = (role: string) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      // case "guardian":
      //   navigate("/guardian");
      //   break;
      case "client":
        navigate("/client");
        break;
      case "worker":
        navigate("/worker");
        break;
      default:
        navigate("/");
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Only render the setup component if user is a  worker who needs setup
  if (!user || user.role !== "worker") {
    return null; // Return null during the redirect, the useEffect will handle navigation
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-sm py-2 mb-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={handleSkipSetup}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-lg font-semibold">Profile Setup</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>
      <WorkerSetup onComplete={handleSetupComplete} />
    </div>
  );
}
