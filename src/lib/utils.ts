import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateTextFromDateObj(dateObj: Date) {
  const kstDdateObj = new Date(dateObj.getTime() - 9 * 60 * 60 * 1000);
  const year = kstDdateObj.getFullYear();
  const month = String(kstDdateObj.getMonth() + 1).padStart(2, '0');
  const day = String(kstDdateObj.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

export function getTimeTextFromDateObj(dateObj: Date) {
  const kstDdateObj = new Date(dateObj.getTime() - 9 * 60 * 60 * 1000);
  const hours = String(kstDdateObj.getHours()).replace(/^0+/, '');
  const minutes = String(kstDdateObj.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes} ${kstDdateObj.getHours() >= 12 ? 'PM' : 'AM'}`;
}
