"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { LucideIcon } from "lucide-react"

export function NavSidebar({
  menu,
  currentPath,
}: {
  currentPath: string
  menu: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu className="gap-1">
        {menu.map((item) => {
          const isActive = currentPath.startsWith(item.url)

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                className={cn(
                  "gap-2.5",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/95 hover:text-primary-foreground"
                    : "",
                )}
                asChild
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
