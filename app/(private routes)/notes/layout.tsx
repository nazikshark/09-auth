import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "Manage your notes effectively",
  openGraph: {
    title: "Notes App",
    description: "Manage your notes effectively",
    url: "https://notes-app.vercel.app",
    images: [{ url: "https://notes-app.vercel.app/og-image.png" }],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}