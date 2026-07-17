import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  /*
   * getClaims() verifies the authentication token and refreshes the
   * session cookies when necessary.
   *
   * Keep this call immediately after creating the Supabase client.
   */
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims;

  const isLoggedIn = Boolean(claims);

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = pathname.startsWith("/dashboard");

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // Block unauthenticated visitors from protected pages.
  if (!isLoggedIn && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/login";

    // Remember where the user originally wanted to go.
    redirectUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // Prevent authenticated users from returning to login or signup.
  if (isLoggedIn && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";

    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}