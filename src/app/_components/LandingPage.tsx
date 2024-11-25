import GoogleAutocompleteInput from '@/components/GoogleTools/googleAutocomplete'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function LandingPage() {
  const supabase = createClient()
  const { data: sessionData } = await supabase.auth.getSession()

  const session = sessionData.session

  return (
    <div className="flex flex-col w-fit justify-center items-center text-white">
      <div className="max-w-[80vw] min-w-fit flex flex-col gap-4 items-center bg-black bg-opacity-50  backdrop-blur-sm p-8 rounded-t-lg animate-fadeIn2s">
        <h2 className="text-center text-xl animate-fadeIn3s">
          Crushed on a stranger in NYC?
        </h2>
        <Link href="/signals/create">
          <div className="font-medium text-2xl text-primary animate-fadeIn4s">
            Send them a signal!
          </div>
        </Link>
        {!!session && (
          <div className="w-full flex flex-col gap-4 items-center">
            <div className="flex w-full gap-2 items-center animate-fadeIn6s">
              <div className="h-px flex-grow bg-primary opacity-50" />
              <div className="italic text-sm">or</div>
              <div className="h-px flex-grow bg-primary opacity-50" />
            </div>
            <div className="animate-fadeIn7s">Find out if you're in one!</div>
            <div className="w-full animate-fadeIn8s">
              <GoogleAutocompleteInput />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
