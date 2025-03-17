import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react"

export function NewTrainersCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">New Trainers</CardTitle>
        <ArrowUpIcon className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+48</div>
        <p className="text-xs text-muted-foreground">+12.5% from last month</p>
      </CardContent>
    </Card>
  )
}

