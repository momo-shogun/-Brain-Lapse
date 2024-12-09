import { useState } from "react";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [signupData, setSignupData] = useState({ username: "", password: "" });
    const navigate = useNavigate()
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

            const response = await axios.post("http://localhost:3000/api/v1/signup", signupData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Sign Up successful:", data);
            navigate("/login")

        },
        onError: (error: any) => {
            console.error("Sign Up failed:", error.response?.data?.message || error.message);
        },
    });

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="rounded-lg border bg-card shadow-sm bg-white">
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">Sign Up</div>
                    <div className="text-sm text-gray-300">
                        Enter your email and password below to Sign Up to your account
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Input
                                placeholder="Enter the username"
                                onChange={handleInputChange}
                                name="username"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Input
                                placeholder="Enter the password"
                                onChange={handleInputChange}
                                name="password"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        {/* Show error message */}
                        {mutation.isError && (
                            <div className="text-red-500 text-sm pb-2">
                                {mutation.error.response?.data?.message || "An error occurred"}
                            </div>
                        )}
                        {
                            mutation.isSuccess && (
                                <div className="text-green-500 text-sm pb-2">
                                    Sign Up successfull
                                </div>
                            )
                        }

                        {/* Submit button */}
                        <div className="flex justify-between underline items-center text-blue-500">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => mutation.mutate()}
                                text={mutation.isPending ? "Submitting..." : "Submit"}
                                disabled={mutation.isPending}
                            />
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
