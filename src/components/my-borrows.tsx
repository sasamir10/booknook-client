"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarDays, Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import type { Borrow } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { LoadingBlock, MessageBlock } from "./my-books";

export function MyBorrows() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  useEffect(() => {
    let cancelled = false;
    apiRequest<Borrow[]>("/borrows").then((result) => { if (!cancelled) setBorrows(result.data ?? []); })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof Error ? reason.message : "Could not load your borrows."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function returnBook(borrow: Borrow) {
    setBusyId(borrow._id);
    try {
      const result = await apiRequest<void>(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((current) => current.filter((item) => item._id !== borrow._id));
      toast.success(result.message ?? "Book returned. Thank you!");
    } catch (reason) { toast.error(reason instanceof Error ? reason.message : "Could not return this book."); }
    finally { setBusyId(""); }
  }

  if (loading) return <LoadingBlock text="Finding your borrowed books…" />;
  if (error) return <MessageBlock title="Your reading list is out of reach" text={error} />;
  if (!borrows.length) return <div className="card-surface flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center"><span className="grid size-14 place-items-center rounded-2xl bg-[#eef1e5] text-[#41634c]"><BookOpen size={25} /></span><h2 className="font-display mt-5 text-2xl font-bold">Nothing borrowed just yet</h2><p className="mt-2 max-w-md text-sm leading-6 text-[#748076]">When you borrow a book, it will show up here with its due date.</p><Link href="/books" className="button-primary mt-5">Browse the shelves <ArrowUpRight size={15} /></Link></div>;

  return <div className="grid gap-4">{borrows.map((borrow) => <article key={borrow._id} className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"><div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#e6e9df] sm:aspect-[4/5] sm:w-[100px]"><Image src={borrow.bookImage} alt={`Cover of ${borrow.bookTitle}`} fill sizes="100px" unoptimized className="object-cover" /></div><div className="min-w-0 flex-1"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf0df] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#45644d]"><BookOpen size={12} /> On loan</span><h2 className="font-display mt-2 truncate text-2xl font-bold">{borrow.bookTitle}</h2><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#748076]"><span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> Borrowed {formatDate(borrow.borrowDate)}</span><span className="inline-flex items-center gap-1.5"><Check size={13} /> Due {formatDate(borrow.returnDate)}</span></div></div><button disabled={busyId === borrow._id} onClick={() => void returnBook(borrow)} className="button-secondary shrink-0 !border-[#c7d5c4] !text-[#315d48]">{busyId === borrow._id ? <LoaderCircle size={14} className="animate-spin" /> : <Check size={14} />}Return book</button></article>)}</div>;
}
