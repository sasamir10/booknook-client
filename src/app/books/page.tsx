import type { Metadata } from "next";
import Link from "next/link";
import { BookGrid } from "@/components/book-grid";
import { PageHeading } from "@/components/page-heading";
import { hrefWithoutCategory } from "@/lib/books-query";
import { serverApiRequest } from "@/lib/server-api";
import { categories, type Book } from "@/lib/types";

export const metadata: Metadata = { title: "All Books" };

type BooksPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const requestedCategory = typeof params.category === "string" ? params.category : "";
  const selectedCategory = categories.find((category) => category === requestedCategory) ?? "";
  const search = typeof params.search === "string" ? params.search.trim().slice(0, 100) : "";
  const query = new URLSearchParams({ sort: "newest" });
  if (selectedCategory) query.set("category", selectedCategory);
  if (search) query.set("search", search);

  let books: Book[] = [];
  let failed = false;
  try { books = (await serverApiRequest<Book[]>(`/books?${query.toString()}`)).data ?? []; } catch { failed = true; }
  const clearCategoryHref = hrefWithoutCategory(params);

  return <section className="container-page section-pad min-h-[65vh]"><PageHeading eyebrow="The collection" title={selectedCategory ? `${selectedCategory} books` : "All books"} description={selectedCategory ? `Explore the ${selectedCategory} shelf, or adjust your search and category below.` : "A growing collection made by readers, for readers. Find a story that feels like yours."} />
    <div className="card-surface mb-8 p-4 sm:p-5">
    <form action="/books" method="get" className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end">
      <label className="block"><span className="form-label">Search books</span><input className="input-shell" type="search" name="search" maxLength={100} defaultValue={search} placeholder="Title or author" /></label>
      <label className="block"><span className="form-label">Category</span><select key={selectedCategory} className="input-shell" name="category" defaultValue={selectedCategory}><option value="">All categories</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
      <div><span className="form-label invisible" aria-hidden="true">Apply filters</span><button type="submit" className="button-primary">Apply filters</button></div>
    </form>
    {selectedCategory && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e6e8dc] pt-4"><p className="text-xs text-[#68776d]">Showing <span className="font-bold text-[#315d48]">{selectedCategory}</span>{search ? <> results matching <span className="font-bold text-[#315d48]">“{search}”</span></> : " books"}.</p><Link href={clearCategoryHref} className="button-secondary !px-4">Clear category</Link></div>}
    </div>
    {failed ? <div className="card-surface px-6 py-12 text-center"><h2 className="font-display text-2xl font-bold">The library is offline for a moment</h2><p className="mt-2 text-sm text-[#748076]">We couldn’t reach the book service. Please try again later.</p></div> : <BookGrid books={books} emptyTitle="A quiet shelf" emptyText="There are no books in the collection yet. Check back soon, or sign in to add one." />}
  </section>;
}
