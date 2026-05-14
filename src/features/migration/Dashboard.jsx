import React, { useCallback, useContext } from "react"
import FilterSidebar from "./components/FilterSidebar"
import MigrationTable from "./components/MigrationTable"
import { MigrationContext } from "../../components/layout/DashboardLayout"

export default function Dashboard() {
  const { selectedCount, setSelectedCount, totalCount, setTotalCount } = useContext(MigrationContext)

  const handleSelectionChange = useCallback((selected, total) => {
    setSelectedCount(selected)
    setTotalCount(total)
  }, [setSelectedCount, setTotalCount])

  return (
    <div className="flex-1 flex h-full w-full min-h-0 overflow-hidden">
      {/* Left Sidebar for Filters */}
      <div className="w-[340px] h-full flex flex-col flex-shrink-0 border-r border-slate-200 bg-slate-50 overflow-y-auto">
        <FilterSidebar selectedCount={selectedCount} totalCount={totalCount} />
      </div>

      {/* Main Content Area (Table) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden relative">
        <MigrationTable onSelectionChange={handleSelectionChange} />
      </div>
    </div>
  )
}
