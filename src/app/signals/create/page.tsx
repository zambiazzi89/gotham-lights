import CreateSignalForm from './_components/CreateSignalForm'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CreateSignal() {
  const { profile } = await getDbProfileFromServer()
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {profile.username ? (
          <CreateSignalForm />
        ) : (
          <div className="flex flex-col items-center">
            <div>You must create a username before creating a Signal.</div>
            <Link className="my-3" href="/profile">
              <Button>Update Profile</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
