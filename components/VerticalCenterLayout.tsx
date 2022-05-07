import { ReactChild } from "react";

export default function VerticalCenterLayout({
  children,
  className,
}: {
  children: ReactChild | ReactChild[]
  className?: string,
}) {
  return (
    <div className={`flex min-h-screen h-screen-ios min-h-screen-ios flex-col items-center ${className}`}>
      <main className="flex w-full flex-1 flex-col items-center justify-center py-20 px-8">
        <div className="flex w-full md:max-w-3xl flex-col">
          {children}
        </div>
      </main>
    </div>
  )
}