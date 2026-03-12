"use client"

import React, { useState, useCallback, useMemo } from "react"
import { Filter, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePatients } from "@/hooks/usePatients"
import PatientTable from "./PatientTable"
import PatientCardList from "./PatientCardList"
import Pagination from "./Pagination"
import Controls from "./Controls"

const MEDICAL_ISSUES = [
  "fever", "headache", "sore throat", "sprained ankle", "rash", 
  "ear infection", "sinusitis", "stomach ache", "broken arm", "allergic reaction"
]

export default function PatientDirectory() {
  const [view, setView] = useState<'table' | 'card'>('table')
  
  // State for filters/pagination
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("patient_name")
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const {
    patients,
    loading,
    error,
    totalPages,
    totalRecords,
    refresh
  } = usePatients({
    page,
    searchTerm,
    selectedIssue,
    sortBy,
    sortOrder,
    debounceMs: 500 // Increased debounce for better performance
  });

  const handleSort = useCallback((field: string) => {
  if (sortBy !== field) {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  } else {
    setSortBy(sortBy)
    setSortOrder('desc')
  }
}, []);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    setPage(1)
  }, []);

  const handleIssueChange = useCallback((issue: string) => {
    setSelectedIssue(issue)
    setPage(1)
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-6 sm:px-12 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Patient Directory</h1>
            <p className="text-blue-100 text-lg font-medium opacity-90">
              <span className="bg-white/20 px-3 py-1 rounded-full">{totalRecords}</span> Patients Registered
            </p>
          </div>
          
          <div className="flex gap-4">
             <Button variant="ghost" className="text-white hover:bg-white/10" onClick={refresh}>
                <RefreshCw className={cn("h-5 w-5 mr-2", loading && "animate-spin")} />
                Refresh Data
             </Button>
          </div>
        </div>
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-3 gap-6 h-full p-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border-8 border-white rounded-2xl transform rotate-12"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 -mt-12 relative z-20 pb-20">
        <Card className="border-none shadow-2xl rounded-2xl overflow-hidden ring-1 ring-gray-200">
          <CardContent className="p-0">
            {/* Tabs & Active Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b px-8 py-2 bg-white rounded-t-2xl">
              <div className="flex space-x-10">
                <button
                  onClick={() => setView('table')}
                  className={cn(
                    "py-5 text-sm font-bold uppercase tracking-widest transition-all border-b-4",
                    view === 'table' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"
                  )}
                >
                  Table View
                </button>
                <button
                  onClick={() => setView('card')}
                  className={cn(
                    "py-5 text-sm font-bold uppercase tracking-widest transition-all border-b-4",
                    view === 'card' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"
                  )}
                >
                  Card View
                </button>
              </div>
            </div>

            {/* Controls */}
            <Controls
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
              selectedIssue={selectedIssue}
              onIssueChange={handleIssueChange}
              sortBy={sortBy}
              onSortChange={handleSort}
              medicalIssues={MEDICAL_ISSUES}
            />

            {/* Main Content Area */}
            <div className="bg-white px-8 min-h-[500px] border-t border-gray-100">
              {error ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-center">
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
                  <p className="text-gray-500 mb-6 max-w-md">{error}</p>
                  <Button onClick={refresh} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    Try Again
                  </Button>
                </div>
              ) : loading ? (
                <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Patients...</p>
                </div>
              ) : (
                <>
                  <div className="py-2">
                    {view === 'table' ? (
                      <PatientTable patients={patients} />
                    ) : (
                      <PatientCardList patients={patients} />
                    )}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
