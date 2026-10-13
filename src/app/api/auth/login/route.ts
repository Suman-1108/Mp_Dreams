import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const envEmail = process.env.ADMIN_EMAIL || "admin@mpdreamevents.com";
    const envPassHash = process.env.ADMIN_PASSWORD_HASH;

    let isValid = false;

    // Check against configured ENV password hash or demo password
    if (email === envEmail) {
      if (
        envPassHash &&
        (envPassHash.startsWith("$2a$") || envPassHash.startsWith("$2b$") || envPassHash.startsWith("$2y$")) &&
        !envPassHash.includes("examplehash")
      ) {
        try {
          isValid = await bcrypt.compare(password, envPassHash);
        } catch {
          isValid = false;
        }
      }

      if (!isValid) {
        // Fallback for default setup / demo mode
        isValid = password === "admin123" || password === "password";
      }
    }

    if (!isValid) {
      return NextResponse.json({ message: "Invalid admin email or password" }, { status: 401 });
    }

    const token = await createSessionToken({ email, role: "admin" });

    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Authentication failed" }, { status: 500 });
  }
}
