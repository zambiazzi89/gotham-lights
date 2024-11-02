'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
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
  commentId: z.string(),
})

export async function editComment(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  if (!profile || !profile.username) {
    console.error('Profile or username not found')
    redirect('/error')
  }

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data

  await db.comment.update({
    where: { id: resultData.commentId, created_by_username: profile.username },
    data: { content: resultData.content },
  })
}
