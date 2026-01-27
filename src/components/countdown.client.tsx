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
  variant?: 'dark' | 'light'
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

interface TimeUnitProps {
  value: number
  label: string
  variant: 'dark' | 'light'
}

function TimeUnit({ value, label, variant }: TimeUnitProps) {
  const boxClasses =
    variant === 'light' ? 'bg-sand/80 border-forest/30' : 'bg-forest/80 border-sand/30'

  const valueClasses = variant === 'light' ? 'text-forest' : 'text-sand'

  const labelClasses = variant === 'light' ? 'text-forest/60' : 'text-sand/60'

  return (
    <div
      className={`${boxClasses} flex size-16 flex-col items-center justify-center rounded-xl border-2 backdrop-blur-sm sm:size-20 md:size-24`}
    >
      <span className={`font-heading ${valueClasses} text-2xl sm:text-3xl md:text-4xl`}>
        {value.toString().padStart(2, '0')}
      </span>
      <span
        className={`font-heading ${labelClasses} text-[10px] tracking-wider uppercase sm:text-xs`}
      >
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

export function Countdown({ targetDate, variant = 'dark' }: CountdownProps) {
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
        <TimeUnit value={0} label="Days" variant={variant} />
        <TimeUnit value={0} label="Hours" variant={variant} />
        <TimeUnit value={0} label="Minutes" variant={variant} />
        <TimeUnit value={0} label="Seconds" variant={variant} />
      </div>
    )
  }

  return (
    <div className="flex gap-3 sm:gap-4 md:gap-6">
      <TimeUnit value={timeLeft.days} label="Days" variant={variant} />
      <TimeUnit value={timeLeft.hours} label="Hours" variant={variant} />
      <TimeUnit value={timeLeft.minutes} label="Minutes" variant={variant} />
      <TimeUnit value={timeLeft.seconds} label="Seconds" variant={variant} />
    </div>
  )
}
