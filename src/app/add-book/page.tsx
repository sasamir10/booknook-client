import type { Metadata } from "next";
import { BookEditor } from "@/components/book-editor";
import { PageHeading } from "@/components/page-heading";
import { requireSession } from "@/lib/server-session";

export const metadata: Metadata = { title: "Add Book" };
export const dynamic = "force-dynamic";
export default async function AddBookPage() {
  const session = await requireSession("/add-book");
  const user = { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image };
  return <section className="container-page section-pad min-h-[65vh]"><PageHeading eyebrow="Grow the collection" title="Add a book" description="Share a title you love and help it find its next reader." /><div className="mx-auto max-w-3xl"><BookEditor user={user} /></div></section>;
}
