import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // lightweight JWT lib

// Secret must match your backend JWT secret
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Auth-only routes (redirect logged-in users away)
const authRoutes = ["/signin", "/signup", "/forgotpassword"];

// Fully protected routes (require login)
const protectedRoutes = ["/myaccount", "/attendance"];

// Helper: verify JWT
async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload; // contains { id, role }
  } catch (err) {
    return null;
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get JWT cookie
  const token = req.cookies.get("jwt")?.value;
  const user = token ? await verifyJWT(token) : null;

  // 1. If logged in → block access to auth routes (signin/signup/etc.)
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. If NOT logged in → block protected routes (but NOT dashboard)
  if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 3. Role-based check → attendance only for teachers
  if (pathname.startsWith("/attendance")) {
    if (!user || user.role !== "teacher") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ✅ Dashboard is accessible to both public and logged-in users
  return NextResponse.next();
}

// Match routes we care about
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/forgotpassword",
    "/dashboard", // public + logged-in
    "/myaccount",
    "/attendance"
  ],
};