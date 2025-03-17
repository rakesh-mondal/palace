import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopTrainersCard() {
  const topTrainers = [
    { name: "Sarah Johnson", sessions: 45, avatar: "/avatars/sarah-johnson.jpg" },
    { name: "Mike Chen", sessions: 42, avatar: "/avatars/mike-chen.jpg" },
    { name: "Emma Davis", sessions: 38, avatar: "/avatars/emma-davis.jpg" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Trainers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topTrainers.map((trainer, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={trainer.avatar} alt={trainer.name} />
                <AvatarFallback>
                  {trainer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{trainer.name}</p>
                <p className="text-sm text-muted-foreground">{trainer.sessions} sessions</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

