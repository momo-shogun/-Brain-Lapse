import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

export const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signin",
        loginData
      );
      return response.data;
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    },
  });

  return (
    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome Back to Brain Lapse 🧠
        </h1>
        <p className="mt-4 leading-relaxed text-gray-500">
          Enter your username and password to log into your account
        </p>
        <div className="mt-4">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Label>Username</Label>
              <Input
                onChange={handleInputChange}
                name="username"
                required
                className="mt-1"
              />
            </div>
            <div className="col-span-6">
              <Label>Password</Label>
              <Input
                onChange={handleInputChange}
                name="password"
                type="password"
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="pt-4">
            {mutation.isError && (
              <div className="text-red-500 text-sm pb-2">
                {mutation.error.response?.data?.message || "An error occurred"}
              </div>
            )}
            {mutation.isSuccess && (
              <div className="text-green-500 text-sm pb-2">
                Login successful
              </div>
            )}
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in..." : "Log In"}
            </Button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
              Don't have an account?
              <Link
                to="/"
                className="text-primary/80 underline dark:text-primary hover:text-primary"
              >
                Sign Up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
