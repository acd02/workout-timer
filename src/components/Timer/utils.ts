import { PREFIXED_STEP } from './constants'
import type { Block } from './types'

export function getTotalDurationSeconds(exercises: Block[]): number {
  const totalSeconds = exercises.reduce((acc, block) => {
    const blockSeconds = block.steps.reduce(
      (stepAcc, step) => stepAcc + step.minutes * 60 + step.seconds,
      0
    )
    return acc + blockSeconds
  }, 0)

  return totalSeconds + PREFIXED_STEP.seconds
}

export function formatNextDuration({
  minutes,
  seconds,
}: {
  minutes: number
  seconds: number
}) {
  const formattedSeconds = seconds.toString().padStart(2, '0')
  return minutes < 1 ? `(${formattedSeconds}s)` : `(${minutes}:${formattedSeconds}s)`
}
