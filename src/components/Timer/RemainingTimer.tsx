import { normalizeProps, useMachine } from '@zag-js/react'
import * as timer from '@zag-js/timer'

import { useEffect, useId } from 'react'
import { subscribeKey } from 'valtio/utils'

import type { Props } from '.'
import { getTotalDuration } from './utils'
import { state } from './store'

export function RemainingTimer({ blocks }: Props) {
  const { minutes } = getTotalDuration(blocks)

  const service = useMachine(timer.machine, {
    id: useId(),
    countdown: true,
    autoStart: false,
    startMs: timer.parse({ minutes }),
  })

  const api = timer.connect(service, normalizeProps)

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'hasStarted', hasStarted => {
      if (hasStarted) api.start()
    })

    return () => {
      unsubscribe()
    }
  }, [state])

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'isRunning', isRunning => {
      if (isRunning) api.resume()
      else api.pause()
    })

    return () => {
      unsubscribe()
    }
  }, [state])

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
