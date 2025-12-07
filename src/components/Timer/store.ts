import { proxy } from 'valtio'

import { Block, FlatStep } from './types'
import { getTotalDuration } from './utils'

interface State {
  isStoreInitialized: boolean
  mainTimerStatus: 'idle' | 'running' | 'paused'
  shouldStartRemainingTimer: boolean
  activeIndex: number
  activeStep: FlatStep | undefined
  nextStep: FlatStep | undefined
  flatStepsLength: number
  allSteps: FlatStep[]
  totalWorkoutMinutes: number | undefined
}

export const actions = {
  initializeStore: ({ allSteps, blocks }: { allSteps: FlatStep[]; blocks: Block[] }) => {
    state.totalWorkoutMinutes = getTotalDuration(blocks).minutes
    state.isStoreInitialized = true
    state.allSteps = allSteps
    state.flatStepsLength = allSteps.length - 2

    const activeStep = state.allSteps[0]
    const nextStep = state.allSteps[1]

    if (!activeStep) return
    state.activeStep = activeStep

    if (!nextStep) return
    state.nextStep = nextStep
  },
  goToNextStep: () => {
    const newIndex = state.activeIndex + 1
    state.activeIndex = newIndex

    const activeStep = state.allSteps[newIndex]
    const nextStep = state.allSteps[newIndex + 1]

    if (!activeStep) return
    state.activeStep = activeStep

    if (!nextStep) return
    state.nextStep = nextStep
  },
  setMainTimerStatus: ({ running, paused }: { running: boolean; paused: boolean }) => {
    const getMainTimerStatus = () => {
      if (!running && !paused) return 'idle'
      return running ? 'running' : 'paused'
    }

    state.mainTimerStatus = getMainTimerStatus()
  },
  setShouldStartRemainingTimer: () => {
    state.shouldStartRemainingTimer = true
  },
}

export const state = proxy<State>({
  isStoreInitialized: false,
  mainTimerStatus: 'idle',
  shouldStartRemainingTimer: false,
  activeIndex: 0,
  activeStep: undefined,
  nextStep: undefined,
  flatStepsLength: 0,
  allSteps: [],
  totalWorkoutMinutes: undefined,
})
