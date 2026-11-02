import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, HeartHandshake, LibraryBig } from "lucide-react";
import { BookGrid } from "@/components/book-grid";
import { HeroSlider } from "@/components/hero-slider";
import { serverApiRequest } from "@/lib/server-api";
import type { Book } from "@/lib/types";

export const metadata: Metadata = { title: "Home" };

const categoryCards = [
  { title: "Fiction", note: "Worlds just beyond this one", color: "bg-[#e9eee1]", mark: "01" },
  { title: "Science", note: "Big ideas, clear questions", color: "bg-[#e5ecec]", mark: "02" },
  { title: "History", note: "The past, more closely", color: "bg-[#f1e9df]", mark: "03" },
  { title: "Kids", note: "Stories for growing minds", color: "bg-[#f1eedc]", mark: "04" },
  { title: "Others", note: "A shelf for the unexpected", color: "bg-[#e9e5ee]", mark: "05" },
];

async function getArrivals(): Promise<{ books: Book[]; failed: boolean }> {
  try {
    const result = await serverApiRequest<Book[]>("/books?limit=6&sort=newest");
    return { books: result.data ?? [], failed: false };
  } catch {
    return { books: [], failed: true };
  }
}

export default async function HomePage() {
  const { books, failed } = await getArrivals();
  return <>
    <HeroSlider />
    <section className="section-pad container-page">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div className="max-w-xl"><p className="eyebrow">Fresh on the shelf</p><h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">New arrivals</h2><p className="mt-3 text-sm leading-6 text-[#68776d]">Recently added reads from our little community of book lovers.</p></div><Link href="/books" className="button-secondary">See all books <ArrowRight size={15} /></Link></div>
      {failed ? <div className="card-surface px-6 py-12 text-center"><p className="font-display text-2xl font-bold">The shelves are taking a moment.</p><p className="mt-2 text-sm text-[#748076]">We couldn’t reach the library service. Please try again shortly.</p></div> : <BookGrid books={books} emptyTitle="The first shelf is waiting" emptyText="No books have been added yet. Join the library and bring the first story to the collection." />}
      <div className="mt-8 text-center"><Link href="/books" className="button-primary">Explore the full collection <ArrowRight size={15} /></Link></div>
    </section>
    <section className="border-y border-[#e5e8de] bg-[#f0f1e9]">
      <div className="container-page section-pad"><div className="mx-auto mb-12 max-w-xl text-center"><p className="eyebrow">Easy as turning a page</p><h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">How borrowing works</h2><p className="mt-4 text-sm leading-6 text-[#68776d]">Good books are better when they travel. Here’s how to keep them moving.</p></div>
        <div className="grid gap-4 md:grid-cols-3">{[
          { n: "01", title: "Find your next read", body: "Explore the shelves and open a book’s details to see if a copy is ready.", icon: <LibraryBig size={21} /> },
          { n: "02", title: "Borrow a book", body: "Confirm your loan and settle in. Your return date is shown in My Borrows.", icon: <Clock3 size={21} /> },
          { n: "03", title: "Pass it along", body: "Return the book when you’re done, making room for another curious reader.", icon: <HeartHandshake size={21} /> },
        ].map((item) => <article key={item.n} className="rounded-[22px] border border-[#e0e4d8] bg-[#fffefa] p-7"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-[#e5edd2] text-[#335743]">{item.icon}</span><span className="font-display text-3xl text-[#b6c1ad]">{item.n}</span></div><h3 className="font-display mt-7 text-2xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#748076]">{item.body}</p></article>)}</div>
      </div>
    </section>
    <section className="section-pad container-page"><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Pick a path</p><h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Explore by mood</h2></div><Link href="/books" className="inline-flex items-center gap-2 text-sm font-bold text-[#315d48]">All books <ArrowRight size={15} /></Link></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{categoryCards.map((card) => <Link key={card.title} href="/books" className={`${card.color} group rounded-[20px] p-5 transition hover:-translate-y-1`}><span className="text-[10px] font-bold tracking-[.16em] text-[#7b887b]">SHELF {card.mark}</span><h3 className="font-display mt-8 text-2xl font-bold">{card.title}</h3><p className="mt-2 text-xs text-[#6f7b70]">{card.note}</p><span className="mt-6 grid size-8 place-items-center rounded-full bg-white/70 text-[#315d48] transition group-hover:translate-x-1"><ArrowRight size={15} /></span></Link>)}</div>
    </section>
    <section className="container-page pb-20"><div className="relative overflow-hidden rounded-[28px] bg-[#244c3e] px-7 py-11 text-white sm:px-12 sm:py-14"><div className="absolute -right-6 -top-16 size-64 rounded-full border border-white/10" /><div className="absolute -right-1 top-0 size-44 rounded-full border border-white/10" /><div className="relative max-w-2xl"><p className="eyebrow !text-[#dce9b8]">Make room on the shelf</p><h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">A book shared is a story multiplied.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/75">Add a title you love and let it find its next reader. Every contribution makes this little library more interesting.</p><Link href="/add-book" className="button-primary mt-6 !border-[#dce9b8] !bg-[#dce9b8] !text-[#1d3c31] hover:!bg-[#c8dda0]">Add a book <BookOpen size={16} /></Link></div></div></section>
  </>;
}
