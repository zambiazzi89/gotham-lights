import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SignalCardGrid from './_components/SignalCardGrid'

export default async function Signals() {
  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <Button>
            <Link href="/signals/create">Send a Signal</Link>
          </Button>
          <SignalCardGrid />
        </div>
        <Footer />
      </div>
    </div>
  )
}
