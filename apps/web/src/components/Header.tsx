import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
	const { items } = useCart();
	const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
			className="top-0 z-50 sticky bg-background/80 backdrop-blur-md border-b w-full">
			<div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 py-3 container">
				<Link href="/" className="flex items-center gap-3">
					<svg
						className="w-8 h-8 text-primary"
						fill="none"
						viewBox="0 0 48 48"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
							fill="currentColor"
						/>
					</svg>
					<h2 className="font-bold text-xl">SoundWave</h2>
				</Link>

				<nav className="hidden lg:flex items-center gap-8">
					<Link
						href="/products"
						className="font-medium hover:text-primary text-sm">
						Shop
					</Link>
					<Link
						href="/products"
						className="font-medium hover:text-primary text-sm">
						Headphones
					</Link>
					<Link
						href="/products"
						className="font-medium hover:text-primary text-sm">
						Earbuds
					</Link>
					<Link
						href="/products"
						className="font-medium hover:text-primary text-sm">
						Accessories
					</Link>
				</nav>

				<div className="flex items-center gap-1.5">
					<Button variant="ghost" size="icon" className="rounded-full">
						<Search className="w-5 h-5" />
					</Button>
					<Button variant="ghost" size="icon" className="rounded-full">
						<User className="w-5 h-5" />
					</Button>
					<Link href="/cart">
						<Button
							variant="ghost"
							size="icon"
							className="relative rounded-full">
							<ShoppingBag className="w-5 h-5" />
							{cartCount > 0 && (
								<span className="-top-1 -right-1 absolute flex justify-center items-center bg-primary rounded-full w-5 h-5 font-semibold text-[10px] text-primary-foreground">
									{cartCount}
								</span>
							)}
						</Button>
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</motion.header>
	);
};

export default Header;
