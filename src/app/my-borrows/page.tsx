import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { MyBorrows } from "@/components/my-borrows";
import { requireSession } from "@/lib/server-session";

export const metadata: Metadata = { title: "My Borrows" };
export const dynamic = "force-dynamic";
export default async function MyBorrowsPage() {
  await requireSession("/my-borrows");
  return <section className="container-page section-pad min-h-[65vh]"><PageHeading eyebrow="Your current reads" title="My borrows" description="Keep an eye on your due dates, and return a book when you’re ready to pass it along." /><MyBorrows /></section>;
}
