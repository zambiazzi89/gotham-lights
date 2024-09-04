import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Signal } from '@/lib/types'
import { MdMoreVert } from 'react-icons/md'

export default function SignalCard({
  signalCardProps,
}: {
  signalCardProps: Signal
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between">
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="flex-grow w-[90%] break-words">
            {signalCardProps.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdMoreVert className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Signal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>
          {signalCardProps.location_name} @{' '}
          {signalCardProps.date_encounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{signalCardProps.content}</p>
      </CardContent>
      <CardFooter className="self-end">
        <p className="text-right text-muted-foreground mt-4">
          Signal sent on {signalCardProps.created_at.toLocaleString('en-US')} by{' '}
          {signalCardProps.created_by_username || '[deleted]'}
        </p>
      </CardFooter>
    </Card>
  )
}
