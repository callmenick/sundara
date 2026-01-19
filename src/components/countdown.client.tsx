'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownProps {
  targetDate: Date
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date()

  if (targetDate <= now) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = differenceInDays(targetDate, now)
  const hours = differenceInHours(targetDate, now) % 24
  const minutes = differenceInMinutes(targetDate, now) % 60
  const seconds = differenceInSeconds(targetDate, now) % 60

  return { days, hours, minutes, seconds }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm sm:h-20 sm:w-20 md:h-24 md:w-24">
        <span className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs tracking-wider text-white/70 uppercase sm:text-sm">
        {label}
      </span>
    </div>
  )
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function Countdown({ targetDate }: CountdownProps) {
  const isClient = useIsClient()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!isClient) {
    return (
      <div className="flex gap-3 sm:gap-4 md:gap-6">
        <TimeUnit value={0} label="Days" />
        <TimeUnit value={0} label="Hours" />
        <TimeUnit value={0} label="Minutes" />
        <TimeUnit value={0} label="Seconds" />
      </div>
    )
  }

  return (
    <div className="flex gap-3 sm:gap-4 md:gap-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}
