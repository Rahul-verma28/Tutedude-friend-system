import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "@/utils/api-client";
import { LOGIN_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();

  

  const validateLogin = () => {
    if (!email.length) {
      setError("Email is required.");
      return false;
    }
    if (!password.length) {
      setError("Password is required.");
      return false;
    }
    return true;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        toast.success("Logged in successfully");
  
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          console.log(response.data.user);
          navigate(response.data.user.isProfileSet ? "/" : "/profile-setup"); // Navigate based on bio existence
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError((error as any).response?.data?.message || error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }
  
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base/6 font-bold">Welcome back!</CardTitle>
          <CardDescription className="mt-1 text-sm/5 text-gray-600">
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-100 p-2 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className=" w-full m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
              Not a member?{" "}
              <Link
                className="font-medium hover:font-bold"
                data-headlessui-state=""
                to="/signup"
              >
                Create an account
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
