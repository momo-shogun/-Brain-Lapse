import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

const toastStyles = `fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] mb-4 mr-4 border p-6 pr-8 shadow-lg transition-all rounded-lg`;

const types = {
    variant: {
        default: "border bg-white text-black",
        error: "border-red-500 bg-red-700 text-white",
        success: "border-green-500 bg-green-700 text-white",
    },
};

interface ToastProps {
    variant: "default" | "error" | "success"; // Made optional
    className?: string;
    text: string
}

export const Toast = ({ className, variant, text }: ToastProps) => {
    const [isToggle, setIsToggle] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsToggle(false)
        }, 2000);
    })

    return (
        isToggle &&
        <div className={cn(toastStyles, className, types.variant[variant])}>

            <div className="flex flex-row relative">
                <div className="">
                    {text}
                </div>
                <Button
                    className="absolute top-[-20px] right-[-30px]"
                    startIcon={<X />}
                    variant="icon"
                    size="md"
                    onClick={() => { setIsToggle(false) }}
                />
            </div>
        </div>
    );
};
