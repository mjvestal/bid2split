import Link from "next/link";

export default function LinkButton({
  children,
  href,
}: {
  children: React.ReactNode,
  href: string,
}) {
  return (
    <Link href={href}>
      <a className="bg-emerald-700 text-white font-hand text-xl py-2 px-3 rounded-lg text-center inline-flex items-center">
        {children}
      </a>
    </Link>
  )
}