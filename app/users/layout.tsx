import type { ReactNode } from "react"

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <div className="users-layout">{children}</div>
}

