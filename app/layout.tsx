import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./global.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import App from "../components/App/App";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "Auth and Notes application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <App>
            <div className="wrapper">
              <Header />
              <main className="main">{children}</main>
              <Footer />
            </div>
          </App>
        </TanStackProvider>
      </body>
    </html>
  );
}