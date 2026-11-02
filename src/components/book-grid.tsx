import { BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";
import { BookCard } from "./book-card";

export function BookGrid({ books, emptyTitle = "No books here yet", emptyText = "Check back soon for new additions to the shelves." }: { books: Book[]; emptyTitle?: string; emptyText?: string }) {
  if (books.length === 0) return <div className="card-surface flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center"><span className="grid size-14 place-items-center rounded-2xl bg-[#eef1e5] text-[#41634c]"><BookOpen size={25} /></span><h2 className="font-display mt-5 text-2xl font-bold">{emptyTitle}</h2><p className="mt-2 max-w-md text-sm leading-6 text-[#748076]">{emptyText}</p></div>;
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{books.map((book) => <BookCard key={book._id} book={book} />)}</div>;
}
