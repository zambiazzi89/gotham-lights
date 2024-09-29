import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ChatMessages from './ChatMessages'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { Message } from '@/lib/types'

export default async function ChatContent({
  firstConversationMessages,
}: {
  firstConversationMessages: Message[]
}) {
  const profile = await getDbProfileFromServer()

  return (
    <Card className="bg-secondary flex flex-col w-full p-4">
      <ChatMessages
        username={profile.username}
        messages={firstConversationMessages}
      />
      <div className="flex gap-4">
        <Textarea />
        <Button variant={'outline'} className="h-full">
          Send
        </Button>
      </div>
    </Card>
  )
}
