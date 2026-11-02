import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { requireSession } from "@/lib/server-session";

export const metadata: Metadata = { title: "My Profile" };
export const dynamic = "force-dynamic";
export default async function ProfilePage() {
  const session = await requireSession("/profile");
  return <section className="container-page section-pad min-h-[65vh]"><PageHeading eyebrow="Your account" title="My profile" description="The details connected to your BookNook account." />
    <article className="card-surface flex max-w-2xl flex-col items-center gap-6 p-7 sm:flex-row sm:p-9">{session.user.image ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={session.user.image} width={96} height={96} alt="Profile" className="size-24 rounded-full object-cover" />
    ) : <span className="grid size-24 place-items-center rounded-full bg-[#e5edd2] text-[#315d48]"><UserRound size={34} /></span>}<div className="text-center sm:text-left"><p className="eyebrow">Reader</p><h2 className="font-display mt-1 text-3xl font-bold">{session.user.name}</h2><p className="mt-2 text-sm text-[#6b796e]">{session.user.email}</p></div></article>
  </section>;
}
