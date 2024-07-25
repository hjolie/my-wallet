import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const roboto = Roboto({ weight: ["400", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "My Wallet",
    description: "Income/Expense Tracker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Header />
                <main className="container">{children}</main>
            </body>
        </html>
    );
}
