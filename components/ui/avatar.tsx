
import { cn } from "@/lib/utils";
import { getInitialsFromFullName } from "@/utils/func/getInitialsFromFullName";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  img?: string ;
  alt?: string;
  fullName: string;
  className?:string
  innerClassName?:string
  width?:number
  height?:number
}

const Avatar: React.FC<AvatarProps> = ({ img, alt, fullName, className, innerClassName,width,height }) => { 
  return (
    <div className={cn("relative h-10 w-10 rounded-full flex items-center justify-center", className)}>
      {img?.trim() ? (  
        <Image
          src={img}
          className={cn("size-10 rounded-3xl object-cover object-center", innerClassName)}
          alt={alt || `${fullName} avatar`}
          width={width || 100}
          height={height || 100}
         
        />
      ) : (
        <span className={cn("font-medium size-10 rounded-full bg-white leading-10 border flex items-center justify-center", innerClassName)}>
          {getInitialsFromFullName(fullName)}
        </span>
      )}
    </div>
  );
};


export default Avatar;
