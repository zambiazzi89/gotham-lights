import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Signal } from '@/lib/types'

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
      <CardFooter className="self-end">
        <p className="text-right text-muted-foreground mt-4">
          Signal sent on {signalCardProps.created_at.toLocaleString('en-US')} by{' '}
          {signalCardProps.created_by_username}
        </p>
      </CardFooter>
    </Card>
  )
}
