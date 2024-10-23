import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import UsernameDropdown from '@/components/UsernameDropdown'
import { Signal } from '@/lib/types'
import GoBackButton from './GoBackButton'

export default function SignalCard({
  signalCardProps,
}: {
  signalCardProps: Signal
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{signalCardProps.title}</CardTitle>
        <CardDescription>
          {signalCardProps.location_name} @{' '}
          {signalCardProps.date_encounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{signalCardProps.content}</p>
      </CardContent>
      <CardFooter className="self-end pt-4 flex justify-between w-full">
        <GoBackButton />
        <div className="flex flex-col items-end  text-muted-foreground">
          <UsernameDropdown username={signalCardProps.created_by_username} />
          <div className="font-sans text-sm">
            {signalCardProps.created_at.toLocaleString([], {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
