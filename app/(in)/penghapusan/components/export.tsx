import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ArrowUpToLineIcon } from "lucide-react"

export default function ExportData({
  data,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  data: any[]
}) {
  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn("flex-none", className)}
              {...props}
            >
              <span className="sr-only">export</span>
              <ArrowUpToLineIcon className="size-4" />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>Ekspor Data</TooltipContent>
      </Tooltip>
      <DialogContent className="min-h-60">
        <DialogHeader>
          <DialogTitle>Ekspor Data</DialogTitle>
        </DialogHeader>
        <div className="">{data}</div>
      </DialogContent>
    </Dialog>
  )
}
