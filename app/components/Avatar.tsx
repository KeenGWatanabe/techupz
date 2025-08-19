'use client';

import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.png"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />  
  );
};

export default Avatar;