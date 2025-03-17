import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopUsersCard() {
  const topUsers = [
    { name: "Alex Thompson", visits: 28, avatar: "/avatars/alex-thompson.jpg" },
    { name: "Olivia Martinez", visits: 25, avatar: "/avatars/olivia-martinez.jpg" },
    { name: "Daniel Kim", visits: 23, avatar: "/avatars/daniel-kim.jpg" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.visits} visits this month</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

