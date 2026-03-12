"use client"

import React, { memo } from "react"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PatientAvatar from "./PatientAvatar"
import type { Patient } from "@/hooks/usePatients"

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable = memo(({ patients }: PatientTableProps) => {
  if (patients.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500">
        No patients found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Medical Issue</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Email ID</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.patient_id} className="hover:bg-blue-50/50">
            <TableCell className="font-medium text-blue-600">ID-{patient.patient_id.toString().padStart(4, '0')}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <PatientAvatar 
                  photoUrl={patient.photo_url} 
                  patientId={patient.patient_id} 
                  name={patient.patient_name} 
                  size="sm"
                />
                <span className="font-medium text-gray-900">{patient.patient_name}</span>
              </div>
            </TableCell>
            <TableCell>{patient.age}</TableCell>
            <TableCell>
              <Badge variant={patient.medical_issue as any}>{patient.medical_issue}</Badge>
            </TableCell>
            <TableCell className="text-gray-500 max-w-[150px] truncate">
              {patient.contact[0]?.address || <span className="text-red-400 text-xs font-semibold">N/A</span>}
            </TableCell>
            <TableCell className="text-gray-500">
              {patient.contact[0]?.number || <span className="text-red-400 text-xs font-semibold">N/A</span>}
            </TableCell>
            <TableCell className="text-gray-500">
              {patient.contact[0]?.email || <span className="text-red-400 text-xs font-semibold">N/A</span>}
            </TableCell>
            <TableCell>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

PatientTable.displayName = "PatientTable";

export default PatientTable;
