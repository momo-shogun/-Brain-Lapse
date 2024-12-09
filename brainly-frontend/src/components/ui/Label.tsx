const inputStyles = "text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
import { cn } from "../lib/utils"


export default function Label({ className, htmlFor }: { htmlFor: string, className?: string }) {
    return (
        <>
            <label htmlFor={htmlFor} className={cn(inputStyles, className)}>
                {capitalizeFirstLetter(htmlFor)}
            </label>
        </>
    )
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
