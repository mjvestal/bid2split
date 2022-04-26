import { ReactChild } from "react";

export default function Center({
  children
}: {
  children: ReactChild | ReactChild[]
}) {
  return (
    <div className="flex w-full justify-center">
      {children}
    </div>
  )
}