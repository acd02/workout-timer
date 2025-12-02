import { proxy } from 'valtio'

export interface State {
  hasStarted: boolean
  isRunning: boolean
}

export const actions = {
  setIsRunning: () => {
    state.isRunning = true
  },
  setIsPaused: () => {
    state.isRunning = false
  },
  setHasStarted: () => {
    state.hasStarted = true
  },
}

export const state = proxy<State>({
  hasStarted: false,
  isRunning: false,
})
