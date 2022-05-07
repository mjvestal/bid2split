import Image from "next/image"

export default function Logo({
  variant = 'color',
}: {
  variant?: 'white' | 'color',
}) {
  return (
    <Image 
      alt="bid 2 split logo" 
      src={variant === 'color' ? "/images/logo.png" : "/images/logo_dark.png"}
      height={80 * 5/6}
      width={153 * 5/6}
    />
  )
}