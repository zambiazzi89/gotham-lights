'use server'

import getAuthUser from '@/app/api/authServerFunctions'
import db from '@/db/db'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Your username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Your username length must be between 4 and 12 characters.',
    }),
})

export async function updateUsername(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { isLoggedIn, dbUser } = await getAuthUser()

  if (!isLoggedIn || !dbUser) {
    redirect('/')
  }

  // Continue if logged in

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  // Check if username exists
  const usernameExists = await db.user.findUnique({
    where: {
      username: data.username,
    },
  })

  // Return error if it already exists
  if (usernameExists) {
    return {
      username: ['Username already exists, please try a different username.'],
    }
  }

  // Update user if previous validations passed
  await db.user.update({
    data: {
      username: data.username,
      updatedAt: new Date(),
    },
    where: {
      id: dbUser.id,
    },
  })
}
