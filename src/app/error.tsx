"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("BookNook page error:", error); }, [error]);
  return <section className="container-page grid min-h-[55vh] place-items-center py-16"><div className="card-surface max-w-lg p-8 text-center"><p className="eyebrow">A small interruption</p><h1 className="font-display mt-3 text-4xl font-bold">This page needs another moment.</h1><p className="mt-3 text-sm leading-6 text-[#68776d]">Your books are safe. Try loading this page again.</p><button onClick={() => reset()} className="button-primary mt-6"><RotateCcw size={15} /> Try again</button></div></section>;
}
