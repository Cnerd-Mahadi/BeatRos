import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SoundWave - Premium Audio Equipment",
	description:
		"Experience the ultimate audio quality with our premium headphones and earbuds. Designed for comfort and performance.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ClientProviders>
					<TooltipProvider>
						<Toaster />
						<Sonner />
						{children}
					</TooltipProvider>
				</ClientProviders>
			</body>
		</html>
	);
}
