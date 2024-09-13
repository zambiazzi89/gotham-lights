import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ChatMessages from './ChatMessages'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

export default async function ChatContent() {
  const profile = await getDbProfileFromServer()

  return (
    <Card className="bg-secondary flex flex-col w-full p-4">
      <ChatMessages username={profile.username} />
      <div className="flex gap-4">
        <Textarea />
        <Button variant={'outline'} className="h-full">
          Send
        </Button>
      </div>
    </Card>
  )
}
