"use client"

import React, { memo } from "react"
import { Search, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedIssue: string;
  onIssueChange: (issue: string) => void;
  sortBy: string;
  onSortChange: (field: string) => void;
  medicalIssues: string[];
}

const Controls = memo(({
  searchTerm,
  onSearchChange,
  selectedIssue,
  onIssueChange,
  sortBy,
  onSortChange,
  medicalIssues
}: ControlsProps) => {
  return (
    <div className="p-6 bg-white space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients by name, ID, or email..."
            className="pl-10 h-11 border-gray-200 focus:ring-blue-500 rounded-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-400 whitespace-nowrap uppercase tracking-wider">Sort by:</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSortChange('patient_name')}
              className={cn(
                "h-10 rounded-lg border-gray-200 text-gray-600 font-semibold hover:text-blue-600",
                sortBy === 'patient_name' && "border-blue-600 text-blue-600 bg-blue-50"
              )}
            >
              Name <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSortChange('age')}
              className={cn(
                "h-10 rounded-lg border-gray-200 text-gray-600 font-semibold hover:text-blue-600",
                sortBy === 'age' && "border-blue-600 text-blue-600 bg-blue-50"
              )}
            >
              Age <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
        {medicalIssues.map(issue => (
          <button
            key={issue}
            onClick={() => onIssueChange(selectedIssue === issue ? "" : issue)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all border uppercase tracking-wider",
              selectedIssue === issue 
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" 
                : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500"
            )}
          >
            {issue}
          </button>
        ))}
      </div>
    </div>
  );
});

Controls.displayName = "Controls";

export default Controls;
