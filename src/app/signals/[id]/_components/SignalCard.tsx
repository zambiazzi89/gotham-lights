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
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri'

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
      <CardFooter className="flex justify-between pt-4">
        <div className="flex self-center">
          <button className="grid place-items-center">
            <RiHeart3Line className="text-2xl absolute" />
            <RiHeart3Fill className="text-2xl fill-primary" />
          </button>
          <div className="pl-2">10</div>
        </div>
        <div>
          <div className="flex text-right text-muted-foreground">
            <div className="self-center pr-2">
              Signal sent on{' '}
              {signalCardProps.created_at.toLocaleString('en-US')} by
            </div>
            <UsernameDropdown username={signalCardProps.created_by_username} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
