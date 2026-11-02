import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata: Metadata = { title: "Not Found" };

export default function NotFound() {
  return <section className="container-page grid min-h-[65vh] place-items-center py-20"><div className="max-w-lg text-center"><span className="mx-auto grid size-16 place-items-center rounded-[20px] bg-[#e8eddc] text-[#315d48]"><BookOpen size={28} /></span><p className="eyebrow mt-7">404 · Lost between the pages</p><h1 className="font-display mt-3 text-5xl font-bold">This page isn’t on our shelf.</h1><p className="mt-4 text-sm leading-7 text-[#68776d]">The page may have moved, or the link may have wandered off. Let’s take you back to the library.</p><Link href="/" className="button-primary mt-7"><ArrowLeft size={15} /> Back to Home</Link></div></section>;
}
