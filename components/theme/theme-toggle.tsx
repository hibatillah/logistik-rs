import { useTheme } from "next-themes"

import { Button } from "../ui/button"

import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("rounded-md p-2 size-8", className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  )
}
