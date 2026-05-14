import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Checkbox } from "../../../components/ui/checkbox"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Select } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { DownloadCloud, UploadCloud, FileSpreadsheet, RefreshCcw, CheckCircle2 } from "lucide-react"

const VOUCHER_GROUPS = {
  Master: ['Customer', 'Vendor', 'Item'],
  Sales: ['Sales Invoice', 'Receipt', 'Credit Note', 'Debit Note', 'Quotes'],
  Purchase: ['Purchase Bill', 'Payment', 'Vendor Credit', 'Expenses'],
  Other: ['Journals', 'Fund Trans']
};

const GroupedVouchers = ({ idPrefix }) => {
  const [selected, setSelected] = useState(new Set(['Customer']));

  const handleGroupChange = (groupName, isChecked) => {
    setSelected(prev => {
      const next = new Set(prev);
      VOUCHER_GROUPS[groupName].forEach(item => {
        if (isChecked) next.add(item);
        else next.delete(item);
      });
      return next;
    });
  };

  const handleItemChange = (item, isChecked) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (isChecked) next.add(item);
      else next.delete(item);
      return next;
    });
  };

  return (
    <div className="space-y-3 pt-1">
      {Object.entries(VOUCHER_GROUPS).map(([groupName, items]) => {
        const isAllSelected = items.every(item => selected.has(item));

        return (
          <div key={groupName} className="space-y-1.5 bg-slate-50 border border-slate-100 rounded p-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`${idPrefix}-${groupName}`}
                checked={isAllSelected}
                onChange={(e) => handleGroupChange(groupName, e.target.checked)}
              />
              <Label htmlFor={`${idPrefix}-${groupName}`} className="text-xs font-bold text-slate-800 cursor-pointer">
                {groupName}
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-2 pl-6">
              {items.map(item => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${idPrefix}-${item.replace(/\s+/g, '-')}`}
                    checked={selected.has(item)}
                    onChange={(e) => handleItemChange(item, e.target.checked)}
                  />
                  <Label htmlFor={`${idPrefix}-${item.replace(/\s+/g, '-')}`} className="text-[11px] text-slate-600 font-medium cursor-pointer">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function FilterSidebar({ selectedCount = 5888, totalCount = 5888 }) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)

  const handleSimulateSync = () => {
    if (isSyncing) return
    setIsSyncing(true)
    setSyncProgress(0)
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsSyncing(false), 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const selectionPercentage = totalCount === 0 ? 0 : Math.round((selectedCount / totalCount) * 100)
  return (
    <div className="p-4 space-y-4 h-full">
      {/* Fetch Settings */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 pt-4 px-4 bg-slate-50/50 border-b border-slate-100 rounded-t-lg">
          <CardTitle className="text-sm font-semibold text-slate-800 flex items-center justify-between">
            <span>Select To Fetch</span>
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">OrgId: 713552665</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <Select className="h-9">
            <option>OCTFIS TECHNO LLP.OCTFIS</option>
          </Select>
          
          <div className="bg-slate-50 border border-slate-200 rounded-md p-2 max-h-32 overflow-y-auto space-y-2">
            {['Simero Warehouse', 'Surat Branch', 'Surat Branch 1', 'Surat HQ'].map((wh, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox id={`wh-${i}`} defaultChecked={i === 1} />
                <Label htmlFor={`wh-${i}`} className="text-xs text-slate-700 cursor-pointer">{wh}</Label>
              </div>
            ))}
          </div>

          <GroupedVouchers idPrefix="fetch" />

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <Label className="text-xs font-semibold text-slate-700 block mb-2">Search By</Label>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <input type="radio" id="v-date" name="date-type" className="w-3.5 h-3.5 text-primary focus:ring-primary border-slate-300" defaultChecked />
                <Label htmlFor="v-date" className="text-xs font-medium cursor-pointer">Voucher Date</Label>
              </div>
              <div className="flex items-center space-x-1.5">
                <input type="radio" id="m-date" name="date-type" className="w-3.5 h-3.5 text-primary focus:ring-primary border-slate-300" />
                <Label htmlFor="m-date" className="text-xs font-medium cursor-pointer">Modification Date</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">From</Label>
                <Input type="date" className="h-8 text-xs" defaultValue="2025-09-27" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">To</Label>
                <Input type="date" className="h-8 text-xs" defaultValue="2026-05-14" />
              </div>
            </div>
            
            <p className="text-[11px] text-red-500 font-medium leading-tight">
              Note: Without a Licensed Tally Version, Only Transactions From the 1st And 2nd Can be Transferred.
            </p>
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2 mb-1">
              <Checkbox id="check-tally" />
              <Label htmlFor="check-tally" className="text-xs font-semibold">Check Action in Tally</Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs w-full bg-slate-50" onClick={handleSimulateSync} disabled={isSyncing}>
                <DownloadCloud className="w-3.5 h-3.5 mr-1.5 text-primary" /> Import ZB
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs w-full bg-slate-50" onClick={handleSimulateSync} disabled={isSyncing}>
                <UploadCloud className="w-3.5 h-3.5 mr-1.5 text-teal-600" /> Export Tally
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs w-full bg-slate-50" onClick={handleSimulateSync} disabled={isSyncing}>
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Export Excel
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs w-full bg-slate-50" onClick={handleSimulateSync} disabled={isSyncing}>
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-orange-600" /> Export XML
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Migration Settings */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2 pt-3 px-4 bg-slate-50/50 border-b border-slate-100 rounded-t-lg">
          <CardTitle className="text-sm font-semibold text-slate-800">Select To Migrate</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <GroupedVouchers idPrefix="mig" />
          
          <div className="bg-slate-50 border border-slate-200 rounded-md p-2 space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="status-all" defaultChecked />
              <Label htmlFor="status-all" className="text-xs font-semibold">Status:</Label>
            </div>
            <div className="pl-6 space-y-1">
               <div className="flex items-center space-x-2 bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  <Checkbox id="status-active" defaultChecked className="border-white data-[state=checked]:bg-white data-[state=checked]:text-primary" />
                  <Label htmlFor="status-active" className="text-xs font-medium cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2 px-2 py-0.5">
                  <Checkbox id="status-inactive" defaultChecked />
                  <Label htmlFor="status-inactive" className="text-xs text-slate-600 font-medium cursor-pointer">Inactive</Label>
                </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <Label className="text-xs text-slate-600 w-20">Tally Status:</Label>
              <Select className="h-8 flex-1 text-xs">
                <option>All</option>
              </Select>
            </div>
            <div className="flex items-center space-x-3">
              <Label className="text-xs text-slate-600 w-20">Tally Action:</Label>
              <Select className="h-8 flex-1 text-xs">
                <option>All</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Summary */}
      <Card className="border-blue-200 shadow-md bg-blue-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <CardContent className="p-4 space-y-3 pl-5">
          <div className="flex items-center justify-between text-blue-800">
            <div className="flex items-center space-x-2">
              <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
              <h4 className="text-sm font-bold">Actions</h4>
            </div>
            {isSyncing && (
              <span className="text-xs font-bold text-blue-600">{syncProgress}%</span>
            )}
          </div>
          
          {isSyncing && (
            <div className="w-full bg-blue-200 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${syncProgress}%` }}></div>
            </div>
          )}

          <p className="text-xs font-bold text-slate-700 bg-white/60 p-2 rounded border border-blue-100">
            {isSyncing ? "Sync in progress, please wait..." : "Don't click anywhere while sync is in Progress"}
          </p>

          <div className="bg-white p-3 rounded-md shadow-sm border border-blue-100 space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-center w-full">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Total</div>
                <div className="text-lg font-black text-slate-800 leading-none">{totalCount}</div>
              </div>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <div className="text-center w-full">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Selected</div>
                <div className="text-lg font-black text-primary leading-none">{selectedCount}</div>
              </div>
            </div>
            {/* Selection Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${selectionPercentage}%` }}></div>
            </div>
            <div className="text-center text-[9px] text-slate-400 font-medium">
              {selectionPercentage}% selected
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
