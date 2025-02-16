"use client"

import React from "react"

import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { FormatOptions, format, getDate } from "date-fns"
import { id as idLocale } from "date-fns/locale"

import {
  DataFilter,
  DataTable,
  customFilterFn,
  customFilterFn as customFilterFnType,
} from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ArrowUpToLineIcon, InfoIcon, PlusIcon } from "lucide-react"

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "failed",
    email: "habib@example.com",
    date: new Date().toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "raul@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "qalbi@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "processing",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "gil@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 23,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 65,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 57,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 70,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 12).toISOString(),
  },
  {
    id: "728ed52f",
    amount: 28,
    status: "pending",
    email: "m@example.com",
    date: new Date(2025, 1, 10).toISOString(),
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  date: Date | string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row: { original: data } }) => {
      const { open } = useSidebar()

      const dateOpt: FormatOptions = {
        locale: idLocale,
        weekStartsOn: 1,
      }

      const date = getDate(new Date("2025-1-13"), dateOpt)
      const month = format(data.date, "LLL", dateOpt)
      const fullDate = format(data.date, "PPPP - kk:mm", dateOpt)

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-card flex size-11 cursor-default flex-col items-center justify-center rounded-md border text-center">
              <span className="text-base font-semibold leading-snug">
                {date}
              </span>
              <span className="text-muted-foreground text-xs leading-none">
                {month}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side={open ? "top" : "right"}
            className="shadow-md"
          >{`${fullDate} WIB`}</TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="capitalize"
        >
          {row.getValue("status")}
        </Badge>
      )
    },
    filterFn: customFilterFn as unknown as FilterFn<Payment>,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
    filterFn: customFilterFn as unknown as FilterFn<Payment>,
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
  },
  {
    id: "actions",
    cell: ({ row: { original: data } }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-card hover:border"
            >
              <span className="sr-only">Detail</span>
              <InfoIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Detail</TooltipContent>
        </Tooltip>
      )
    },
  },
]

export default function DataView() {
  const filter: DataFilter[] = [
    {
      title: "status",
      data: ["failed", "processing", "pending"],
    },
    {
      title: "email",
      data: ["habib@example.com", "raul@example.com", "gil@example.com"],
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      filtering={filter}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="ms-auto"
          >
            <span className="sr-only">export</span>
            <ArrowUpToLineIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ekspor Data</TooltipContent>
      </Tooltip>
      <Button variant="default">
        <PlusIcon />
        <span>Tambah Penghapusan</span>
      </Button>
    </DataTable>
  )
}
