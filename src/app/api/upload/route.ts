import { NextResponse } from "next/server";
import { getSession, assertAuthEnvironment } from "@/lib/server-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertAuthEnvironment();
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Sign in to upload a cover." }, { status: 401 });
    const key = process.env.IMGBB_API_KEY;
    if (!key) return NextResponse.json({ message: "Image uploading is not configured. Add IMGBB_API_KEY to the client server environment." }, { status: 503 });
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File)) return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
    const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
    if (!acceptedTypes.has(file.type)) return NextResponse.json({ message: "Choose a JPG, PNG, WebP, or GIF image." }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ message: "Cover images must be 5 MB or smaller." }, { status: 400 });

    const providerForm = new FormData();
    providerForm.set("image", Buffer.from(await file.arrayBuffer()).toString("base64"));
    const upload = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, { method: "POST", body: providerForm, cache: "no-store" });
    const payload = await upload.json() as { success?: boolean; data?: { display_url?: string }; error?: { message?: string } };
    if (!upload.ok || !payload.success || !payload.data?.display_url) {
      return NextResponse.json({ message: payload.error?.message ?? "The image host could not save this cover." }, { status: 502 });
    }
    return NextResponse.json({ url: payload.data.display_url });
  } catch {
    return NextResponse.json({ message: "The cover could not be uploaded. Please try again." }, { status: 500 });
  }
}
