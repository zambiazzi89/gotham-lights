import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { errorCodes } from './errorCodes'

export default function ErrorPage({
  searchParams,
}: {
  searchParams?: { code?: string }
}) {
  const errorCode = searchParams?.code
  errorCodes
  const errorMessage =
    errorCode && errorCodes[errorCode]
      ? errorCodes[errorCode]
      : errorCodes['default']

  return (
    <Card className="bg-secondary p-8">
      <CardHeader>
        <CardTitle className="text-xl">Error</CardTitle>
        <CardDescription className="text-base">
          We're sorry, something went wrong!
        </CardDescription>
      </CardHeader>
      <CardContent>{errorMessage}</CardContent>
      <CardContent>
        Please try again or contact our support team below
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
