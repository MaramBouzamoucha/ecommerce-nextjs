// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // Récupérer le token JWT de la session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // URL de la requête
  const { pathname } = request.nextUrl;

  // ===============================================
  // Routes protégées : utilisateur connecté requis
  // ===============================================
  const protectedRoutes = ["/cart", "/orders", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ===============================================
  // Routes admin : rôle ADMIN requis
  // ===============================================
  const adminRoutes = ["/admin"];
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminRoute) {
    // Non connecté -> redirection login
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Connecté mais pas admin -> page non autorisée
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // ===============================================
  // Routes auth : rediriger si déjà connecté
  // ===============================================
  const authRoutes = ["/auth/login", "/auth/register"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continuer la requête normalement
  return NextResponse.next();
}

// Configuration : sur quelles routes le middleware s'exécute
export const config = {
  matcher: [
    /*
    * Match toutes les routes sauf :
    * - api (pas les routes API)
    * - _next/static (fichiers statiques)
    * - _next/image (optimisation images)
    * - favicon.ico
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
