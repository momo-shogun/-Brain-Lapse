import { MouseEventHandler } from "react"
import { cn } from "../lib/utils"

const buttonVariants = {
    defaultStyles: "rounded-md font-normal font-medium duration-100 ease-in-out",
    variants: {
        variant: {
            primary: "bg-violet-300	hover:bg-violet-300/90	text-indigo-700 flex justify-center",
            secondary: "bg-indigo-700 hover:bg-indigo-700/90 text-white flex justify-center",
            transparent: "text-slate-600 hover:bg-slate-100 w-full ",
            icon: "text-gray-100/60 hover:text-gray-100/100"
        },
        size: {
            sm: "h-9 rounded-md px-3",
            md: "h-10 px-4 py-2 ",
            lg: "h-11 rounded-md px-8 ",
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        }
    }
}

export interface ButtonProps {
    variant: "primary" | "secondary" | "transparent" | "icon"
    size: "sm" | "md" | "lg",
    text?: string,
    startIcon?: any,
    endIcon?: any,
    disabled?: boolean
    onClick: MouseEventHandler<HTMLButtonElement>,
    className?: string
}

export function Button(props: ButtonProps) {
    const btnProps = `${buttonVariants.variants.variant[props.variant]} 
            ${buttonVariants.variants.size[props.size]}
            ${buttonVariants.defaultStyles}
            ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`
    return (
        <button
            onClick={props.onClick}
            className={cn(btnProps, props.className)}>
            <div className="flex gap-2 items-center">
                {props.startIcon}
                {props.text}
            </div>
        </button >
    )
}

