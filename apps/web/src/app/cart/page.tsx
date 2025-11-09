"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Cart() {
	const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

	const handleQuantityChange = (id: string, delta: number) => {
		const item = items.find((i) => i.id === id);
		if (item) {
			const newQuantity = Math.max(1, item.quantity + delta);
			updateQuantity(id, newQuantity);
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl container">
				<div className="mb-6">
					<nav aria-label="Breadcrumb" className="flex text-sm">
						<ol className="inline-flex items-center space-x-1 md:space-x-2">
							<li className="inline-flex items-center">
								<Link
									href="/"
									className="text-muted-foreground hover:text-primary">
									Home
								</Link>
							</li>
							<li>
								<div className="flex items-center">
									<ChevronRight className="w-4 h-4 text-muted-foreground" />
									<span className="ml-1 font-medium">Cart</span>
								</div>
							</li>
						</ol>
					</nav>
					<h2 className="mt-4 font-bold text-4xl tracking-tight">Your Cart</h2>
				</div>

				{items.length === 0 ? (
					<div className="py-12 text-center">
						<p className="text-muted-foreground text-lg">Your cart is empty</p>
						<Link href="/products">
							<Button className="mt-4">Continue Shopping</Button>
						</Link>
					</div>
				) : (
					<div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
						<motion.div
							className="space-y-4 lg:col-span-2"
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.05,
									},
								},
							}}>
							{items.map((item) => (
								<motion.div
									key={item.id}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: { duration: 0.3, ease: "easeOut" },
										},
									}}
									layout
									className="flex items-center gap-4 bg-card shadow-sm p-4 border rounded-lg">
									<div
										className="flex-shrink-0 bg-cover bg-center rounded w-20 h-20"
										style={{ backgroundImage: `url(${item.image})` }}
									/>
									<div className="flex-1">
										<h3 className="font-medium">{item.name}</h3>
										<p className="text-muted-foreground text-sm">
											${item.price.toFixed(2)}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="icon"
											className="rounded-full w-8 h-8"
											onClick={() => handleQuantityChange(item.id, -1)}>
											<Minus className="w-4 h-4" />
										</Button>
										<span className="w-8 font-medium text-center">
											{item.quantity}
										</span>
										<Button
											variant="outline"
											size="icon"
											className="rounded-full w-8 h-8"
											onClick={() => handleQuantityChange(item.id, 1)}>
											<Plus className="w-4 h-4" />
										</Button>
									</div>
									<div className="font-medium text-right">
										${(item.price * item.quantity).toFixed(2)}
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removeItem(item.id)}
										className="text-muted-foreground hover:text-destructive">
										<Trash2 className="w-5 h-5" />
									</Button>
								</motion.div>
							))}
						</motion.div>

						<motion.div
							className="lg:col-span-1"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}>
							<div className="bg-card shadow-sm p-6 border rounded-lg">
								<h3 className="mb-4 font-semibold text-lg">Order Summary</h3>
								<div className="space-y-4">
									<div className="flex justify-between pt-4 border-t text-sm">
										<span className="text-muted-foreground">Subtotal</span>
										<span className="font-medium">
											${getTotalPrice().toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between pt-4 border-t text-sm">
										<span className="text-muted-foreground">Shipping</span>
										<span className="font-medium">Free</span>
									</div>
									<div className="flex justify-between pt-4 border-t text-sm">
										<span className="text-muted-foreground">Taxes</span>
										<span className="text-muted-foreground text-sm">
											Calculated at checkout
										</span>
									</div>
									<div className="flex justify-between pt-4 border-t font-semibold text-base">
										<span>Total</span>
										<span>${getTotalPrice().toFixed(2)}</span>
									</div>
								</div>
								<Link href="/checkout">
									<Button className="mt-6 w-full font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform">
										Proceed to Checkout
									</Button>
								</Link>
							</div>
						</motion.div>
					</div>
				)}
			</main>
		</div>
	);
}
