import { NextRequest, NextResponse } from "next/server";
import { env } from "@/utils/env";

export async function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.get("tags") ?? "all";
  const url = `https://${env.webUrl}/index.php?page=post&s=list&tags=${tags}`;
  return NextResponse.redirect(url);
}
