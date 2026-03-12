import { useState, useEffect, useCallback, useMemo } from 'react';

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

export interface ApiResponse {
  data: Patient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UsePatientsProps {
  page: number;
  searchTerm: string;
  selectedIssue: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  debounceMs?: number;
}

export function usePatients({
  page,
  searchTerm,
  selectedIssue,
  sortBy,
  sortOrder,
  debounceMs = 300,
}: UsePatientsProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Debounced search term
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs]);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: debouncedSearch,
        medical_issue: selectedIssue,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/patients?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch patients');
      }

      const result: ApiResponse = await response.json();
      setPatients(result.data);
      setTotalPages(result.totalPages);
      setTotalRecords(result.total);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPatients([]);
      setTotalPages(1);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedIssue, sortBy, sortOrder]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const value = useMemo(() => ({
    patients,
    loading,
    error,
    totalPages,
    totalRecords,
    refresh: fetchPatients
  }), [patients, loading, error, totalPages, totalRecords, fetchPatients]);

  return value;
}
