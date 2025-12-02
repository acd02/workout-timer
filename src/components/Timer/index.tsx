import { useEffect } from 'react'

import { MainTimer } from './MainTimer'
import { RemainingTimer } from './RemainingTimer'

type Step = { minutes: number; seconds: number; label: string }

type Block = {
  equipment: string
  steps: Step[]
}

export interface Props {
  blocks: Block[]
}

export function Timer({ blocks }: Props) {
  useEffect(() => {
    async function startWakeLock() {
      try {
        await navigator.wakeLock.request('screen')
      } catch (_err) {
        const err = _err as Error
        console.error(`${err.name}, ${err.message}`)
      }
    }

    startWakeLock()
  }, [])

  return (
    <>
      <MainTimer blocks={blocks} />
      <RemainingTimer blocks={blocks} />
    </>
  )
}
