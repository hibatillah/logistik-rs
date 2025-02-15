"use client"

import React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table"
import { format, getDate } from "date-fns"

import { DataTable } from "@/components/data-table"

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
      const date = getDate(data.date)
      const month = format(data.date, "LLL")

      return (
        <div className="bg-card flex size-11 flex-col items-center justify-center rounded-md border text-center">
          <span className="text-base font-semibold leading-snug">{date}</span>
          <span className="text-muted-foreground text-xs leading-none">
            {month}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
  },
]

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

export default function DataView() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      state={{
        sorting: [sorting, setSorting],
        filter: [columnFilters, setColumnFilters],
      }}
    />
  )
}
