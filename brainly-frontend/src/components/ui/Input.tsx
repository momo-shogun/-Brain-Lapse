import { ChangeEventHandler } from "react"

type inputProps = {
    placeholder: string, onChange: ChangeEventHandler<HTMLInputElement>,
    name: string
}

const inputStyles = "bg-slate-50 h-10 rounded-md border px-3 py-2 text-base  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

export default function Input({ placeholder, onChange, name }: inputProps) {
    return (
        <>
            <input placeholder={placeholder} onChange={onChange} className={inputStyles} name={name} />
        </>
    )
}
