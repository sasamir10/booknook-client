"use client";

import Image from "next/image";
import { ArrowLeft, BookOpen, CalendarDays, LoaderCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Book, UserView } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";

export function BookDetail({ id, user }: { id: string; user: UserView }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    apiRequest<Book>(`/books/${id}`).then((result) => { if (!cancelled && result.data) setBook(result.data); })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof Error ? reason.message : "Could not load this book."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="container-page flex min-h-[65vh] items-center justify-center"><LoaderCircle className="animate-spin text-[#315d48]" /> <span className="ml-3 text-sm text-[#6b796e]">Opening book details…</span></div>;
  if (error || !book) return <section className="container-page grid min-h-[60vh] place-items-center py-16"><div className="card-surface max-w-xl p-8 text-center"><h1 className="font-display text-3xl font-bold">We couldn’t find this book</h1><p className="mt-3 text-sm text-[#68776d]">{error || "The book may have been removed from the library."}</p><Link href="/books" className="button-primary mt-6"><ArrowLeft size={15} /> Back to all books</Link></div></section>;

  return <section className="container-page section-pad min-h-[65vh]">
    <Link href="/books" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#617066] hover:text-[#244c3e]"><ArrowLeft size={15} /> All books</Link>
    <div className="grid items-start gap-9 lg:grid-cols-[minmax(260px,.75fr)_1.25fr] lg:gap-16">
      <div className="mx-auto w-full max-w-[420px]"><div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#e4e8db] shadow-[0_24px_55px_-35px_rgba(24,56,45,.5)]"><Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="(max-width:1024px) 90vw, 35vw" priority unoptimized className="object-cover" /></div></div>
      <div className="pt-2"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#e7eddc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#3d624a]">{book.category}</span><span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#748076]">Added {formatDate(book.createdAt)}</span></div>
        <h1 className="font-display mt-5 text-4xl font-bold leading-tight sm:text-6xl">{book.title}</h1><p className="mt-3 text-lg text-[#6d7b70]">by {book.author}</p>
        <div className="my-8 h-px bg-[#e3e7dd]" /><p className="eyebrow">About this book</p><p className="mt-3 max-w-2xl whitespace-pre-line text-[15px] leading-8 text-[#59695e]">{book.description}</p>
        <div className="mt-8 grid max-w-xl grid-cols-2 gap-3"><div className="rounded-2xl border border-[#e6e8dc] bg-white/70 p-4"><p className="text-xs text-[#829087]">Total copies</p><p className="font-display mt-1 text-2xl font-bold">{book.totalCopies}</p></div><div className="rounded-2xl border border-[#e6e8dc] bg-white/70 p-4"><p className="text-xs text-[#829087]">Available now</p><p className="font-display mt-1 text-2xl font-bold">{book.availableCopies}</p></div></div>
        <div className="mt-7 flex items-center gap-3 rounded-2xl bg-[#eff2e9] p-4"><span className="grid size-10 place-items-center rounded-full bg-white text-[#426249]"><BookOpen size={18} /></span><div><p className="text-xs text-[#829087]">Shared by</p><p className="mt-0.5 text-sm font-bold">{book.addedByName}</p></div></div>
        <BorrowDialog book={book} user={user} onBorrowed={(next) => setBook(next)} />
        <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#849086]"><ShieldCheck size={15} className="mt-0.5 shrink-0" />Your return date will be shown in My Borrows.</div>
      </div>
    </div>
  </section>;
}

function BorrowDialog({ book, user, onBorrowed }: { book: Book; user: UserView; onBorrowed: (book: Book) => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  async function confirm() {
    setBusy(true);
    try {
      await apiRequest("/borrows", { method: "POST", body: JSON.stringify({ bookId: book._id }) });
      const current = await apiRequest<Book>(`/books/${book._id}`);
      if (current.data) onBorrowed(current.data);
      toast.success("Book borrowed. Enjoy your reading!");
      setOpen(false);
    } catch (error) { toast.error(error instanceof Error ? error.message : "The book could not be borrowed."); }
    finally { setBusy(false); }
  }
  return <div className="mt-8"><button disabled={book.availableCopies < 1} onClick={() => setOpen(true)} className="button-primary min-w-48 !py-3.5 disabled:cursor-not-allowed">{book.availableCopies > 0 ? "Borrow this book" : "Not available"}</button>{book.availableCopies < 1 && <p className="mt-2 text-sm font-semibold text-[#a34d3e]">Not available right now</p>}
    <Dialog open={open} onOpenChange={setOpen}><DialogContent>
      <p className="eyebrow">Take a book along</p><DialogTitle className="mt-2 pr-7">Confirm your borrow</DialogTitle><DialogDescription className="mt-2">We’ll hold <strong>{book.title}</strong> for you. Your due date will appear in My Borrows.</DialogDescription>
      <div className="mt-6 grid gap-4 rounded-2xl bg-[#f1f3eb] p-4"><div><span className="form-label">Reader</span><p className="text-sm font-semibold">{user.name}</p></div><div><span className="form-label">Email</span><p className="truncate text-sm font-semibold">{user.email}</p></div><div className="flex items-center gap-2 text-xs text-[#6b796e]"><CalendarDays size={15} />Your return date will be shown after confirmation</div></div>
      <div className="mt-6 flex justify-end gap-2"><button onClick={() => setOpen(false)} className="button-secondary">Cancel</button><button disabled={busy || book.availableCopies < 1} onClick={() => void confirm()} className="button-primary">{busy && <LoaderCircle size={14} className="animate-spin" />}{busy ? "Borrowing…" : "Confirm borrow"}</button></div>
    </DialogContent></Dialog>
  </div>;
}
