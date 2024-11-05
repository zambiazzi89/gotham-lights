import { SubwayLineLogo } from '@/components/Subway/SubwayLineButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SUBWAY_LINES_JSON } from '@/data/SubwayLines'
import { Signal, SignalWithComment } from '@/lib/types'
import { BiCommentDetail } from 'react-icons/bi'

export default function GridSignalCard({
  signalCardProps,
}: {
  signalCardProps: SignalWithComment
}) {
  return (
    <Card className="shadow-md flex flex-col justify-between grow bg-secondary hover:bg-primary-20">
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
          <div>
            {signalCardProps.location_name}
            {' on '}
            {signalCardProps.date_encounter.toLocaleDateString('en-US')}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="overflow-hidden ">
          {signalCardProps.content.substring(0, 100)}...
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-2 font-sans text-muted-foreground">
          <BiCommentDetail />
          <div>{signalCardProps.comments.length}</div>
        </div>
        <div className="flex text-sm text-right text-muted-foreground">
          <div className="font-sans">
            {signalCardProps.created_at.toLocaleDateString('en-US')}
          </div>
          <div className="pl-2">{signalCardProps.created_by_username}</div>
        </div>
      </CardFooter>
    </Card>
  )
}
