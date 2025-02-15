"use client"

import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "../ui/button"
import { NavSidebar } from "./nav-sidebar"

import {
  ChartPieIcon,
  CircleFadingArrowUp,
  CircleFadingPlus,
  CircleX,
  GalleryVerticalEnd,
  ShoppingBagIcon,
  TablePropertiesIcon,
} from "lucide-react"

const data = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    name: "Logistik",
    url: "/logistik",
    icon: ShoppingBagIcon,
  },
  {
    name: "Pemakaian",
    url: "/pemakaian",
    icon: TablePropertiesIcon,
  },
  {
    name: "Pengadaan",
    url: "/pengadaan",
    icon: CircleFadingArrowUp,
  },
  {
    name: "Perencanaan",
    url: "/perencanaan",
    icon: CircleFadingPlus,
  },
  {
    name: "Penghapusan",
    url: "/penghapusan",
    icon: CircleX,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar
      variant="floating"
      {...props}
    >
      <SidebarHeader className="mb-10">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2.5 p-1">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div>
              <div className="font-semibold">Sistem Logistik</div>
              <div className="text-muted-foreground text-xs">RS Awal Bros</div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar
          menu={data}
          currentPath={pathname}
        />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          className="w-full"
          asChild
        >
          <Link href="/">Sign out</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
