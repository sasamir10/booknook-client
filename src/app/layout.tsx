import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getSession } from "@/lib/server-session";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "BookNook | A Small Online Library", template: "BookNook | %s" },
  description: "Find a book to love, share the ones you have, and borrow your next read with BookNook.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let user = null;
  try {
    const session = await getSession();
    if (session?.user) user = { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image };
  } catch {
    // The page remains useful without auth configuration; protected flows explain missing setup when used.
  }
  return <html lang="en"><body><Navbar user={user} /><main>{children}</main><Footer /><Toaster position="top-right" richColors closeButton /></body></html>;
}
