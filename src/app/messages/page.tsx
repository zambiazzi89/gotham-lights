import Link from 'next/link'
import { Button } from '@/components/ui/button'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MessageBox from './_components/MessageBox'

export default async function Messages() {
  const { profile, allBlocks } = await getDbProfileFromServer()

  return (
    <div className="w-full">
      {profile.username ? (
        <MessageBox username={profile.username} allBlocks={allBlocks} />
      ) : (
        <div className="grid place-items-center">
          <div className="flex flex-col items-center">
            <p>
              You must create a username before using the Message functionality.
            </p>
            <Link className="my-3" href="/profile">
              <Button>Update Profile</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
