import { useSnapshot } from 'valtio'

import { state } from './store'
import { formatNextDuration } from './utils'

export function StepInfo() {
  const snap = useSnapshot(state)

  if (!snap.activeStep) return null

  const nextRoundBlock = snap.nextStep ? (
    <p className="text-8xl">
      next: {snap.nextStep.label}{' '}
      <span className="text-6xl">
        {snap.nextStep.label !== 'Done' &&
          formatNextDuration({
            minutes: snap.nextStep.minutes,
            seconds: snap.nextStep.seconds,
          })}
      </span>
    </p>
  ) : null

  return (
    <div className="mt-4 grid gap-y-8 text-center">
      <p className="animate-pulse text-8xl text-green-500">{snap.activeStep.label}</p>
      {snap.activeStep.equipment && (
        <p className="text-5xl text-green-400">{snap.activeStep.equipment}</p>
      )}
      {nextRoundBlock}
      <p className="text-4xl">
        Round {Math.min(snap.activeIndex, snap.flatStepsLength)} of {snap.flatStepsLength}
      </p>
    </div>
  )
}
