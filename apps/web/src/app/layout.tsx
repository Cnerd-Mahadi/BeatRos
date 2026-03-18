import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
	weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "BeatRos - Premium Audio Equipment",
	description:
		"Experience the ultimate audio quality with our premium headphones and earbuds. Designed for comfort and performance.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${outfit.variable} ${plusJakartaSans.variable} font-body`}>
				<ClerkProvider>
					<ClientProviders>
						<TooltipProvider>
							<Toaster />
							<Sonner />
							{children}
						</TooltipProvider>
					</ClientProviders>
				</ClerkProvider>
			</body>
		</html>
	);
}
