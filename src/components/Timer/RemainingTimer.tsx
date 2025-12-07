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
    ...(snap.totalWorkoutMinutes && {
      startMs: timer.parse({ minutes: snap.totalWorkoutMinutes }),
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

  return (
    <div {...api.getRootProps()}>
      <div className="max-w-[640px] mx-auto relative">
        <div
          className="rounded-md flex p-4 justify-evenly text-6xl tabular-nums"
          {...api.getAreaProps()}
        >
          <div {...api.getItemProps({ type: 'minutes' })}>
            ~{api.formattedTime.minutes} <span className="text-sm">min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
