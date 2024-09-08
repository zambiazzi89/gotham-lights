import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Signal } from '@/lib/types'

export default function GridSignalCard({
  signalCardProps,
}: {
  signalCardProps: Signal
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between grow">
      <CardHeader>
        <CardTitle>{signalCardProps.title}</CardTitle>
        <CardDescription>
          {signalCardProps.location_name}
          {' on '}
          {signalCardProps.date_encounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="overflow-hidden ">
          {signalCardProps.content.substring(0, 100)}...
        </p>
        <p className="text-muted-foreground text-right">...see more</p>
      </CardContent>
      <CardFooter className="self-end">
        <p className="text-right text-muted-foreground mt-4">
          Signal sent on{' '}
          {signalCardProps.created_at.toLocaleDateString('en-US')} by{' '}
          {signalCardProps.created_by_username}
        </p>
      </CardFooter>
    </Card>
  )
}
