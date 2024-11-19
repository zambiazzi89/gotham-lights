import Link from 'next/link'

export default function Footer() {
  return (
    <div className="p-2 text-stone-400 text-xs bg-black backdrop-blur cursor-default flex justify-between">
      <div className="flex gap-2">
        <Link href="/contact">Contact</Link>
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <div>Copyright © 2024</div>
    </div>
  )
}
