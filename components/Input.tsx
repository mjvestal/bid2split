import { ChangeEventHandler } from "react"

export default function Input({
  max,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  value,
}: {
  max?: number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  placeholder?: any,
  required?: boolean,
  type?: string,
  value: any,
}) {
  return (
    <input
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 invalid:border-red-500"
      max={type === "number" && max ? max : undefined}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
}