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
    <Card className="shadow-md flex flex-col justify-between grow bg-secondary hover:bg-primary-20">
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
      </CardContent>
      <CardFooter className="self-end">
        <div className="flex text-sm text-right text-muted-foreground mt-4">
          <div className="font-sans">
            {signalCardProps.created_at.toLocaleDateString('en-US')}
          </div>
          <div className="pl-2">{signalCardProps.created_by_username}</div>
        </div>
      </CardFooter>
    </Card>
  )
}
