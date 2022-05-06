export default function Headline({
  children,
  level = 1,
}: {
  children: React.ReactNode,
  level?: number,
}) {
  switch(level) {
    case 2:
      return <h2 className="text-2xl font-brand text-amber-500">{children}</h2>;
    case 1:
    default:
      return <h1 className="text-4xl font-brand text-salmon-700">{children}</h1>;
  }
}