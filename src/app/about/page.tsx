import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { croissantOne } from '../fonts'

export default function About() {
  const pStyle = 'my-4'

  return (
    <div className="h-svh">
      <div className="grid grid-rows-layout h-svh">
        <Navbar />
        <div className="grid place-items-center my-6 overflow-hidden">
          <div className="h-full max-w-[90svw] sm:max-w-[80svw] lg:max-w-[60svw] 2xl:max-w-[50svw] overflow-y-auto flex flex-col md:justify-center">
            <div className="mt-2 mb-4">
              <span>
                <p className="text-lg font-extrabold">About</p>
                <p className={`${croissantOne.variable} font-croissant`}>
                  gotham lights
                </p>
              </span>
            </div>
            <div>
              <p className={pStyle}>
                In the city that never sleeps, connections can be fleeting. A
                glance on the subway, a shared smile at a café, or a brief
                encounter in Central Park — these moments often pass us by,
                leaving us wondering what could have been. We are here to change
                that.
              </p>
              <p className={pStyle}>
                Gotham Lights is a unique platform designed to help you
                reconnect with those serendipitous encounters in New York City.
                Whether you locked eyes with someone during your morning commute
                or shared a moment with a stranger at a bustling bar, our app
                offers a second chance to make that connection.
              </p>
              <p className={pStyle}>
                How it works is simple: describe your encounter, share the date
                and place, and let the magic of our signals help you find the
                person who left an impression. In a city as vast and vibrant as
                NYC, we can bring you closer to turning those fleeting moments
                into something more.
              </p>
              <p className={pStyle}>
                At Gotham Lights, we believe that every chance encounter is a
                story waiting to be told. We're here to help you write yours.
              </p>
            </div>
            <div className="mt-4">
              <p className="font-bold text-muted-foreground">
                Turn the ephemeral into lasting
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
