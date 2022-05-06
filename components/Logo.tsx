import Image from "next/image"

export default function Logo() {
  return (
    <Image 
      alt="bid 2 split logo" 
      src="/images/logo.png"
      height={80 * 5/6}
      width={153 * 5/6}
    />
  )
}