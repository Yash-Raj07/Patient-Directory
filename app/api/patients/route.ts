import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: {
    address: string | null;
    number: string | null;
    email: string | null;
  }[];
  medical_issue: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search')?.toLowerCase() || '';
    const medicalIssue = searchParams.get('medical_issue') || '';
    const sortBy = searchParams.get('sortBy') || ''; // e.g., 'name', 'age'
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    
    const filePath = path.join(process.cwd(), '..', 'MOCK_DATA.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let patients: Patient[] = JSON.parse(fileContents);

    // Filtering
    if (search) {
      patients = patients.filter(p => 
        p.patient_name.toLowerCase().includes(search) ||
        p.patient_id.toString().includes(search) ||
        p.contact[0]?.email?.toLowerCase().includes(search)
      );
    }

    if (medicalIssue) {
      patients = patients.filter(p => p.medical_issue === medicalIssue);
    }

    // Sorting
    if (sortBy) {
      patients.sort((a, b) => {
        let valA: any = a[sortBy as keyof Patient];
        let valB: any = b[sortBy as keyof Patient];
        
        if (sortBy === 'name') {
          valA = a.patient_name;
          valB = b.patient_name;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = patients.length;
    const offset = (page - 1) * limit;
    const paginatedPatients = patients.slice(offset, offset + limit);

   try {
  return NextResponse.json({
    data: paginatedPatients,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / page)  
  });
} catch (error) {
  console.log('API Error:', err);         
  return NextResponse.json(
    { message: 'Internal Server Error' }, 
    { status: "500" }                     
  );
}