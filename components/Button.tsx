import { MouseEventHandler } from "react"

export default function Button({
  children,
  disabled = false,
  onClick,
  style = "primary",
  type = "button",
}: {
  children: React.ReactNode,
  disabled?: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  style?: "primary" | "secondary",
  type?: "button" | "submit"
}) {
  return style === 'primary' ? (
    <button
      className="bg-indigo-600 text-white font-hand text-xl py-2 px-3 rounded-lg disabled:bg-indigo-300"
      disabled={disabled} 
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  ) : (
    <button 
      className="border-indigo-600 border-2 text-indigo-600 font-hand text-xl py-2 px-3 rounded-lg"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}