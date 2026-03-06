import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-full sm:px-0 px-4 ">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-segoe-ui text-gray-800">
            Welcome to <span className="text-primary">SRS Retail System</span>
          </CardTitle>
          <p className="text-gray-600 mt-2 text-sm font-roboto">
            One step more to store authorization. Please select or log in to a
            srs account to authorize.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 mt-2">
          <div className="flex justify-center">
            <Button className={"font-arial font-medium"}>Authorize Now</Button>
          </div>
          <div className="flex flex-col gap-3">
            <Separator />
          </div>

          <p className="text-center font-roboto text-gray-400 text-xs mt-4">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
