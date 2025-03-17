import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersIcon } from "lucide-react"

export function TotalUniqueUsersCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Unique Users</CardTitle>
        <UsersIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">24,780</div>
        <p className="text-xs text-muted-foreground">+5.2% from last month</p>
      </CardContent>
    </Card>
  )
}

