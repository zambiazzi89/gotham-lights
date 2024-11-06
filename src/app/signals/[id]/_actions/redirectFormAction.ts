'use server'
import { redirect } from 'next/navigation'

export default async function redirectFormAction(data: FormData) {
  const formURL = data.get('formURL') as string
  redirect(formURL)
}
