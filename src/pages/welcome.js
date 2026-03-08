import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function WelcomePage() {
  const [searchParams] = useSearchParams();
  const shop = searchParams.get("shop");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    try {
      // You can redirect user to your app dashboard or home page
      navigate("/dashboard");
    } catch (error) {
      toast.error("Unable to continue. Try again!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen max-w-full sm:px-0 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-segoe-ui text-gray-800">
            🎉 Welcome, {email || "User"}!
          </CardTitle>
          <p className="text-gray-600 mt-2 text-sm font-roboto">
            Your store <span className="font-medium">{shop}</span> has been
            successfully connected.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 mt-2">
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              className="font-arial font-medium cursor-pointer"
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Go to Dashboard"
              )}
            </Button>
          </div>

          <p className="text-center font-roboto text-gray-400 text-xs mt-4">
            Thank you for connecting your store. You can now manage it from your
            dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
