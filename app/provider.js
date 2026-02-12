// app/providers.js
"use client";

/*
Composant Client qui fournit le contexte de session
- Nécessaire car SessionProvider utilise le Context React côté client
*/

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
