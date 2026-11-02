import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { MyBooks } from "@/components/my-books";
import { requireSession } from "@/lib/server-session";

export const metadata: Metadata = { title: "My Books" };
export const dynamic = "force-dynamic";
export default async function MyBooksPage() {
  const session = await requireSession("/my-books");
  const user = { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image };
  return <section className="container-page section-pad min-h-[65vh]"><PageHeading eyebrow="Your contributions" title="My books" description="Keep the titles you’ve shared up to date. Books with active loans stay on the shelf until they’re returned." /><MyBooks user={user} /></section>;
}
