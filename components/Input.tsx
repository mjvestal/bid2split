import { ChangeEventHandler } from "react"

export default function Input({
  max,
  min,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  value,
}: {
  max?: number,
  min?: number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  placeholder?: any,
  required?: boolean,
  type?: string,
  value: any,
}) {
  return (
    <input
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 invalid:border-red-500"
      max={type === "number" && max != null ? max : undefined}
      min={type === "number" && min != null ? min : undefined}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
}