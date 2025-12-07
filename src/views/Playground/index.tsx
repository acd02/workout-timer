import { Select } from '@components/Select'
import { Timer } from '@components/Timer'
import { buttonGroup } from '@styles/button'
import { useState } from 'react'

import { cardioCoreCraze } from './workouts/cardioCoreCraze'
import { championsCircuit } from './workouts/championsCircuit'
import { crazyCardioCircuits } from './workouts/crazyCardioCircuits'
import { emomDumbbells } from './workouts/emomDumbbells'
import { fullMoonMadness } from './workouts/fullMoonMadness'
import { goGoCardio } from './workouts/goGoCardio'
import { hopItLikeItsHot } from './workouts/hopItLikeItsHot'
import { intense } from './workouts/intense'
import { justAMinute } from './workouts/justAMinute'
import { livelyLeaps } from './workouts/livelyLeaps'
import { summerGlowGrinder } from './workouts/summerGlowGrinder'
import { weeksEndHiit } from './workouts/weeksEndHiit'
import { winningWednesday } from './workouts/winningWednesday'

const workoutsLookup = {
  ["Week's End Hiit"]: weeksEndHiit,
  ['Just A Minute']: justAMinute,
  ['Intense']: intense,
  ['Lively Leaps']: livelyLeaps,
  ['Full Moon Madness']: fullMoonMadness,
  ['Winning Wednesday']: winningWednesday,
  ["Hop It Like It's Hot"]: hopItLikeItsHot,
  ['Go Go Cardio']: goGoCardio,
  ['Crazy Cardio Circuits']: crazyCardioCircuits,
  ['Champions Circuit']: championsCircuit,
  ['Summer Glow Grinder']: summerGlowGrinder,
  ['Cardio Core Craze']: cardioCoreCraze,
  ['EMOM Dumbbells']: emomDumbbells,
}

type WorkoutKey = keyof typeof workoutsLookup

const selectData = Object.keys(workoutsLookup).map(workoutLabel => ({
  label: workoutLabel,
  value: workoutLabel,
}))

function Playground() {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutKey>()
  const [step, setStep] = useState<'selection' | 'workout'>('selection')

  function validateStepChange() {
    setStep('workout')
  }

  const getContent = () => {
    switch (true) {
      case step === 'selection':
        return (
          <div className="grid min-h-dvh place-items-center">
            <div className="flex flex-col gap-y-4">
              <Select
                onValueChange={value => {
                  setSelectedWorkout(value as WorkoutKey)
                }}
                data={selectData}
                label="Select a workout:"
              />
              <button
                disabled={!selectedWorkout}
                className={buttonGroup({ part: 'middle' })}
                type="button"
                onClick={validateStepChange}
              >
                let's go
              </button>
            </div>
          </div>
        )

      case step === 'workout' && !!selectedWorkout:
        return (
          <div className="flex flex-col gap-y-10 py-8 px-2">
            <Timer blocks={workoutsLookup[selectedWorkout]} />
          </div>
        )

      default:
        return null
    }
  }

  return <div className="dark:bg-gray-900 dark:text-white min-h-dvh">{getContent()}</div>
}

export { Playground }
