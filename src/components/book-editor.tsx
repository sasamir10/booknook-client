"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { bookSchema, type BookFormValues } from "@/lib/validators";
import { categories, type Book, type UserView } from "@/lib/types";
import { CoverUpload } from "./cover-upload";

export function BookEditor({ user, book, onSaved }: { user: UserView; book?: Book; onSaved?: (book: Book | undefined) => void }) {
  const router = useRouter();
  const [image, setImage] = useState(book?.image ?? "");
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: book ? { title: book.title, author: book.author, category: book.category, description: book.description, totalCopies: book.totalCopies } : { title: "", author: "", category: "Fiction", description: "", totalCopies: 1 },
  });

  async function save(values: BookFormValues) {
    if (!image) { toast.error("Upload a book cover before saving."); return; }
    setBusy(true);
    try {
      const payload = { ...values, image };
      const result = book
        ? await apiRequest<Book>(`/books/${book._id}`, { method: "PATCH", body: JSON.stringify(payload) })
        : await apiRequest<Book>("/books", { method: "POST", body: JSON.stringify(payload) });
      toast.success(result.message ?? (book ? "Book updated." : "Book added to the library."));
      if (onSaved) onSaved(result.data);
      else { router.push("/my-books"); router.refresh(); }
    } catch (error) { toast.error(error instanceof Error ? error.message : "The book could not be saved."); }
    finally { setBusy(false); }
  }

  return <form onSubmit={handleSubmit(save)} className="card-surface space-y-6 p-5 sm:p-8" noValidate>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Book title" error={errors.title?.message}><input className="input-shell" placeholder="The title on the cover" {...register("title")} /></Field>
      <Field label="Author name" error={errors.author?.message}><input className="input-shell" placeholder="Who wrote it?" {...register("author")} /></Field>
      <Field label="Category" error={errors.category?.message}><select className="input-shell" {...register("category")}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
      <Field label="Total copies" error={errors.totalCopies?.message}><input type="number" min={1} max={10000} className="input-shell" {...register("totalCopies", { valueAsNumber: true })} /></Field>
    </div>
    <Field label="Book cover"><CoverUpload value={image} onChange={setImage} /></Field>
    <Field label="Short description" error={errors.description?.message}><textarea rows={4} className="input-shell resize-y" placeholder="What makes this book worth a read?" {...register("description")} /></Field>
    <div className="grid gap-4 rounded-2xl bg-[#f2f4ec] p-4 sm:grid-cols-2"><div><span className="form-label">Added by</span><p className="text-sm font-semibold text-[#496051]">{user.name}</p></div><div><span className="form-label">Reader email</span><p className="truncate text-sm font-semibold text-[#496051]">{user.email}</p></div></div>
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e9ece4] pt-5"><p className="max-w-sm text-xs leading-5 text-[#7f8a80]">Your name and email are filled from your verified BookNook account.</p><button disabled={busy} className="button-primary min-w-40">{busy && <LoaderCircle size={15} className="animate-spin" />}{busy ? "Saving…" : book ? "Save changes" : "Add to the library"}</button></div>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block"><span className="form-label">{label}</span>{children}{error && <span className="form-error block">{error}</span>}</label>; }
