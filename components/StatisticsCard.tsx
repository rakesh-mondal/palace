import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, LayoutGrid } from "lucide-react"

interface Statistic {
  title: string
  value: string | number
  icon: "Users" | "UserCheck" | "UserX" | "LayoutGrid"
  color: string
}

interface StatisticsCardProps {
  statistics: Statistic[]
}

const iconMap = {
  Users,
  UserCheck,
  UserX,
  LayoutGrid,
}

// Theme-based color mapping
const colorMap = {
  "Total Users": "bg-primary", // sage green
  "Active Users": "bg-[#A3D977]", // success green
  "Inactive Users": "bg-[#E57373]", // error red
  Managers: "bg-[#96A090]", // secondary
  Executives: "bg-[#EAD3AB]", // info/highlight
  "Total Developers": "bg-primary",
  "Active Developers": "bg-[#A3D977]",
  "Associated Spaces": "bg-[#96A090]",
  "Unique Spaces": "bg-[#EAD3AB]",
  "Total Operators": "bg-primary",
  "Active Operators": "bg-[#A3D977]",
  "Managed Spaces": "bg-[#96A090]",
  "Total Corporates": "bg-primary",
  "Active Corporates": "bg-[#A3D977]",
}

export function StatisticsCard({ statistics }: StatisticsCardProps) {
  return (
    <Card className="bg-white" aria-label="Key Metrics Overview">
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat, index) => {
          const Icon = iconMap[stat.icon]
          const backgroundColor = colorMap[stat.title] || "bg-primary"

          return (
            <Card key={index}>
              <CardContent className="flex flex-row items-center p-4">
                <div className={`rounded-full p-2 ${backgroundColor}`}>
                  {Icon && (
                    <Icon className={`h-6 w-6 text-white ${backgroundColor}`} aria-hidden="true" role="presentation" />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground" aria-label={`${stat.title}: ${stat.value}`}>
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  )
}

