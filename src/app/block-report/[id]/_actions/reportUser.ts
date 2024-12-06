'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'
import ReportFormEmail from '../_components/ReportEmail'

const formSchema = z.object({
  username_to_report: z
    .string()
    .min(4, {
      message: 'Username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Username length must be between 4 and 12 characters.',
    }),
  current_username: z
    .string()
    .min(4, {
      message: 'Username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Username length must be between 4 and 12 characters.',
    }),
  reason: z.string().min(4, { message: 'Reason is required' }),
})

export async function reportUser(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  // Continue if logged in and has username

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const { username_to_report, current_username, reason } = result.data

  await db.reported_profile.create({
    data: {
      reported_username: username_to_report,
      reported_by_username: current_username,
      reason: reason,
    },
  })

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const data = await resend.emails.send({
      from: 'Gotham Lights <noreply@gothamlights.com>',
      to: ['zambiazzi89@gmail.com'],
      subject: 'Report form submission',
      text: `Reported user: ${username_to_report}\nReported by: ${current_username}\nReason: ${reason}`,
      react: ReportFormEmail({
        reported_username: username_to_report,
        reported_by_username: current_username,
        reason,
      }),
    })
  } catch (error) {
    console.error(error)
    redirect('/error?code=email_not_sent')
  }

  redirect('/profile/reported-users')
}
