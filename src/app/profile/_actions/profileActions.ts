'use server'

import db from '@/db/db'
import getServerUser from '@/utils/supabase/customFunctions/getServerUser'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: 'Your first name length must be between 1 and 20 characters.',
    })
    .max(20, {
      message: 'Your first name length must be between 1 and 20 characters.',
    }),
  last_name: z
    .string()
    .min(1, {
      message: 'Your last name length must be between 1 and 20 characters.',
    })
    .max(20, {
      message: 'Your last name length must be between 1 and 20 characters.',
    })
    .optional()
    .or(z.literal('')),
  username: z
    .string()
    .min(4, {
      message: 'Your username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Your username length must be between 4 and 12 characters.',
    }),
})

export async function updateUserProfile(
  prevState: unknown,
  formData: FormData
) {
  // Only perform the action if user is logged in
  const user = await getServerUser()

  if (!user) {
    redirect('/')
  }

  // Continue if logged in

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  // Check if username exists
  const usernameExists = await db.profile.findUnique({
    where: {
      username: data.username,
      NOT: {
        id: user.id,
      },
    },
  })

  // Return error if it already exists
  if (usernameExists) {
    return {
      username: ['Username already exists, please try a different username.'],
    }
  }

  // Update user if previous validations passed
  await db.profile.update({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      updated_at: new Date(),
    },
    where: {
      id: user.id,
    },
  })

  redirect('/profile')
}
