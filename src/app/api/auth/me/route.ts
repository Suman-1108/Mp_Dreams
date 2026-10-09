import { NextResponse } from "next/server";
import { COOKIE_NAME, getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session }, { status: 200 });
}

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
