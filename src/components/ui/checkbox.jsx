import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef(({ className, checked: controlledChecked, defaultChecked, onChange, ...props }, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked)
    }
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />
      <div
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary text-primary-foreground" : "bg-transparent",
          className
        )}
        onClick={() => handleChange({ target: { checked: !checked }})}
      >
        {checked && (
          <Check className="h-4 w-4" />
        )}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
