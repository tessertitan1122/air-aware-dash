import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAirQualityStatus(pm25: number) {
  if (pm25 < 35) {
    return {
      status: 'ดี',
      color: 'green',
      description: 'คุณภาพอากาศดี สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ',
      level: 1
    }
  } else if (pm25 < 75) {
    return {
      status: 'ปานกลาง',
      color: 'yellow',
      description: 'คุณภาพอากาศปานกลาง ควรระมัดระวังสำหรับผู้ที่มีปัญหาระบบหายใจ',
      level: 2
    }
  } else {
    return {
      status: 'แย่',
      color: 'red',
      description: 'คุณภาพอากาศแย่ หลีกเลี่ยงกิจกรรมกลางแจ้งและสวมหน้ากากป้องกัน',
      level: 3
    }
  }
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}