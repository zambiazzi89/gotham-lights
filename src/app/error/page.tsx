import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { errorCodes } from './errorCodes'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
      <CardContent className="flex flex-col gap-2">
        <div></div>
        {errorMessage}
        <div>Please try again or contact our support team below</div>
      </CardContent>
      <CardFooter className="pt-8 grid place-items-center">
        <Link href="/contact">
          <Button variant={'outline'}>Contact Us</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
