import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Messages() {
  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center"></div>
        <Footer />
      </div>
    </div>
  )
}
