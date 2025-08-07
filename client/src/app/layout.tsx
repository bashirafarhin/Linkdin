import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import StoreProvider from "@/lib/providers/StoreProvider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/lib/providers/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LinkedIn",
  description: "Connect with professionals and grow your network.",
  icons: {
    icon: "/linkdinLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex items-center flex-col justify-between min-h-screen font-sans antialiased`}
      >
        <Toaster />
        <StoreProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
