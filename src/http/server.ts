import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
 type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goal'
import z from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        tittle: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
const { tittle, desiredWeeklyFrequency } = request.body

    await createGoal({
      tittle,
      desiredWeeklyFrequency,
    })
  }
)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
