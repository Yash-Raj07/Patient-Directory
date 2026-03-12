"use client"

import React, { useState, memo } from "react"
import { cn } from "@/lib/utils"

interface PatientAvatarProps {
  photoUrl: string | null;
  patientId: number;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PatientAvatar = memo(({ photoUrl, patientId, name, className, size = 'md' }: PatientAvatarProps) => {
  const [error, setError] = useState(false);
  const initials = name.charAt(0);
  
  // Use a reliable avatar service as a primary/fallback if the mock data URLs are invalid
  // i.pravatar.cc provides real-looking people photos based on a unique ID
  const fallbackUrl = `https://i.pravatar.cc/150?u=${patientId}`;
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div className={cn(
      "rounded-full bg-blue-100 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      {(!photoUrl || error) ? (
        <img 
          src={fallbackUrl} 
          alt={name} 
          className="h-full w-full object-cover"
          onError={() => {
            // If even pravatar fails, show initials
            setError(true);
          }}
        />
      ) : (
        <img 
          src={photoUrl} 
          alt={name} 
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      )}
      
      {error && !photoUrl && (
        <span className="font-bold text-blue-600 uppercase">
          {initials}
        </span>
      )}
    </div>
  );
});

PatientAvatar.displayName = "PatientAvatar";

export default PatientAvatar;
