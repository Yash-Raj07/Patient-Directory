"use client"

import React, { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Patient } from "@/hooks/usePatients"

interface PatientCardListProps {
  patients: Patient[];
}

const PatientCardList = memo(({ patients }: PatientCardListProps) => {
  if (patients.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500">
        No patients found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
      {patients.map((patient) => (
        <Card key={patient.patient_id} className="overflow-hidden group hover:border-blue-400 border-2 border-transparent transition-all shadow-sm">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-inner flex-shrink-0">
                  {patient.photo_url ? (
                    <img src={patient.photo_url} alt={patient.patient_name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-blue-600 text-sm font-bold">
                      {patient.patient_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                    {patient.patient_name}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">ID-{patient.patient_id.toString().padStart(4, '0')}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-600 text-white border-blue-600 rounded-lg py-0.5 px-2 text-[10px]">
                Age:{patient.age}
              </Badge>
            </div>
            
            <div className="mb-4">
              <Badge variant={patient.medical_issue as any} className="rounded-md border px-2 py-0.5 text-[11px] font-bold">
                {patient.medical_issue}
              </Badge>
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-start gap-2">
                <div className="h-4 w-4 flex items-center justify-center text-gray-400 flex-shrink-0 mt-0.5">📍</div>
                <span className="truncate">{patient.contact[0]?.address || <span className="text-red-400 font-semibold text-[10px]">N/A</span>}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 flex items-center justify-center text-gray-400 flex-shrink-0">📞</div>
                <span className="font-medium">{patient.contact[0]?.number || <span className="text-red-400 font-semibold text-[10px]">N/A</span>}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 flex items-center justify-center text-gray-400 flex-shrink-0">✉️</div>
                <span className="truncate font-medium">{patient.contact[0]?.email || <span className="text-red-400 font-semibold text-[10px]">N/A</span>}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

PatientCardList.displayName = "PatientCardList";

export default PatientCardList;
