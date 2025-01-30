"use client";

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
import { AlertCircle } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppStore } from "@/store";
import { apiClient } from "@/utils/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";

export default function Signup() {
  const { setUserInfo } = useAppStore();
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validateSignup = () => {
    if (!username?.length) {
      setError("Username is required.");
      return false;
    }
    if (!email?.length) {
      setError("Email is required.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    if (!password?.length) {
      setError("Password is required.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("Password and Confirm Password should match.");
      return false;
    }
    return true;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { username, email, password },
          { withCredentials: true }
        );
        toast.success("Successfully registered");

        if (response.data.user.id) {
          setUserInfo(response.data.user);
          navigate("/profile-setup"); // Navigate based on bio existence
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
        <CardHeader>
          <CardTitle className="text-base/6 font-bold">Sign Up</CardTitle>
          <CardDescription className="text-sm/5 text-gray-600">
            Create a new account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-1">
            <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <div className=" w-full rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
              Already have an account?{" "}
              <Link
                className="font-medium hover:font-bold"
                data-headlessui-state=""
                to="/login"
              >
                Login now.
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
