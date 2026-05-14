import React, { createContext, useContext, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, LogOut, Settings, MessageCircle, CheckCircle2 } from "lucide-react"

export const MigrationContext = createContext()

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [selectedCount, setSelectedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(50)
  const [isMigrating, setIsMigrating] = useState(false)
  const [migratedCount, setMigratedCount] = useState(0)

  const handleStartMigration = () => {
    if (isMigrating || selectedCount === 0) return
    setIsMigrating(true)
    setMigratedCount(0)
    
    let current = 0
    const interval = setInterval(() => {
      // Simulate migrating records
      current += Math.max(1, Math.floor(selectedCount / 15))
      if (current >= selectedCount) {
        current = selectedCount
        clearInterval(interval)
        setTimeout(() => setIsMigrating(false), 2000)
      }
      setMigratedCount(current)
    }, 200)
  }

  const migrationPercentage = selectedCount === 0 ? 0 : Math.round((migratedCount / selectedCount) * 100)

  return (
    <MigrationContext.Provider value={{ selectedCount, setSelectedCount, totalCount, setTotalCount }}>
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden relative">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-primary font-bold text-lg">
            <Plane className="w-5 h-5" />
            <span>OCTFIS TECHNO LLP</span>
          </div>
          <div className="h-4 w-px bg-slate-300 hidden md:block"></div>
          <span className="text-xs text-slate-500 hidden md:block font-medium">v1.1.7.0</span>
          <span className="text-xs text-slate-500 hidden lg:block bg-slate-100 px-2 py-1 rounded-md">user1@demo1.octfis.com</span>
          <span className="text-xs font-semibold text-primary hidden lg:block bg-primary/10 px-2 py-1 rounded-md">[ZB to Tally]</span>
        </div>
        
        <nav className="flex items-center space-x-1">
          <AnimatePresence mode="wait">
            {isMigrating ? (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center space-x-3 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-md mr-2 overflow-hidden whitespace-nowrap"
              >
                <div className="flex flex-col w-32">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Migrating...</span>
                    <span className="text-[10px] font-bold text-blue-700">{migratedCount} / {selectedCount}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-200" style={{ width: `${migrationPercentage}%` }}></div>
                  </div>
                </div>
                {migratedCount === selectedCount && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </motion.div>
            ) : (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleStartMigration}
                disabled={selectedCount === 0}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedCount === 0 ? 'text-slate-400 bg-slate-50 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Plane className={`w-4 h-4 ${selectedCount === 0 ? 'text-slate-400' : 'text-primary'}`} />
                <span>Start Migration</span>
              </motion.button>
            )}
          </AnimatePresence>
          
          <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <span>Update</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Configuration</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 rounded-md transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
          <div className="w-px h-4 bg-slate-200 mx-2"></div>
          <button onClick={() => navigate("/login")} className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
    </MigrationContext.Provider>
  )
}
