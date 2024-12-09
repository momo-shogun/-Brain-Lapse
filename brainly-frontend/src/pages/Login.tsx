import { useState } from "react";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/ui/Label";

export const Login = () => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const navigate = useNavigate()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        mutationFn: async () => {
            console.log(loginData);

            const response = await axios.post("http://localhost:3000/api/v1/signin", loginData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Login successful:", data);
            const jwt = data.token
            localStorage.setItem("token", jwt)
            navigate('/dashboard')

        },
        onError: (error: any) => {
            console.error("Login failed:", error.response?.data?.message || error.message);
        },
    });

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="rounded-lg border bg-card shadow-sm bg-white">
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">Login</div>
                    <div className="text-sm text-gray-300">
                        Enter your email and password below to login to your account
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label name="Username" />
                            <Input
                                placeholder="Enter the username"
                                onChange={handleInputChange}
                                name="username"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label name="Password" />
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
                            <div className="text-red-500 text-sm">
                                {mutation.error.response?.data?.message || "An error occurred"}
                            </div>
                        )}
                        {
                            mutation.isSuccess && (
                                <div className="text-green-500 text-sm py-2">
                                    Login successfull
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
                            <Link to="/signup">SignUp</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
