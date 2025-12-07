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

  const flatSteps = blocks.flatMap(block =>
    block.steps.map(step => ({ ...step, equipment: block.equipment }))
  )

  const allSteps = [PREFIXED_STEP, ...flatSteps, SUFFIXED_STEP]

  if (!snap.isStoreInitialized) {
    actions.initializeStore({ allSteps, blocks })
  }

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null

    const startWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request('screen')
      } catch (err) {
        console.error(`${(err as Error).name}, ${(err as Error).message}`)
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
