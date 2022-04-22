import { ChangeEventHandler } from "react"

export default function Input({
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  value,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>,
  placeholder?: any,
  required?: boolean,
  type?: string,
  value: any,
}) {
  return (
    <input
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value} 
    />
  )
}