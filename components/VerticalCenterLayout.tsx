import { ReactChild } from "react";

export default function VerticalCenterLayout({
  children
}: {
  children: ReactChild[]
}) {
  return (
    <div className="flex min-h-screen h-screen-ios min-h-screen-ios flex-col items-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center  px-8">
        <div className="flex w-full flex-col items-center">
          {children}
        </div>
      </main>
    </div>
  )
}