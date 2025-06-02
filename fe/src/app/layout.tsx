import type { Metadata } from "next";
import "../styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
// import "../styles/theme.css";
import { PrimeReactProvider } from "primereact/api";

export const metadata: Metadata = {
  title: "",
  description: "Health app by nerdware",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
