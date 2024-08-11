import Link from 'next/link'

export default function NavButton({
  title,
  href,
}: {
  title: String
  href: String
}) {
  return (
    <Link
      href={`${href}`}
      className="pt-2 w-32 h-12 grid place-items-center
      backdrop-blur
      border border-solid
      border-t-0
      [border-image:radial-gradient(circle_at_bottom,rgb(120,113,108,1),55%,rgba(0,0,0,0))1]
      hover:cursor-pointer
      hover:bg-stone-500
      hover:bg-opacity-20"
    >
      {title}
    </Link>
  )
}
