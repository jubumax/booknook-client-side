import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ToastProvider from "@/components/providers/ToastProvider";
import { SITE, THEME_KEY, THEMES } from "@/lib/constants";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: `${SITE.name}`,
    template: `${SITE.name} | %s`,        // In page -- title: "All Books" > "BookNook | All Books"
  },
  description: SITE.description,
};

const themeInit = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"${THEMES.dark}":"${THEMES.light}"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>

        <Suspense
          fallback={<div className="h-16 border-b border-base-300/70" />}
        >
          <Navbar />
        </Suspense>

        <main className="flex-1">
          
          {children}

          </main>

          <Footer />

        <ToastProvider />
      </body>
    </html>
  );
}