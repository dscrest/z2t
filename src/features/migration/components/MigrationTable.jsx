import React, { useMemo, useState, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Checkbox } from "../../../components/ui/checkbox"
import { Badge } from "../../../components/ui/badge"

const MOCK_DATA = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  tallyResponse: "",
  voucherType: "Customer",
  contactName: [
    "Dummy Customer Company 1",
    "Dummy Customer Company 2",
    "AMBUJA CEMENT",
    "Abacus Real Estate Pvt. Ltd.",
    "LUCKY FASHION",
    "RADHIKA FASHION"
  ][i % 6] + (i > 5 ? ` ${i}` : ""),
  status: i === 2 ? "Inactive" : "Active",
  createdTime: "22-04-2020 09:46",
  lastModified: "19-03-2026 18:48:03",
  actionInTally: i % 3 === 0 ? "Synced" : "",
}))

export default function MigrationTable({ onSelectionChange }) {
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => {
          const isAllSelected = table.getIsAllRowsSelected()
          const isSomeSelected = table.getIsSomeRowsSelected()
          
          return (
            <Checkbox
              checked={isAllSelected || isSomeSelected}
              // If some are selected but not all, we still want a click to toggle everything or clear.
              // We'll pass an indeterminate prop or just rely on standard behavior
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label="Select all"
              className={`translate-y-[2px] border-slate-300 bg-white ${isSomeSelected && !isAllSelected ? 'opacity-50' : ''}`}
            />
          )
        },
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        size: 40,
      },
      {
        accessorKey: "tallyResponse",
        header: "TallyResponse",
        size: 100,
      },
      {
        accessorKey: "voucherType",
        header: "VoucherType",
        size: 120,
      },
      {
        accessorKey: "contactName",
        header: "ContactName",
        size: 300,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status")
          return (
             <Badge variant={status === 'Active' ? 'success' : 'secondary'} className="text-[10px] uppercase font-bold py-0 h-5">
              {status}
            </Badge>
          )
        },
        size: 100,
      },
      {
        accessorKey: "createdTime",
        header: "CreatedTime",
        size: 150,
      },
      {
        accessorKey: "lastModified",
        header: "LastModified",
        size: 150,
      },
      {
        accessorKey: "actionInTally",
        header: "ActionInTally",
        size: 120,
        cell: ({ row }) => {
          const action = row.getValue("actionInTally")
          return action ? <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded">{action}</span> : null
        }
      },
    ],
    []
  )

  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(Object.keys(rowSelection).length, MOCK_DATA.length)
    }
  }, [rowSelection, onSelectionChange])

  const table = useReactTable({
    data: MOCK_DATA,
    columns,
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  })

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative p-4 overflow-hidden min-h-0">
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left relative">
          <thead className="text-xs text-slate-700 bg-slate-200/80 sticky top-0 z-10 shadow-sm backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th 
                      key={header.id} 
                      className="px-4 py-3 font-semibold tracking-wide border-b border-slate-300"
                      style={{ width: header.getSize() !== 150 ? header.getSize() : 'auto' }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`
                    hover:bg-slate-50 transition-colors
                    ${row.getIsSelected() ? 'bg-primary/5' : ''}
                    ${index === 0 && row.getIsSelected() ? 'bg-primary text-white hover:bg-primary/90' : ''}
                  `}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isActionColumn = cell.column.id === 'actionInTally';
                    // Replicate the green highlight from original UI for the Action column when it has data, or just styled cell
                    return (
                      <td 
                        key={cell.id} 
                        className={`
                          px-4 py-2.5 text-xs whitespace-nowrap
                          ${isActionColumn && row.original.actionInTally ? 'bg-teal-100/50' : ''}
                          ${index === 0 && row.getIsSelected() ? 'text-white border-white/20' : 'text-slate-600'}
                        `}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        
        {/* Footer Pagination */}
        <div className="h-14 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between px-6 shrink-0">
           <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Rows per page:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="h-7 text-xs border border-slate-200 rounded px-2 bg-white text-slate-700 outline-none focus:ring-1 focus:ring-primary/50"
                >
                  {[20, 25, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
             </div>
             <div className="text-xs text-slate-500 hidden sm:block">
              Showing <span className="font-medium text-slate-900">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </span> to <span className="font-medium text-slate-900">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}
              </span> of <span className="font-medium text-slate-900">{table.getFilteredRowModel().rows.length}</span> entries
             </div>
           </div>
           <div className="flex space-x-2">
              <button 
                className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <button 
                className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
