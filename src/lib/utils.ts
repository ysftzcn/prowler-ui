import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reader(file: any, callback: any) {
  const fr = new FileReader();
  fr.readAsText(file, "UTF-8");
  fr.onload = () => callback(null, fr.result);
  fr.onerror = (err) => callback(err);
}
