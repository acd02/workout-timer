import { buttonGroup } from '@styles/button'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react'
import * as timer from '@zag-js/timer'
import { useEffect, useEffectEvent, useId } from 'react'
import { useSnapshot } from 'valtio'

import { AnimatedProgress } from './AnimatedProgress'
import { BASE_64_MP3 } from './constants'
import { actions, state } from './store'

const COMPLETION_SOUND = new Audio(`data:audio/mp3;base64,${BASE_64_MP3}`)

export function MainTimer() {
  const snap = useSnapshot(state)
  const steps = snap.allSteps

  const activeStep = steps[snap.activeIndex]

  const service = useMachine(timer.machine, {
    id: useId(),
    countdown: true,
    autoStart: false,
    onComplete() {
      COMPLETION_SOUND.play()
      const isLastItem = steps.length === snap.activeIndex
      if (isLastItem) return

      actions.goToNextStep()
    },
    ...(activeStep && {
      startMs: timer.parse({ minutes: activeStep.minutes, seconds: activeStep.seconds }),
    }),
  })

  const api = timer.connect(service, normalizeProps)

  const startActionTriggerProps = mergeProps(
    api.getActionTriggerProps({ action: 'start' }),
    {
      onClick: () => {
        actions.setShouldStartRemainingTimer()
      },
    }
  )

  actions.setMainTimerStatus({ running: api.running, paused: api.paused })

  const restart = useEffectEvent(() => api.restart())

  useEffect(() => {
    if (!snap.activeIndex) return
    restart() // needed when two consecutive steps share same duration
  }, [snap.activeIndex])

  const progress = 1 - api.progressPercent

  const isWorkoutDone = !api.running && snap.activeIndex === steps.length

  if (isWorkoutDone)
    return <div className="text-8xl text-center h-1/4 mt-20 animate-bounce">🎉</div>

  return (
    <div {...api.getRootProps()}>
      <div className="max-w-[640px] mx-auto relative">
        <AnimatedProgress progress={progress} />

        <div
          className="rounded-md flex p-4 justify-evenly text-8xl tabular-nums"
          {...api.getAreaProps()}
        >
          <div {...api.getItemProps({ type: 'minutes' })}>
            {api.formattedTime.minutes} <span className="text-sm">min</span>
          </div>
          <div {...api.getSeparatorProps()}>:</div>
          <div {...api.getItemProps({ type: 'seconds' })}>
            {api.formattedTime.seconds} <span className="text-sm">sec</span>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-auto w-fit">
        <div className={buttonGroup({ part: 'wrapper' })} {...api.getControlProps()}>
          <button
            className={buttonGroup({ part: 'middle' })}
            {...startActionTriggerProps}
          >
            START
          </button>
          <button
            className={buttonGroup({ part: 'middle' })}
            {...api.getActionTriggerProps({ action: 'pause' })}
          >
            PAUSE
          </button>
          <button
            className={buttonGroup({ part: 'middle', isActive: api.paused })}
            {...api.getActionTriggerProps({ action: 'resume' })}
          >
            RESUME
          </button>
        </div>
      </div>
    </div>
  )
}
