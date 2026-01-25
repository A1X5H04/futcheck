import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function getTimeUntilExpiration(endTimestamp: string): string {
  const now = Date.now() + new Date().getTimezoneOffset() * 60000; // This forces 'now' to UTC
  const endTime = new Date(endTimestamp).getTime(); // This is already in UTC

  const timeDiff = endTime - now;

  if (timeDiff <= 0) {
    return "Expired";
  }

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}