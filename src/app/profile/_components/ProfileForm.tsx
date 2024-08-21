import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/lib/types'

export default function ProfileForm({ dbUser }: { dbUser: User }) {
  return (
    <div className="w-[32rem] max-w-[80dvw] bg-secondary p-4 rounded shadow-md font-medium">
      <div className="font-semibold text-lg my-3">Hi {dbUser.firstName}!</div>
      <div className="text-md mb-4">Here's your profile information:</div>
      <div className="grid grid-cols-1fr-2fr">
        <div className="my-2">Email</div>
        <div>{dbUser.emailAddress}</div>
        <div className="my-2">First name</div>
        <div>{dbUser.firstName}</div>
        <div className="my-2">Last name</div>
        <div>{dbUser.lastName}</div>
        <div className="my-2">Username</div>
        {dbUser.username ? (
          <Input
            defaultValue={`${dbUser.username}`}
            type="text"
            id="username"
            name="username"
            required
          />
        ) : (
          <Input
            placeholder="Pick a username"
            type="text"
            id="username"
            name="username"
            required
          />
        )}
      </div>
    </div>
  )
}
