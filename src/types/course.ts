export interface Quiz {
  q: string
  options: string[]
  answerIndex: number
}

export interface Module {
  id: string
  title: string
  blurb: string
  learn: string[]
  quiz: Quiz
}

export interface Stage {
  id: string
  stage: string
  goal: string
  progression: string
  modules: Module[]
}

export type Course = Stage[]

export interface ProgressMap {
  [stageId: string]: {
    [moduleId: string]: boolean
  }
}
