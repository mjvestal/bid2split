export default function Section({
  children,
  className,
}: {
  children: React.ReactNode,
  className?: string,
}) {
  return (
    <section className={`flex flex-col items-center my-8 ${className}`}>
      <div className="flex w-full flex-1 flex-col items-center justify-center px-8">
        <div className="flex w-full md:max-w-3xl flex-col">
          {children}
        </div>
      </div>
    </section>
  )
}