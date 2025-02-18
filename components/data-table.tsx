"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table as TableType,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FilterIcon,
  SearchIcon,
} from "lucide-react"

export function DataTablePaginations<TData>({
  table,
}: {
  table: TableType<TData>
}) {
  const pageSizeOpt = [5, 10, 20]

  return (
    <div className="flex items-center justify-between gap-8">
      {/* Results per page */}
      <div className="flex items-center gap-3">
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            localStorage.setItem("pageSize", value)
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="w-fit whitespace-nowrap">
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
            {pageSizeOpt.map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={pageSize.toString()}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="max-sm:sr-only">Baris per halaman</Label>
      </div>
      {/* Page number information */}
      <div className="text-muted-foreground flex grow justify-end whitespace-nowrap text-sm">
        <p
          className="text-muted-foreground whitespace-nowrap text-sm"
          aria-live="polite"
        >
          <span className="text-foreground">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            {" - "}
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0,
              ),
              table.getRowCount(),
            )}
          </span>{" "}
          dari{" "}
          <span className="text-foreground">
            {table.getRowCount().toString()}
          </span>
        </p>
      </div>

      {/* Pagination buttons */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* First page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to first page"
              >
                <ChevronFirstIcon
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </PaginationItem>
            {/* Previous page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </PaginationItem>
            {/* Next page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to next page"
              >
                <ChevronRightIcon
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </PaginationItem>
            {/* Last page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to last page"
              >
                <ChevronLastIcon
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export function DataTableControls<TData>({
  table,
  search = true,
  children,
}: {
  table: TableType<TData>
  search?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      {search && (
        <div className="relative">
          <Input
            type="search"
            placeholder="Cari data"
            className="ps-8 selection:bg-blue-600 [&::-webkit-search-cancel-button]:appearance-none"
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-2 flex items-center">
            <SearchIcon className="size-4" />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export function DataTableFilter<TData>({
  filter,
  table,
}: {
  filter: keyof TData
  table: TableType<TData>
}) {
  const filterKey = filter as string

  const uniqueStatusValues = React.useMemo(() => {
    const statusColumn = table.getColumn(filterKey)
    if (!statusColumn) return []

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys())
    return values.sort()
  }, [table.getColumn(filterKey)?.getFacetedUniqueValues()])

  const selectedStatuses = React.useMemo(() => {
    const filterValue = table.getColumn(filterKey)?.getFilterValue() as string[]
    return filterValue ?? []
  }, [table.getColumn(filterKey)?.getFilterValue()])

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn(filterKey)?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      newFilterValue.splice(index, 1)
    }

    table
      .getColumn(filterKey)
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="capitalize"
        >
          <FilterIcon
            className="-ms-1 me-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          {filterKey}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-36 p-3"
        align="start"
      >
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-medium">
            Filter
          </div>
          <div className="space-y-3">
            {uniqueStatusValues.map((item, key) => (
              <Label
                key={key}
                htmlFor={item}
                className="flex select-none gap-2 capitalize"
              >
                <Checkbox
                  id={item}
                  checked={selectedStatuses.includes(item)}
                  onCheckedChange={(checked: boolean) => {
                    handleStatusChange(checked, item)
                  }}
                />
                <span>{item}</span>
              </Label>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface Controls {
  pagination?: boolean
  sorting?: boolean
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  controls?: Controls
  children?:
    | React.ReactNode
    | ((props: { table: TableType<TData> }) => React.ReactNode)
}

export function DataTable<TData, TValue>({
  columns,
  data,
  controls = {
    pagination: true,
    sorting: true,
  },
  children,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("pageSize")
      if (storedData) {
        setPagination((prev) => ({ ...prev, pageSize: Number(storedData) }))
      }
    }
  }, [])

  return (
    <div className="space-y-3">
      {typeof children === "function" ? children({ table }) : children}
      <div className="overflow-hidden rounded-md border">
        <Table className="bg-card">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="not-has-[*]:w-14 has-[*]:min-w-24"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() &&
                        controls.sorting ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer select-none items-center gap-2",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data yang sesuai.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {controls.pagination && <DataTablePaginations table={table} />}
    </div>
  )
}
