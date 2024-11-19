'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'
import ContactFormEmail from '../_components/ContactFormEmail'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  content: z.string(),
})

export default async function sendEmail(
  prevState: unknown,
  formData: FormData
) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const { name, email, content } = result.data

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const data = await resend.emails.send({
      from: 'Gotham Lights <noreply@gothamlights.com>',
      to: ['zambiazzi89@gmail.com'],
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nContent: ${content}`,
      react: ContactFormEmail({ name, email, content }),
    })
  } catch (error) {
    console.error(error)
    redirect('/error?code=email_not_sent')
  }
}
