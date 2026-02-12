import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Header from "../app/components/Header";
import Providers from "../app/provider";

/* ==============================
   Police principale : Inter
================================= */
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // évite le FOUT
  variable: "--font-inter", // variable CSS pour Tailwind
});

/* ==============================
   Police secondaire : Poppins
================================= */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-poppins",
});

/* ==============================
   Metadata SEO
================================= */
export const metadata = {
  title: "My Shop - E-commerce Next.js",
  description:
    "Boutique en ligne avec Next.js, authentification et performances optimisées.",
};

/* ==============================
   Root Layout
================================= */
export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="font-sans">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}