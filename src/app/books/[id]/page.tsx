import type { Metadata } from "next";
import { BookDetail } from "@/components/book-detail";
import { requireSession } from "@/lib/server-session";
import { serverPrivateApiRequest } from "@/lib/server-api";
import type { Book } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const result = await serverPrivateApiRequest<Book>(`/books/${id}`);
    return { title: result.data?.title ?? "Book Details", description: result.data?.description ?? "Book details in the BookNook collection." };
  } catch { return { title: "Book Details" }; }
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireSession(`/books/${id}`);
  const user = { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image };
  return <BookDetail id={id} user={user} />;
}
