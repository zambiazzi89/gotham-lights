import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignalCardType } from '../_types/SignalCardType'

export default function SignalCard({
  signalCardProps,
}: {
  signalCardProps: SignalCardType
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between grow">
      <CardHeader>
        <CardTitle>{signalCardProps.title}</CardTitle>
        <CardDescription>
          {signalCardProps.locationName} @{' '}
          {signalCardProps.dateOfEncounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="overflow-hidden ">
          {signalCardProps.content.substring(0, 100)}...
        </p>
        <p className="text-muted-foreground text-right">...see more</p>
      </CardContent>
      <CardFooter className="self-end">
        <p className=" text-muted-foreground mt-4">
          Signal sent on {signalCardProps.createdAt.toLocaleDateString('en-US')}
        </p>
      </CardFooter>
    </Card>
  )
}
