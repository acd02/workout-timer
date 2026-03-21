import { Select } from '@components/Select'
import { Timer } from '@components/Timer'
import { buttonGroup } from '@styles/button'
import { objectKeys } from '@utils/obect'
import { useState } from 'react'

import { allAboutBTabatas } from './workouts/allAboutBTabatas'
import { bringOnTheBurpeesTabatas } from './workouts/bringOnTheBurpeesTabatas'
import { cardioCoreCraze } from './workouts/cardioCoreCraze'
import { championsCircuit } from './workouts/championsCircuit'
import { crazyCardioCircuits } from './workouts/crazyCardioCircuits'
import { forTheLoveOfTabatas } from './workouts/forTheLoveOfTabatas'
import { fullMoonMadness } from './workouts/fullMoonMadness'
import { goGoCardio } from './workouts/goGoCardio'
import { hopItLikeItsHot } from './workouts/hopItLikeItsHot'
import { intense } from './workouts/intense'
import { justAMinute } from './workouts/justAMinute'
import { livelyLeaps } from './workouts/livelyLeaps'
import { marchStrongTabatas } from './workouts/marchStrongTabatas'
import { summerGlowGrinder } from './workouts/summerGlowGrinder'
import { tabataDrillsForDubs } from './workouts/tabataDrillsForDubs'
import { weeksEndHiit } from './workouts/weeksEndHiit'
import { winningWednesday } from './workouts/winningWednesday'
import { turningLeavesTabata } from './workouts/turningLeavesTabata'

const workoutsLookup = {
  ['All About B Tabatas']: {
    workout: allAboutBTabatas,
    duration: '14min',
  },
  ['Bring On TheBurpees Tabatas']: {
    workout: bringOnTheBurpeesTabatas,
    duration: '14min',
  },
  ['For TheLove Of Tabatas']: {
    workout: forTheLoveOfTabatas,
    duration: '14min',
  },
  ['March Strong Tabatas']: {
    workout: marchStrongTabatas,
    duration: '14min',
  },
  ['Tabata Drills For Dubs']: {
    workout: tabataDrillsForDubs,
    duration: '14min',
  },
  ['Turning Leaves Tabata']: {
    workout: turningLeavesTabata,
    duration: '14min',
  },
  ['Go Go Cardio']: { workout: goGoCardio, duration: '20min' },
  ['Winning Wednesday']: { workout: winningWednesday, duration: '20min' },
  ['Full Moon Madness']: { workout: fullMoonMadness, duration: '23min' },
  ["Hop It Like It's Hot"]: { workout: hopItLikeItsHot, duration: '24min' },
  ['Crazy Cardio Circuits']: { workout: crazyCardioCircuits, duration: '25min' },
  ['Champions Circuit']: { workout: championsCircuit, duration: '26min' },
  ['Cardio Core Craze']: { workout: cardioCoreCraze, duration: '27min' },
  ['Intense']: { workout: intense, duration: '27min' },
  ['Just A Minute']: { workout: justAMinute, duration: '28min' },
  ['Lively Leaps']: { workout: livelyLeaps, duration: '28min' },
  ['Summer Glow Grinder']: { workout: summerGlowGrinder, duration: '28min' },
  ["Week's End Hiit"]: { workout: weeksEndHiit, duration: '29min' },
}

type WorkoutKey = keyof typeof workoutsLookup

const selectData = objectKeys(workoutsLookup).map(workoutLabel => ({
  label: `${workoutLabel} - ${workoutsLookup[workoutLabel].duration} `,
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
          <div className="flex flex-col gap-y-10 px-2 py-8">
            <Timer blocks={workoutsLookup[selectedWorkout].workout} />
          </div>
        )

      default:
        return null
    }
  }

  return <div className="min-h-dvh dark:bg-gray-900 dark:text-white">{getContent()}</div>
}

export { Playground }
