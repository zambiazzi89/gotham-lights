'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { UpdatePasswordForm } from './UpdatePasswordForm'
import { ResetPasswordForm } from './ResetPasswordForm'

export function ResetPasswordPage() {
  const FIVE_MIN = 5 * 60 * 1000
  const NOW = new Date().getTime()

  const [isUserRedirectedFromEmail, setIsUserRedirectedFromEmail] =
    useState(false)

  const supabase = createClient()

  useEffect(() => {
    const isValid = async () => {
      const session = await supabase.auth.getSession()

      const recovery = session.data.session?.user.recovery_sent_at
        ? Date.parse(session.data.session?.user.recovery_sent_at)
        : null

      const recovery5Minutes = recovery
        ? NOW - recovery < FIVE_MIN
          ? true
          : false
        : null

      setIsUserRedirectedFromEmail(!!recovery5Minutes)
    }
    isValid()

    const timeout = setTimeout(() => {
      window.location.reload()
    }, FIVE_MIN + 500)

    //Clearing the timeout
    return () => clearTimeout(timeout)
  }, [])

  return isUserRedirectedFromEmail ? (
    <UpdatePasswordForm />
  ) : (
    <ResetPasswordForm />
  )
}
