"use client"

import { usePathname } from "next/navigation"

import { toBreadcrumbItem } from "@/lib/utils"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

import ThemeToggle from "./theme/theme-toggle"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"

import { ChevronRight, SearchIcon } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const paths = toBreadcrumbItem(pathname)

  const previousPaths = paths.slice(0, paths.length - 1)
  const currentPath = paths.at(-1)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 !h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.length > 1 &&
            previousPaths.map((item, key) => (
              <BreadcrumbItem
                key={key}
                className="hidden md:flex md:items-center"
              >
                <BreadcrumbLink
                  href={item.link}
                  className="capitalize"
                >
                  {item.title}
                </BreadcrumbLink>
                <ChevronRight className="hidden size-4 md:block" />
              </BreadcrumbItem>
            ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize text-foreground/80">
              {currentPath?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        variant="outline"
        className="text-muted-foreground ms-auto h-8 w-48 justify-start"
      >
        <SearchIcon className="size-4" />
        <span>Cari...</span>
        <kbd className="border-border ms-auto text-muted-foreground/70 inline-flex bg-card items-center rounded border px-1 font-[inherit] text-xs font-medium">
          Ctrl K
        </kbd>
      </Button>
      <ThemeToggle />
    </header>
  )
}
