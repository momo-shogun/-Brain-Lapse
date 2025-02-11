import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

export const SignUp = () => {
  const [signupData, setSignupData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      console.log(signupData);

      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        signupData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Sign Up successful:", data);
      navigate("/login");
    },
    onError: (error: any) => {      
      console.error(
        "Sign Up failed:",
        error.response?.data?.error[0].message || error.message
      );
    },
  });

  return (
    
    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to Brain Lapse 🧠
        </h1>
        <p className="mt-4 leading-relaxed text-gray-500">
          Enter your email and password to create an account
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
                {mutation.error.response?.data?.error[0].message || "An error occurred"}
              </div>
            )}
            {mutation.isSuccess && (
              <div className="text-green-500 text-sm pb-2">
                Sign Up successful
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
              {mutation.isPending ? "Creating..." : "Create an account"}
            </Button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="text-primary/80 underline dark:text-primary hover:text-primary"
              >
                Login
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
 
  );
};
