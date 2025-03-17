"use client"

import { cn } from "@/lib/utils"

interface StepperProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep

          return (
            <li key={step} className="relative flex-1 flex items-center justify-center min-w-[100px]">
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute inset-0 right-1/2 left-[-50%] top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-200",
                    {
                      "bg-primary": isComplete,
                      "bg-border": !isComplete,
                    },
                  )}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background transition-colors duration-200",
                  onStepClick ? "cursor-pointer" : "cursor-default",
                  {
                    "border-primary": isComplete || isCurrent,
                    "border-muted-foreground": !isComplete && !isCurrent,
                  },
                )}
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn("text-sm font-medium", {
                    "text-primary": isComplete || isCurrent,
                    "text-muted-foreground": !isComplete && !isCurrent,
                  })}
                >
                  {index + 1}
                </span>
              </button>
              <div className="absolute top-full mt-2 w-full text-center">
                <span
                  className={cn("text-sm font-medium", {
                    "text-primary": isComplete || isCurrent,
                    "text-muted-foreground": !isComplete && !isCurrent,
                  })}
                >
                  {step}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

