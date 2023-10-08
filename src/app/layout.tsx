import "./globals.css";
import type { Metadata } from "next";

import { Lato } from "next/font/google";
import { Providers } from "./providers";
import "react-datepicker/dist/react-datepicker.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Trinca Churras App",
  description: "Gerenciador de churrasco - por Vinícius Gonzalez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-[#FFD836]`}>
        <Providers>
          <div className="flex flex-col min-h-screen p-12">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
