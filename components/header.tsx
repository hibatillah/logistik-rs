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

import { SidebarTrigger } from "./ui/sidebar"

import { ChevronRight } from "lucide-react"

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
            <BreadcrumbPage className="capitalize">
              {currentPath?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
