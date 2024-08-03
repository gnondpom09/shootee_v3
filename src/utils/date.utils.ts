import { Timestamp } from "firebase/firestore";

export function isValidDate(date: Date): boolean {
  return date.getTime && typeof date.getTime === "function";
}

export function formatTime(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}m`;
  }
}

export function convertExifToTimeStamp(DateTimeOriginal: string): Timestamp {
  const parts = DateTimeOriginal.split(" ");
  const date = parts[0].replaceAll(":", "-");
  const time = parts[1];
  const dateFormat = `${date}T${time}`;

  return Timestamp.fromDate(new Date(dateFormat));
}
