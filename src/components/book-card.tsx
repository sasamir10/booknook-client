import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Book } from "@/lib/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e6e8dc] bg-[#fffefa] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#c5d1bc] hover:shadow-[0_18px_38px_-24px_rgba(31,59,44,.28)]">
      <Link href={`/books/${book._id}`} className="book-cover relative block">
        <Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw" unoptimized className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-[#fffefa]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.11em] text-[#385847] backdrop-blur">{book.category}</span>
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-display line-clamp-2 text-[21px] font-bold leading-tight">{book.title}</h3>
        <p className="mt-2 text-sm text-[#748076]">by {book.author}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="text-xs text-[#748076]">{book.availableCopies > 0 ? `${book.availableCopies} available` : "Currently out"}</span>
          <Link href={`/books/${book._id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315d48] hover:text-[#1e3d30]">View details <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </article>
  );
}
