import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Clicking your name goes home */}
      <Link href="/" className="font-semibold text-lg">
        Home
      </Link>
      <Link href="/blog">Blog</Link>
      <Link href="/projects">Projects</Link>
      
    </nav>
  )
}
