import "./global.css";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

export const metadata = {
  title: "Notes App",
  description: "Next.js Notes Application",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <main>{children}</main>
            {modal}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}