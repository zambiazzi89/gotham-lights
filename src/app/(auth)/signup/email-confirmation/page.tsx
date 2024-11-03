import { Card, CardContent, CardTitle } from '@/components/ui/card'
import ConfirmationEmailForm from './_components/ConfirmationEmailForm'

export default async function EmailConfirmation() {
  return (
    <Card className="bg-secondary p-8 place-items-center">
      <CardTitle>Pending Email Confirmation</CardTitle>
      <CardContent className="py-8 grid place-items-center gap-2">
        <div>
          You will be able to log in once your email address has been confirmed
        </div>
        <div>
          Please check your email (including spam folder) for a confirmation
          link
        </div>
      </CardContent>
      <CardContent className="py-4 grid place-items-center gap-2">
        <div>You can request a new confirmation email with the form below</div>
        <ConfirmationEmailForm />
      </CardContent>
    </Card>
  )
}
