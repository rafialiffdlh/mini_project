/** @format */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { UserRoles } from "./interfaces/user.interface";
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;
  console.log("middleware", user);
  if (user?.id && (pathname === "/sign-in" || pathname === "/sign-up")) {
    console.log(
      UserRoles[Number(user?.user_role)],
      UserRoles[Number(user?.user_role)] === "Organizer"
    );
    if (UserRoles[Number(user?.user_role)] === "Organizer") {
      return NextResponse.redirect(new URL("/e", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
  if ((user?.id && pathname.includes("/e/")) || pathname.endsWith("/e")) {
    if (UserRoles[Number(user?.user_role)] !== "Organizer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (
    !user &&
    (pathname.includes("/purchases/") || pathname.endsWith("/purchases"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "/sign-up", "/e/:path*", "/purchases/:path*"],
};
