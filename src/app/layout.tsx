import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

// const inter = Inter({ subsets: ['latin']});

export const metadata: Metadata = {
  title: "Joki By Dante",
  description: "Your No. 1 Joki Management System",
};

const poppins = Poppins ({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={poppins.variable}>{children}</body>
    </html>
  );
}