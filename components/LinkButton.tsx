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
      <a className="bg-gradient-to-br from-salmon-700 to-amber-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white font-brand text-xl py-2 px-5 rounded-lg disabled:bg-salmon-200 text-center inline-flex items-center">
        {children}
      </a>
    </Link>
  )
}