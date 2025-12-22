import { normalizeProps, useMachine } from '@zag-js/react'
import * as timer from '@zag-js/timer'
import { useEffect, useEffectEvent, useId } from 'react'
import { useSnapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { state } from './store'

export function RemainingTimer() {
  const snap = useSnapshot(state)

  const service = useMachine(timer.machine, {
    id: useId(),
    countdown: true,
    autoStart: false,
    ...(snap.totalWorkoutSeconds && {
      startMs: timer.parse({ seconds: snap.totalWorkoutSeconds }),
    }),
  })

  const api = timer.connect(service, normalizeProps)

  const start = useEffectEvent(() => api.start())
  const pause = useEffectEvent(() => api.pause())
  const resume = useEffectEvent(() => api.resume())

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'shouldStartRemainingTimer', shouldStart => {
      if (shouldStart) start()
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'mainTimerStatus', status => {
      if (status === 'running') resume()
      else pause()
    })

    return unsubscribe
  }, [])

  const hasAtLeastOneMinute = Number(api.formattedTime.minutes) >= 1

  return (
    <div {...api.getRootProps()}>
      <div className="relative mx-auto max-w-[640px]">
        <div
          className="flex justify-evenly rounded-md p-4 text-6xl tabular-nums"
          {...api.getAreaProps()}
        >
          {hasAtLeastOneMinute ? (
            <div {...api.getItemProps({ type: 'minutes' })}>
              ~{api.formattedTime.minutes} <span className="text-sm">min</span>
            </div>
          ) : (
            <div {...api.getItemProps({ type: 'seconds' })}>
              ~{api.formattedTime.seconds} <span className="text-sm">sec</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
