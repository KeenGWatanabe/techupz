'use client';
// components/CountryFlag.tsx
import React from 'react';
import US from 'country-flag-icons/react/3x2/US';
import GB from 'country-flag-icons/react/3x2/GB';
// Add more imports as needed

const LOCAL_FLAGS: Record<string, React.ComponentType<any>> = {
  US,
  GB,
  // Add more
};

interface FlagIconProps {
  countryCode: string;
  className?: string;
}

const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, className = 'w-5 h-auto' }) => {
  const upperCode = countryCode.toUpperCase();
  
  // Try local SVG first
  if (LOCAL_FLAGS[upperCode]) {
    const Flag = LOCAL_FLAGS[upperCode];
    return <Flag className={className} />;
  }

  // Fallback to CDN
  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`}
      alt=""
      className={className}
    />
  );
};

export default FlagIcon;