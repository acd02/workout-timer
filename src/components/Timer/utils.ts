import type { Props } from '.'

export function getTotalDuration(exercises: Props['blocks']) {
  const totalSeconds = exercises.reduce((acc, block) => {
    const blockSeconds = block.steps.reduce(
      (stepAcc, step) => stepAcc + step.minutes * 60 + step.seconds,
      0
    )
    return acc + blockSeconds
  }, 0)

  const minutes = Math.ceil(totalSeconds / 60)

  return {
    asString: `${minutes}min`,
    minutes,
  }
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
