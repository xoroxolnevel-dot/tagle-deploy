import { NextRequest, NextResponse } from "next/server";
import { env } from "@/utils/env";

export async function GET(request: NextRequest) {
  const rawTags = new URL(request.url).search.match(/[?&]tags=([^&]*)/)?.[1] ?? "all";
  const url = `https://${env.webUrl}/index.php?page=post&s=list&tags=${rawTags}`;
  return NextResponse.redirect(url);
}
