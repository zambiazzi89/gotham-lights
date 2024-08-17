import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SignalCardGrid from './_components/SignalCardGrid'
import { Input } from '@/components/ui/input'
import {
  getKindeServerSession,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Signals() {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()
  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <div className="mt-4 grid grid-cols-1 overflow-y-auto md:overflow-hidden md:grid-cols-2">
        <div className="m-4">
          <Input className="border-primary shadow-md" placeholder="Where?" />
          <div className="my-4 bg-gray-500 h-40 md:h-full text-white text-center">
            Map
          </div>
        </div>
        <SignalCardGrid />
      </div>
      {isAuth ? (
        <Link href="/signals/create" className="h-8 m-4 place-self-end">
          <Button className="w-60 font-bold">Send a Signal</Button>
        </Link>
      ) : (
        <LoginLink
          postLoginRedirectURL="/signals/create"
          className="h-8 m-4 place-self-end"
        >
          <Button className="w-60 font-bold">Send a Signal</Button>
        </LoginLink>
      )}
      <Footer />
    </div>
  )
}
