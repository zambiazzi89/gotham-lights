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
    <Card className="shadow">
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
      <CardFooter>
        <p>
          Signal sent on {signalCardProps.createdAt.toLocaleDateString('en-US')}
        </p>
      </CardFooter>
    </Card>
  )
}
