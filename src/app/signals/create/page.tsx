import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CreateSignalForm from './_components/CreateSignalForm'

export default function CreateSignal() {
  return (
    <div className="h-svh">
      <div className="grid grid-rows-layout h-full">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <CreateSignalForm />
        </div>
        <Footer />
      </div>
    </div>
  )
}
