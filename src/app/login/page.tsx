"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Snackbar } from "@mui/material";
import { loginUserService } from "@/services/AuthServices";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSnackbarOpen(false);

    try {
      setLoading(true);
      const response = await loginUserService({ email, password });
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data && response.data.user && response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token);
        router.push("/admin");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center poppins">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Enter your details to sign in to your account
                <p className="text-xs mt-2">Use This:</p>
                <p className="text-xs">Email    : testjoki@gmail.com</p>
                <p className="text-xs">Password : testjoki</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="w-[50px] p-4 bg-white border-2 text-black hover:bg-slate-200">
                <Link href={'/'}>&lt;</Link>  
              </Button>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Don&#39;t have an account?
            <Link className="underline ml-2" href="signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
          <p className="text-md">{error}</p>
      </Snackbar>
    </div>
  );
}