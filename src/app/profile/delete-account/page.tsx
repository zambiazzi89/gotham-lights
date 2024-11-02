import GoBackButton from '@/app/signals/[id]/_components/GoBackButton'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import DeleteButton from './_components/DeleteButton'

export default function MyActivity() {
  return (
    <div className="flex gap-4">
      <GoBackButton route={'/profile'} styles={'h-auto'} variant="secondary" />
      <Card className="bg-secondary p-4 w-[80svw] lg:w-[50svw] grid place-items-center">
        <CardTitle className="py-4 text-center">Delete Account</CardTitle>
        <CardContent className="py-8 place-items-center font-bold text-lg">
          <div>Are you sure you want to delete your account?</div>
          <div>All your activity will be permanently lost.</div>
          <div className="pt-4">This action cannot be undone.</div>
        </CardContent>
        <DeleteButton />
      </Card>
    </div>
  )
}
