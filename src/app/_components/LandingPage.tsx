import GoogleAutocompleteInput from '@/components/GoogleTools/googleAutocomplete'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function LandingPage() {
  const supabase = createClient()
  const { data: sessionData } = await supabase.auth.getSession()

  const session = sessionData.session

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="max-w-[80vw] flex flex-col items-center bg-black bg-opacity-50  backdrop-blur-sm p-8 rounded border-white">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-center text-2xl">
            Crushed on a stranger in NYC?
          </h2>
          <h2 className="py-4 font-medium text-2xl text-primary">
            Send them a signal!
          </h2>
        </div>
        {!!session ? (
          <GoogleAutocompleteInput />
        ) : (
          <Link href="/login">
            <Button className="text-white">Login</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
