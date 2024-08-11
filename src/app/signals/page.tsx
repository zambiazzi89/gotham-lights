import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SignalCardGrid from './_components/SignalCardGrid'
import { Input } from '@/components/ui/input'

export default async function Signals() {
  return (
    <div className="h-svh grid grid-rows-layout">
      <Navbar />
      <div className="mt-4 flex flex-col overflow-hidden md:grid md:grid-cols-2">
        <div className="m-4">
          <Input className="border-primary shadow-md" placeholder="Where?" />
          <div className="my-4 bg-gray-500 h-96 md:h-full text-white text-center">
            Map
          </div>
        </div>
        <SignalCardGrid />
      </div>
      <Button className="h-12 m-4 justify-self-end w-60 font-bold">
        <Link href="/signals/create">Send a Signal</Link>
      </Button>
      <Footer />
    </div>
  )
}
