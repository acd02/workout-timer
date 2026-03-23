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
import { everyMinuteCounts } from './workouts/everyMinuteCounts'
import { forTheLoveOfTabatas } from './workouts/forTheLoveOfTabatas'
import { fullMoonMadness } from './workouts/fullMoonMadness'
import { goGoCardio } from './workouts/goGoCardio'
import { heavyRopesAndCoreStrength } from './workouts/heavyRopesAndCoreStrength'
import { hopItLikeItsHot } from './workouts/hopItLikeItsHot'
import { intense } from './workouts/intense'
import { jingleJumpLegBlitz } from './workouts/jingleJumpLegBlitz'
import { jumpAndPlankTabatas } from './workouts/jumpAndPlankTabatas'
import { justAMinute } from './workouts/justAMinute'
import { livelyLeaps } from './workouts/livelyLeaps'
import { marchStrongTabatas } from './workouts/marchStrongTabatas'
import { muscleUpMonday } from './workouts/muscleUpMonday'
import { pumpUpJumpUpTabatas } from './workouts/pumpUpJumpUpTabatas'
import { summerGlowGrinder } from './workouts/summerGlowGrinder'
import { tabataDrillsForDubs } from './workouts/tabataDrillsForDubs'
import { turningLeavesTabata } from './workouts/turningLeavesTabata'
import { weeksEndHiit } from './workouts/weeksEndHiit'
import { winningWednesday } from './workouts/winningWednesday'

const workoutsLookup = {
  // strong
  ['All About B Tabatas']: {
    workout: allAboutBTabatas,
    duration: '14min',
    set: 'strong',
  },
  ['March Strong Tabatas']: {
    workout: marchStrongTabatas,
    duration: '14min',
    set: 'strong',
  },
  ['Pump Up Jump Up Tabatas']: {
    workout: pumpUpJumpUpTabatas,
    duration: '14min',
    set: 'strong',
  },
  ['Turning Leaves Tabata']: {
    workout: turningLeavesTabata,
    duration: '14min',
    set: 'strong',
  },
  ['Jingle Jump Leg Blitz']: {
    workout: jingleJumpLegBlitz,
    duration: '16min',
    set: 'strong',
  },
  ['Heavy Ropes & Core Strength']: {
    workout: heavyRopesAndCoreStrength,
    duration: '18min',
    set: 'strong',
  },
  ['Jump & Plank Tabatas']: {
    workout: jumpAndPlankTabatas,
    duration: '19min',
    set: 'strong',
  },
  ['Winning Wednesday']: { workout: winningWednesday, duration: '20min', set: 'strong' },
  ['Full Moon Madness']: { workout: fullMoonMadness, duration: '23min', set: 'strong' },
  ['Muscle Up Monday']: { workout: muscleUpMonday, duration: '28min', set: 'strong' },
  ['Every Minute Counts']: {
    workout: everyMinuteCounts,
    duration: '29min',
    set: 'strong',
  },

  ['Bring On The Burpees Tabatas']: {
    workout: bringOnTheBurpeesTabatas,
    duration: '14min',
    set: 'lean',
  },
  ['For The Love Of Tabatas']: {
    workout: forTheLoveOfTabatas,
    duration: '14min',
    set: 'lean',
  },
  ['Tabata Drills For Dubs']: {
    workout: tabataDrillsForDubs,
    duration: '14min',
    set: 'lean',
  },
  ['Go Go Cardio']: { workout: goGoCardio, duration: '20min', set: 'lean' },
  ["Hop It Like It's Hot"]: { workout: hopItLikeItsHot, duration: '24min', set: 'lean' },
  ['Intense']: { workout: intense, duration: '27min', set: 'lean' },
  ['Just A Minute']: { workout: justAMinute, duration: '28min', set: 'lean' },
  ['Lively Leaps']: { workout: livelyLeaps, duration: '28min', set: 'lean' },
  ["Week's End Hiit"]: { workout: weeksEndHiit, duration: '29min', set: 'lean' },

  ['Crazy Cardio Circuits']: {
    workout: crazyCardioCircuits,
    duration: '25min',
    set: 'mixed',
  },
  ['Champions Circuit']: { workout: championsCircuit, duration: '26min', set: 'mixed' },
  ['Cardio Core Craze']: { workout: cardioCoreCraze, duration: '27min', set: 'mixed' },
  ['Summer Glow Grinder']: {
    workout: summerGlowGrinder,
    duration: '28min',
    set: 'mixed',
  },
}

type WorkoutKey = keyof typeof workoutsLookup

const selectData = objectKeys(workoutsLookup).map(workoutLabel => ({
  label: `${workoutLabel} - ${workoutsLookup[workoutLabel].duration} - ${workoutsLookup[workoutLabel].set}`,
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
