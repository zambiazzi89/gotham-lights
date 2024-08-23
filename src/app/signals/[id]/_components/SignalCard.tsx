import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignalWithUsername } from '@/lib/types'

export default function GridSignalCard({
  signalCardProps,
}: {
  signalCardProps: SignalWithUsername
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{signalCardProps.title}</CardTitle>
        <CardDescription>
          {signalCardProps.locationName} @{' '}
          {signalCardProps.dateOfEncounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{signalCardProps.content}</p>
      </CardContent>
      <CardFooter className="self-end">
        <p className=" text-muted-foreground mt-4">
          Signal sent on {signalCardProps.createdAt.toLocaleString('en-US')} by{' '}
          {signalCardProps.user?.username}
        </p>
      </CardFooter>
    </Card>
  )
}
