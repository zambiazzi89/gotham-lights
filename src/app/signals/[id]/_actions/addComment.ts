'use server'

import getAuthUser from '@/app/api/authServerFunctions'
import db from '@/db/db'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: 'Your comment must not be empty.',
    })
    .max(200, {
      message: 'Your comment must have a maximum of 200 characters',
    }),
  signalId: z.string(),
})

export async function addComment(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { isLoggedIn, dbUser } = await getAuthUser()

  if (!isLoggedIn) {
    redirect('/')
  }

  // Continue if logged in

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.comment.create({
    data: {
      content: data.content,
      createdByUserId: dbUser?.id,
      SignalId: data.signalId,
    },
  })
}
