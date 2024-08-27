'use client'

import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/lib/auth-actions'

export default function SignInWithGoogle() {
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={() => {
        signInWithGoogle()
      }}
    >
      Login with Google
    </Button>
  )
}
