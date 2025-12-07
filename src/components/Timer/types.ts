export type Step = { minutes: number; seconds: number; label: string }

export type FlatStep = Step & {
  equipment?: string
}

export type Block = {
  equipment: string
  steps: Step[]
}
