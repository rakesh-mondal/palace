import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, "aria-describedby": ariaDescribedby, ...props }, ref) => {
    const id = React.useId()
    const errorId = `${id}-error`

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-full border border-[#B2B2B2] bg-background px-3 py-2 text-base",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            error && "border-destructive",
            className,
          )}
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={cn(error ? errorId : null, ariaDescribedby)}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-destructive text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }

