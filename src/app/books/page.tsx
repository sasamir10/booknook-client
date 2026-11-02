import type { Metadata } from "next";
import { BookGrid } from "@/components/book-grid";
import { PageHeading } from "@/components/page-heading";
import { serverApiRequest } from "@/lib/server-api";
import type { Book } from "@/lib/types";

export const metadata: Metadata = { title: "All Books" };

export default async function BooksPage() {
  let books: Book[] = [];
  let failed = false;
  try { books = (await serverApiRequest<Book[]>("/books?sort=newest")).data ?? []; } catch { failed = true; }
  return <section className="container-page section-pad min-h-[65vh]"><PageHeading eyebrow="The collection" title="All books" description="A growing collection made by readers, for readers. Find a story that feels like yours." />
    {failed ? <div className="card-surface px-6 py-12 text-center"><h2 className="font-display text-2xl font-bold">The library is offline for a moment</h2><p className="mt-2 text-sm text-[#748076]">We couldn’t reach the book service. Please try again later.</p></div> : <BookGrid books={books} emptyTitle="A quiet shelf" emptyText="There are no books in the collection yet. Check back soon, or sign in to add one." />}
  </section>;
}
