"use client";

import Image from "next/image";
import { BookOpen, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import type { Book, UserView } from "@/lib/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { BookEditor } from "./book-editor";

export function MyBooks({ user }: { user: UserView }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let cancelled = false;
    apiRequest<Book[]>("/books?mine=true").then((result) => { if (!cancelled) setBooks(result.data ?? []); })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof Error ? reason.message : "Could not load your books."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function removeBook() {
    if (!deleting) return;
    setBusy(true);
    try {
      const result = await apiRequest<void>(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((current) => current.filter((book) => book._id !== deleting._id));
      toast.success(result.message ?? "Book removed."); setDeleting(null);
    } catch (reason) { toast.error(reason instanceof Error ? reason.message : "Could not delete this book."); }
    finally { setBusy(false); }
  }

  if (loading) return <LoadingBlock text="Finding your books…" />;
  if (error) return <MessageBlock title="Your books are out of reach" text={error} />;
  return <>
    {books.length === 0 ? <div className="card-surface flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center"><span className="grid size-14 place-items-center rounded-2xl bg-[#eef1e5] text-[#41634c]"><BookOpen size={25} /></span><h2 className="font-display mt-5 text-2xl font-bold">Your shelf is waiting</h2><p className="mt-2 max-w-md text-sm leading-6 text-[#748076]">Books you add to the library will appear here. Share a title to help another reader find it.</p><Link href="/add-book" className="button-primary mt-5"><Plus size={15} /> Add your first book</Link></div> : <div className="grid gap-4">{books.map((book) => <article key={book._id} className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"><div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#e6e9df] sm:aspect-[4/5] sm:w-[104px]"><Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="104px" unoptimized className="object-cover" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#eaf0df] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#45644d]">{book.category}</span><span className="text-xs text-[#809087]">{book.availableCopies} of {book.totalCopies} available</span></div><h2 className="font-display mt-2 truncate text-2xl font-bold">{book.title}</h2><p className="mt-1 text-sm text-[#748076]">by {book.author}</p></div><div className="flex gap-2 sm:justify-end"><button onClick={() => setEditing(book)} className="button-secondary !px-4"><Pencil size={14} /> Edit</button><button onClick={() => setDeleting(book)} className="button-secondary !border-[#ead4cf] !text-[#a24f41] hover:!bg-[#fbefec]"><Trash2 size={14} /> Delete</button></div></article>)}</div>}
    <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}><DialogContent className="!w-[min(760px,calc(100%-28px))]"><p className="eyebrow">Keep the shelf current</p><DialogTitle className="mb-6 mt-2 pr-7">Edit book details</DialogTitle>{editing && <BookEditor user={user} book={editing} onSaved={(updated) => { if (updated) setBooks((current) => current.map((book) => book._id === updated._id ? updated : book)); setEditing(null); }} />}</DialogContent></Dialog>
    <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}><DialogContent><p className="eyebrow">Remove from the library</p><DialogTitle className="mt-2 pr-7">Delete this book?</DialogTitle><DialogDescription className="mt-3">You’re about to remove <strong>{deleting?.title}</strong>. This can’t be undone. Books with active loans can’t be deleted.</DialogDescription><div className="mt-7 flex justify-end gap-2"><button onClick={() => setDeleting(null)} className="button-secondary">Cancel</button><button disabled={busy} onClick={() => void removeBook()} className="button-primary !border-[#a34d3e] !bg-[#a34d3e] hover:!bg-[#883c31]">{busy && <LoaderCircle size={14} className="animate-spin" />}Delete book</button></div></DialogContent></Dialog>
  </>;
}

export function LoadingBlock({ text }: { text: string }) { return <div className="card-surface flex min-h-56 items-center justify-center gap-3 text-sm text-[#68776d]"><LoaderCircle size={18} className="animate-spin text-[#315d48]" />{text}</div>; }
export function MessageBlock({ title, text }: { title: string; text: string }) { return <div className="card-surface px-6 py-12 text-center"><h2 className="font-display text-2xl font-bold">{title}</h2><p className="mt-2 text-sm text-[#748076]">{text}</p></div>; }
