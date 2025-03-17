import type { DateRange } from "react-day-picker"
import {
  differenceInDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns"

export function getDataGranularity(dateRange: DateRange): "daily" | "weekly" | "monthly" {
  if (!dateRange.from || !dateRange.to) return "daily"

  const daysDifference = differenceInDays(dateRange.to, dateRange.from)

  if (daysDifference <= 31) return "daily"
  if (daysDifference <= 90) return "weekly"
  return "monthly"
}

export function aggregateData(
  data: any[],
  dateRange: DateRange,
  dateAccessor: (item: any) => Date,
  valueAccessor: (item: any) => number,
) {
  const granularity = getDataGranularity(dateRange)

  let intervals: Date[]
  let startOf: (date: Date) => Date
  let endOf: (date: Date) => Date

  switch (granularity) {
    case "daily":
      intervals = eachDayOfInterval(dateRange)
      startOf = startOfDay
      endOf = endOfDay
      break
    case "weekly":
      intervals = eachWeekOfInterval(dateRange)
      startOf = startOfWeek
      endOf = endOfWeek
      break
    case "monthly":
      intervals = eachMonthOfInterval(dateRange)
      startOf = startOfMonth
      endOf = endOfMonth
      break
  }

  return intervals.map((intervalStart) => {
    const intervalEnd = endOf(intervalStart)
    const intervalData = data.filter((item) => {
      const itemDate = dateAccessor(item)
      return itemDate >= startOf(intervalStart) && itemDate <= intervalEnd
    })

    const value = intervalData.reduce((sum, item) => sum + valueAccessor(item), 0)

    return {
      date: intervalStart,
      value,
    }
  })
}

