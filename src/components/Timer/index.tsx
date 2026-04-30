import { useEffect } from 'react'
import { useSnapshot } from 'valtio'

import { MainTimer } from './MainTimer'
import { RemainingTimer } from './RemainingTimer'
import { StepInfo } from './StepInfo'
import { PREFIXED_STEP, SUFFIXED_STEP } from './constants'
import { actions, state } from './store'
import { Block } from './types'

interface Props {
  blocks: Block[]
}

export function Timer({ blocks }: Props) {
  const snap = useSnapshot(state)

  if (!snap.isStoreInitialized) {
    const flatSteps = blocks.flatMap(block =>
      block.steps.map(step => ({ ...step, equipment: block.equipment }))
    )

    const allSteps = [PREFIXED_STEP, ...flatSteps, SUFFIXED_STEP]
    actions.initializeStore({ allSteps, blocks })
  }

  useEffect(function toggleWakeLock() {
    let wakeLock: WakeLockSentinel | null = null

    const startWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request('screen')
      } catch (_err) {
        const err = _err as Error
        console.error(`${err.name}, ${err.message}`)
      }
    }

    startWakeLock()

    return () => {
      wakeLock?.release()
    }
  }, [])

  return (
    <>
      <MainTimer />
      <StepInfo />
      <RemainingTimer />
    </>
  )
}
