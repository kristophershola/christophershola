import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleGroupContextValue {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: any) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: any) => void
}

export function ToggleGroup({
  className,
  type = "single",
  value,
  onValueChange,
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ type, value, onValueChange }}>
      <div className={cn("inline-flex items-center justify-center gap-1", className)} {...props}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value, children, onClick, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    const isSelected =
      context.type === "multiple"
        ? Array.isArray(context.value) && context.value.includes(value)
        : context.value === value

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (context.onValueChange) {
        if (context.type === "multiple") {
          const arr = Array.isArray(context.value) ? context.value : []
          context.onValueChange(
            arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
          )
        } else {
          context.onValueChange(value)
        }
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        data-state={isSelected ? "on" : "off"}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ToggleGroupItem.displayName = "ToggleGroupItem"
