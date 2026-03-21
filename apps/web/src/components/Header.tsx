"use client";

import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCartLength } from "@/services/cart";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Menu, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const navLinks = [
	{ href: "/products", label: "Shop", category: null },
	{ href: "/products?category=headphones", label: "Headphones", category: "headphones" },
	{ href: "/products?category=earbuds", label: "Earbuds", category: "earbuds" },
	{ href: "/products?category=gaming", label: "Gaming", category: "gaming" },
];

function HeaderContent() {
	const { isSignedIn } = useAuth();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { data: cartLength = 0 } = useQuery({
		queryKey: ["cart/length"],
		queryFn: getCartLength,
	});

	const handleUserButtonClick = () => {
		if (!isSignedIn) {
			const redirectUrl = encodeURIComponent(pathname);
			router.push(`/auth/sign-in?redirect_url=${redirectUrl}`);
		}
	};

	const activeCategory = searchParams.get("category");
	const isOnProducts = pathname === "/products" || pathname.startsWith("/products/");

	const isLinkActive = (link: (typeof navLinks)[number]) => {
		if (!isOnProducts) return false;
		if (link.category === null) return isOnProducts && !activeCategory;
		return activeCategory === link.category;
	};

	return (
		<>
			{/* Desktop nav */}
			<nav className="hidden md:flex items-center gap-1">
				{navLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
							isLinkActive(link)
								? "text-primary bg-primary/8"
								: "text-foreground hover:text-primary hover:bg-primary/5"
						}`}>
						{link.label}
					</Link>
				))}
			</nav>

			<div className="flex items-center gap-1">
				<SignedIn>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full cursor-pointer">
						<UserButton />
					</Button>
				</SignedIn>
				<SignedOut>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full cursor-pointer"
						onClick={handleUserButtonClick}>
						<User className="w-[18px] h-[18px]" />
					</Button>
				</SignedOut>
				<Link href="/cart">
					<Button
						variant="ghost"
						size="icon"
						className="relative rounded-full cursor-pointer">
						<ShoppingBag className="w-[18px] h-[18px]" />
						{cartLength > 0 && (
							<span className="-top-0.5 -right-0.5 absolute flex justify-center items-center bg-primary rounded-full w-4 h-4 font-semibold text-[9px] text-primary-foreground">
								{cartLength}
							</span>
						)}
					</Button>
				</Link>
				<ThemeToggle />

				{/* Mobile hamburger */}
				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden rounded-full cursor-pointer">
							<Menu className="w-[18px] h-[18px]" />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-64 pt-12">
						<nav className="flex flex-col gap-1">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`px-3 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
										isLinkActive(link)
											? "text-primary bg-primary/8"
											: "text-foreground hover:text-primary hover:bg-primary/5"
									}`}>
									{link.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}

function HeaderFallback() {
	return (
		<>
			<nav className="hidden md:flex items-center gap-1" aria-hidden="true">
				{navLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className="px-3 py-1.5 rounded-md text-sm font-semibold text-foreground/60">
						{link.label}
					</Link>
				))}
			</nav>
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
					<User className="w-[18px] h-[18px] text-muted-foreground" />
				</Button>
				<Link href="/cart">
					<Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
						<ShoppingBag className="w-[18px] h-[18px] text-muted-foreground" />
					</Button>
				</Link>
				<ThemeToggle />
			</div>
		</>
	);
}

const Header = () => {
	return (
		<motion.header
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
			className="top-0 z-50 sticky bg-background/80 backdrop-blur-xl border-b border-border/60 w-full">
			<div className="flex justify-between items-center mx-auto px-6 sm:px-8 lg:px-12 py-4 max-w-7xl">
				<Logo variant="header" />
				<Suspense fallback={<HeaderFallback />}>
					<HeaderContent />
				</Suspense>
			</div>
		</motion.header>
	);
};

export default Header;
