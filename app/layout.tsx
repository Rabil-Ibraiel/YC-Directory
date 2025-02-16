import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "react-hot-toast";
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YC Directory",
  description: "A platform for turning ideas into reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-work-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
