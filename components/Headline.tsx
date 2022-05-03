export default function Headline({
  children,
  level = 1,
}: {
  children: React.ReactNode,
  level?: number,
}) {
  switch(level) {
    case 1:
      return <h1 className="text-6xl font-hand text-emerald-700">{children}</h1>;
    case 2:
    default:
      return <h2 className="text-4xl font-hand text-emerald-700">{children}</h2>;
  } 
}