import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  tittle: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  tittle,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      tittle,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
