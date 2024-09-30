import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MessageRequestForm from './_components/MessageRequestForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function MessageDraft({
  params: id,
}: {
  params: { id: string }
}) {
  const { id: toUsername } = id
  const profile = await getDbProfileFromServer()
  return (
    <>
      {profile.username ? (
        <MessageRequestForm toUsername={toUsername} />
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
    </>
  )
}
