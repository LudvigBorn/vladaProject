import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { siteContentSchema } from "@/lib/content-schema";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = siteContentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректные данные", issues: parsed.error.issues }, { status: 400 });
  }

  await saveContent(parsed.data);
  return NextResponse.json({ ok: true });
}
