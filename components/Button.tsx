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
      className="bg-emerald-700 text-white font-hand text-xl py-2 px-3 rounded-lg disabled:bg-emerald-200 text-center inline-flex items-center"
      disabled={disabled} 
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  ) : (
    <button 
      className="border-emerald-700 border-2 text-emerald-700 font-hand text-xl py-2 px-3 rounded-lg text-center inline-flex items-center"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}