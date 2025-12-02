import { mergeProps, normalizeProps, useMachine } from '@zag-js/react'
import * as timer from '@zag-js/timer'
import { pipeWith } from 'pipe-ts'
import { useEffect, useId, useState } from 'react'

import { buttonGroup } from '@styles/button'
import { append, prepend } from '@utils/array'

import { AnimatedProgress } from './AnimatedProgress'
import type { Props } from '.'
import { BASE_64_MP3 } from './constants'
import { actions } from './store'
import { formatNextDuration } from './utils'

const completionSound = new Audio(`data:audio/mp3;base64,${BASE_64_MP3}`)

export function MainTimer({ blocks }: Props) {
  const flatSteps = blocks.flatMap(block =>
    block.steps.map(step => ({ ...step, equipment: block.equipment }))
  )

  const allSteps = pipeWith(
    flatSteps,
    _ =>
      prepend(_, {
        minutes: 0,
        seconds: 5,
        label: 'Getting Ready',
        equipment: '',
      }),
    _ =>
      append(_, {
        minutes: 0,
        seconds: 1,
        label: 'Done',
        equipment: '',
      })
  )

  const [index, setIndex] = useState(0)

  const { minutes, seconds, label, equipment } = allSteps[index]

  const {
    label: nextLabel,
    minutes: nextMin,
    seconds: nextSec,
  } = allSteps[Math.min(index + 1, allSteps.length - 1)]

  const nextRoundBlock = (
    <p className="text-8xl">
      next: {nextLabel}{' '}
      <span className="text-6xl">
        {nextLabel !== 'Done' &&
          formatNextDuration({ minutes: nextMin, seconds: nextSec })}
      </span>
    </p>
  )

  const service = useMachine(timer.machine, {
    id: useId(),
    countdown: true,
    autoStart: false,
    onComplete() {
      completionSound.play()
      const isLastItem = flatSteps.length === index
      if (isLastItem) return

      setIndex(currentIndex => currentIndex + 1)
    },
    startMs: timer.parse({ minutes, seconds }),
  })

  const api = timer.connect(service, normalizeProps)

  console.log('api ', { running: api.running, paused: api.paused })

  const startActionTriggerProps = mergeProps(
    api.getActionTriggerProps({ action: 'start' }),
    {
      onClick: () => {
        actions.setHasStarted()
      },
    }
  )

  if (api.running) {
    actions.setIsRunning()
  }

  if (api.paused) {
    actions.setIsPaused()
  }

  useEffect(() => {
    if (!index) return
    api.restart()
  }, [index])

  const progress = 1 - api.progressPercent

  const isWorkoutDone = !api.running && index === flatSteps.length

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

      <div className="grid text-center gap-y-8 mt-4">
        <p className="text-8xl text-green-500 animate-pulse">{label}</p>
        {equipment && <p className="text-5xl text-green-400">{equipment}</p>}
        {nextRoundBlock}
        <p className="text-4xl">
          Round {Math.min(index, flatSteps.length)} of {flatSteps.length}
        </p>
      </div>
    </div>
  )
}
