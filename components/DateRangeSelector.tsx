"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export type DateRangeSelectorProps = {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  className?: string
  label?: string
}

export function DateRangeSelector({ date, onDateChange, className, label }: DateRangeSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)

  const presets = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ]

  const handlePresetChange = (value: string) => {
    const days = Number.parseInt(value, 10)
    const to = new Date()
    const from = addDays(to, -days)
    onDateChange({ from, to })
    setIsCalendarOpen(false)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="form-label">{label}</Label>}
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              "button-padding-md"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <Label className="form-label">Preset Ranges</Label>
              <Select onValueChange={handlePresetChange}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select a preset range" />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="form-label">Custom Range</Label>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={onDateChange}
                numberOfMonths={1}
                disabled={(date) => date > new Date() || date < new Date("2000-01-01")}
                className="rounded-md border"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

