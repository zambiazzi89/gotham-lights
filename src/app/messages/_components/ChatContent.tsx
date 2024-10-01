import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ChatMessages from './ChatMessages'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { Message } from '@/lib/types'

export default async function ChatContent({
  firstConversationMessages,
  searchParams,
}: {
  firstConversationMessages?: Message[]
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const profile = await getDbProfileFromServer()

  const messages = firstConversationMessages || []

  return (
    <Card className="bg-primary-20 flex flex-col flex-grow p-4">
      <ChatMessages username={profile.username} messages={messages} />
      <div className="flex gap-4">
        <Textarea />
        <Button variant={'outline'} className="h-full">
          Send
        </Button>
      </div>
    </Card>
  )
}
