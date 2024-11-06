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
import { SubwayLineLogo } from '@/components/Subway/SubwayLineButton'
import { SUBWAY_LINES_JSON } from '@/data/SubwayLines'

export default function SignalCard({
  signalCardProps,
}: {
  signalCardProps: Signal
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{signalCardProps.title}</CardTitle>
        <CardDescription className="flex py-1 items-center">
          {signalCardProps.subway_line && (
            <div className="pr-2">
              <SubwayLineLogo
                subwayLine={SUBWAY_LINES_JSON[signalCardProps.subway_line]}
              />
            </div>
          )}
          {signalCardProps.location_name} @{' '}
          {signalCardProps.date_encounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>{signalCardProps.content}</div>
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
