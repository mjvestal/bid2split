import { ReactChild } from "react";

export default function CenterLayout({
  children
}: {
  children: ReactChild | ReactChild[]
}) {
  return (
    <div className="flex flex-col items-center py-20">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-8">
        <div className="flex w-full md:max-w-3xl flex-col">
          {children}
        </div>
      </main>
    </div>
  )
}