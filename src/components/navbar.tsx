"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BookOpen, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { UserView } from "@/lib/types";

const publicLinks = [{ href: "/", label: "Home" }, { href: "/books", label: "All Books" }];
const privateLinks = [{ href: "/add-book", label: "Add Book" }, { href: "/my-books", label: "My Books" }, { href: "/my-borrows", label: "My Borrows" }];

export function Navbar({ user }: { user: UserView | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function logout() {
    const result = await authClient.signOut();
    if (result.error) { toast.error("Could not sign out. Please try again."); return; }
    toast.success("You have signed out.");
    setOpen(false);
    router.refresh();
    router.push("/");
  }
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e8dc]/80 bg-[#f8f7f1]/95 backdrop-blur-xl">
      <div className="container-page flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="BookNook home">
          <span className="grid size-10 place-items-center rounded-[13px] bg-[#244c3e] text-[#e4efc5]"><BookOpen size={21} strokeWidth={1.8} /></span>
          <span><span className="font-display block text-[22px] font-bold leading-none">BookNook</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.17em] text-[#7c887b]">A small online library</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[13px] font-semibold text-[#617066] transition hover:text-[#244c3e]">{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user ? <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2 rounded-full border border-[#e4e7dd] bg-white/70 p-1.5 pl-2 outline-none transition hover:border-[#afbdaf]">
              <Avatar user={user} /><span className="max-w-[110px] truncate text-xs font-bold">{user.name}</span><ChevronDown size={14} className="text-[#768278]" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal><DropdownMenu.Content align="end" sideOffset={10} className="z-50 min-w-52 rounded-2xl border border-[#e5e8de] bg-[#fffefa] p-2 shadow-xl">
              <div className="px-3 py-2"><p className="text-sm font-bold">{user.name}</p><p className="mt-0.5 max-w-44 truncate text-xs text-[#78857b]">{user.email}</p></div>
              <DropdownMenu.Separator className="my-1 h-px bg-[#edf0e8]" />
              <DropdownMenu.Item asChild><Link className="block rounded-xl px-3 py-2 text-sm outline-none hover:bg-[#f2f3ec]" href="/profile">My Profile</Link></DropdownMenu.Item>
              <DropdownMenu.Item onSelect={(event) => { event.preventDefault(); void logout(); }} className="cursor-pointer rounded-xl px-3 py-2 text-sm text-[#a34d3e] outline-none hover:bg-[#fbefec]">Logout</DropdownMenu.Item>
            </DropdownMenu.Content></DropdownMenu.Portal>
          </DropdownMenu.Root> : <><Link href="/login" className="rounded-full px-4 py-2 text-[13px] font-bold text-[#40584a] hover:bg-[#edf0e7]">Log in</Link><Link href="/register" className="button-primary !px-4 !py-2.5">Join the library</Link></>}
        </div>
        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} className="grid size-10 place-items-center rounded-full border border-[#e4e7dd] bg-white md:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
      {open && <div className="border-t border-[#e6e8dc] bg-[#f8f7f1] px-5 py-4 md:hidden">
        <nav className="container-page flex flex-col gap-1" aria-label="Mobile navigation">
          {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="rounded-xl px-3 py-3 text-sm font-semibold text-[#506256] hover:bg-white">{link.label}</Link>)}
          {user ? <><Link href="/profile" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold hover:bg-white">My Profile · {user.name}</Link><button onClick={() => void logout()} className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#a34d3e] hover:bg-white">Logout</button></> : <div className="mt-2 grid grid-cols-2 gap-2"><Link onClick={() => setOpen(false)} href="/login" className="button-secondary">Log in</Link><Link onClick={() => setOpen(false)} href="/register" className="button-primary">Join</Link></div>}
        </nav>
      </div>}
    </header>
  );
}

function Avatar({ user }: { user: UserView }) {
  if (user.image) {
    // User-selected profile images can come from any host and are rendered directly by the browser.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt="" className="size-8 rounded-full object-cover" />;
  }
  return <span className="grid size-8 place-items-center rounded-full bg-[#e4efc5] text-xs font-bold text-[#244c3e]">{user.name.charAt(0).toUpperCase()}</span>;
}
