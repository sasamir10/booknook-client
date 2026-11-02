"use client";

import Image from "next/image";
import { ImagePlus, LoaderCircle, UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CoverUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function upload(file?: File) {
    if (!file) return;
    const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
    if (!acceptedTypes.has(file.type) || file.size > 5 * 1024 * 1024) { toast.error("Choose a JPG, PNG, WebP, or GIF image up to 5 MB."); return; }
    const form = new FormData(); form.set("image", file);
    setBusy(true);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: form });
      const result = await response.json() as { url?: string; message?: string };
      if (!response.ok || !result.url) throw new Error(result.message ?? "Image upload failed.");
      onChange(result.url); toast.success("Cover image uploaded.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Image upload failed."); }
    finally { setBusy(false); }
  }
  return <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-[#cbd4c8] bg-[#f6f7f1] text-[#718277]">
      {value ? <Image src={value} alt="Uploaded book cover preview" width={96} height={96} unoptimized className="size-full object-cover" /> : busy ? <LoaderCircle className="animate-spin" /> : <ImagePlus size={24} />}
    </div>
    <label className="flex min-h-24 flex-1 cursor-pointer flex-col items-start justify-center rounded-xl border border-dashed border-[#cbd4c8] bg-[#fbfcf8] px-4 py-3 transition hover:border-[#8ba493] hover:bg-[#f4f7ef]">
      <span className="flex items-center gap-2 text-sm font-bold text-[#355746]">{busy ? <LoaderCircle size={16} className="animate-spin" /> : <UploadCloud size={16} />}{busy ? "Uploading cover…" : value ? "Choose a different cover" : "Upload a book cover"}</span>
      <span className="mt-1 text-xs text-[#839087]">JPG, PNG, WebP or GIF · up to 5 MB</span>
      <input disabled={busy} type="file" accept="image/*" className="sr-only" onChange={(event) => { void upload(event.target.files?.[0]); event.currentTarget.value = ""; }} />
    </label>
  </div>;
}
