import { ArrowUpRight, BookOpen, Instagram, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1d3c31] text-[#e7eddf]">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.5fr_.8fr_1fr] md:py-16">
        <div>
          <Link href="/" className="flex w-fit items-center gap-2.5"><span className="grid size-10 place-items-center rounded-xl bg-[#dce9b8] text-[#244c3e]"><BookOpen size={20} /></span><span className="font-display text-2xl font-bold">BookNook</span></Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#bdcdbf]">A little corner for curious minds. Find your next favorite, share the books you love, and borrow something new.</p>
          <div className="mt-5 flex gap-2"><Social href="https://www.instagram.com/" label="Instagram"><Instagram size={17} /></Social><Social href="https://x.com/" label="X"><span className="text-sm font-black">𝕏</span></Social></div>
        </div>
        <div><p className="eyebrow !text-[#b2c7b6]">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#d7e2d8]"><Link href="/books" className="hover:text-white">All books</Link><Link href="/register" className="hover:text-white">Join the library</Link><Link href="/login" className="hover:text-white">Member sign in</Link></div></div>
        <div><p className="eyebrow !text-[#b2c7b6]">Say hello</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#d7e2d8]"><a href="mailto:hello@booknook.example" className="flex items-center gap-2 hover:text-white"><Mail size={15} /> hello@booknook.example</a><p className="flex items-center gap-2"><MapPin size={15} /> Made for readers everywhere</p><a href="https://x.com/" className="flex items-center gap-2 hover:text-white">Follow along <ArrowUpRight size={14} /></a></div></div>
      </div>
      <div className="border-t border-white/10"><div className="container-page flex flex-col justify-between gap-2 py-5 text-xs text-[#aec0b2] sm:flex-row"><span>© {new Date().getFullYear()} BookNook Library. All rights reserved.</span><span>Turn a page. Find a world.</span></div></div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-9 place-items-center rounded-full border border-white/20 text-[#e7eddf] transition hover:border-[#dce9b8] hover:text-[#dce9b8]">{children}</a>;
}
