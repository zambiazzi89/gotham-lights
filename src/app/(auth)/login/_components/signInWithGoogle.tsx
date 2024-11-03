'use client'

import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '../_actions/signInWithGoogle'

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
