import Link from 'next/link'

export default function Footer() {
  return (
    <div className="p-2 text-stone-400 text-xs bg-black backdrop-blur cursor-default flex justify-between gap-2">
      <div className="flex flex-col min-[390px]:flex-row min-[390px]:gap-2">
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <div className="flex flex-col min-[390px]:flex-row min-[390px]:gap-2 items-end">
        <Link href="/contact">Contact</Link>
        <div>Copyright © 2024</div>
      </div>
    </div>
  )
}
