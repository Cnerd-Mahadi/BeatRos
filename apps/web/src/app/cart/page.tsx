"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { addToCart, getCart } from "@/services/cart";
import { cartSchema } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import {
	AlertTriangle,
	ChevronRight,
	Minus,
	Plus,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export default function Cart() {
	const queryClient = useQueryClient();
	const { isLoading, data } = useQuery({
		queryKey: ["cart"],
		queryFn: getCart,
	});
	const { isPending, mutate } = useMutation({
		mutationKey: [`product/update_quantity`],
		mutationFn: async ({
			id,
			updatedQuantity,
		}: {
			id: string;
			updatedQuantity: number;
		}) => addToCart(id, updatedQuantity),
		onError: () => {
			toast.error("Failed to update cart");
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	const debouncedMutate = useMemo(() => {
		return debounce(
			(id: string, updatedQuantity: number) =>
				mutate({ id, updatedQuantity }),
			500
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!data) return;
		if (data.insufficient) {
			toast.warning("Insufficient items");
		}
	}, [data]);

	if (isLoading) {
		return (
			<div className="flex flex-col w-full min-h-screen">
				<Header />
				<main className="flex-1 mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full max-w-5xl">
					<div className="mb-8">
						<Skeleton className="mb-4 w-32 h-4" />
						<Skeleton className="w-48 h-10" />
					</div>
					<div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
						<div className="space-y-4 lg:col-span-8">
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className="flex items-center gap-4 p-4 border border-border/60 rounded-xl">
									<Skeleton className="rounded-lg w-20 h-20" />
									<div className="flex-1 space-y-2">
										<Skeleton className="w-3/4 h-5" />
										<Skeleton className="w-20 h-4" />
									</div>
									<Skeleton className="w-28 h-8" />
								</div>
							))}
						</div>
						<div className="lg:col-span-4">
							<div className="space-y-4 p-6 border border-border/60 rounded-xl">
								<Skeleton className="w-32 h-6" />
								<Skeleton className="w-full h-4" />
								<Skeleton className="w-full h-4" />
								<Skeleton className="w-full h-4" />
								<Skeleton className="mt-4 w-full h-10" />
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex flex-col w-full min-h-screen">
				<Header />
				<main className="flex flex-1 justify-center items-center">
					<div className="text-center">
						<AlertTriangle className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
						<p className="text-muted-foreground text-lg">
							Could not load your cart
						</p>
						<Button
							className="mt-4 cursor-pointer"
							onClick={() => window.location.reload()}>
							Try Again
						</Button>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	const inSufficient = data.insufficient;
	const cart = data.cart;

	function updateQuantity(id: string, updatedQuantity: number) {
		const previousQuery = queryClient.getQueryData(["cart"]);
		queryClient.setQueryData(["cart"], (prev: any) => {
			const parsed = cartSchema.safeParse(prev);
			if (!parsed.success) return previousQuery;

			let updatedCart = parsed.data.cart;
			if (updatedQuantity <= 0) {
				updatedCart = updatedCart.filter((p) => p.id !== id);
			} else {
				updatedCart = updatedCart.map((p) =>
					p.id === id
						? { ...p, quantity: updatedQuantity }
						: p
				);
			}

			return {
				...prev,
				cart: updatedCart,
			};
		});
	}

	const subTotal = cart.reduce(
		(total, item) => total + (item.priceInCents * item.quantity) / 100,
		0
	);

	function handleIncreaseQuantity(
		id: string,
		quantity: number,
		available: number
	) {
		const updatedQuantity = quantity + 1;
		if (available < updatedQuantity) {
			toast.info(`Item max quantity available: ${available}`);
		} else {
			updateQuantity(id, updatedQuantity);
			debouncedMutate(id, updatedQuantity);
		}
	}

	function handleDecreaseQuantity(id: string, quantity: number) {
		const updatedQuantity = quantity - 1;
		if (updatedQuantity <= 0) {
			handleItemRemoved(id);
			toast.info("Item removed from the cart");
		} else {
			updateQuantity(id, updatedQuantity);
			debouncedMutate(id, updatedQuantity);
		}
	}

	function handleItemRemoved(id: string) {
		const updatedQuantity = 0;
		updateQuantity(id, updatedQuantity);
		debouncedMutate(id, updatedQuantity);
	}

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full max-w-5xl">
				<div className="mb-8">
					<nav
						aria-label="Breadcrumb"
						className="flex items-center gap-1.5 text-sm text-muted-foreground">
						<Link
							href="/"
							className="hover:text-primary transition-colors cursor-pointer">
							Home
						</Link>
						<ChevronRight className="w-3.5 h-3.5" />
						<span className="text-foreground font-medium">
							Cart
						</span>
					</nav>
					<h1 className="mt-4 text-heading-lg tracking-tight">
						Your Cart
					</h1>
				</div>

				{cart.length === 0 ? (
					<div className="py-16 text-center">
						<p className="text-muted-foreground text-lg">
							Your cart is empty
						</p>
						<Link href="/products">
							<Button className="mt-4 cursor-pointer">
								Continue Shopping
							</Button>
						</Link>
					</div>
				) : (
					<div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
						<motion.div
							key={`cart-items-${cart.length}`}
							className="space-y-3 lg:col-span-8"
							initial="hidden"
							animate={
								cart.length === 0 ? "hidden" : "visible"
							}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.05,
									},
								},
							}}>
							{cart.map((item) => (
								<motion.div
									key={item.id}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: {
												duration: 0.3,
												ease: "easeOut",
											},
										},
									}}
									layout
									className="flex items-center gap-4 bg-card p-4 border border-border/60 rounded-xl">
									<div
										className="flex-shrink-0 bg-cover bg-center rounded-lg w-20 h-20"
										style={{
											backgroundImage: `url(${item.imageUrl})`,
										}}
									/>
									<div className="flex-1 min-w-0">
										<h3 className="font-medium text-sm truncate">
											{item.title}
										</h3>
										<p className="text-muted-foreground text-sm tabular-nums">
											$
											{(
												item.priceInCents / 100
											).toFixed(2)}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="icon"
											className="rounded-full w-8 h-8 cursor-pointer"
											onClick={() =>
												handleDecreaseQuantity(
													item.id,
													item.quantity
												)
											}>
											<Minus className="w-3.5 h-3.5" />
										</Button>
										<span className="w-8 font-medium text-center text-sm tabular-nums">
											{item.quantity}
										</span>
										<Button
											variant="outline"
											size="icon"
											className="rounded-full w-8 h-8 cursor-pointer"
											onClick={() =>
												handleIncreaseQuantity(
													item.id,
													item.quantity,
													item.available
												)
											}>
											<Plus className="w-3.5 h-3.5" />
										</Button>
									</div>
									<div className="font-medium text-sm text-right tabular-nums min-w-[72px]">
										$
										{(
											(item.priceInCents *
												item.quantity) /
											100
										).toFixed(2)}
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="text-muted-foreground hover:text-destructive cursor-pointer"
										onClick={() =>
											handleItemRemoved(item.id)
										}>
										<Trash2 className="w-4 h-4" />
									</Button>
								</motion.div>
							))}
						</motion.div>

						<motion.div
							className="lg:col-span-4"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								duration: 0.4,
								ease: "easeOut",
								delay: 0.2,
							}}>
							<div className="bg-card p-6 border border-border/60 rounded-xl">
								<h3 className="mb-5 font-heading font-semibold text-lg">
									Order Summary
								</h3>
								<div className="space-y-4">
									<div className="flex justify-between pt-4 border-t border-border/60 text-sm">
										<span className="text-muted-foreground">
											Subtotal
										</span>
										<span className="font-medium tabular-nums">
											${subTotal.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between pt-4 border-t border-border/60 text-sm">
										<span className="text-muted-foreground">
											Shipping
										</span>
										<span className="font-medium text-primary">
											Free
										</span>
									</div>

									<div className="flex justify-between pt-4 border-t border-border/60 font-semibold text-base">
										<span>Total</span>
										<span className="tabular-nums">
											${subTotal.toFixed(2)}
										</span>
									</div>
								</div>
								<Link href="/checkout">
									<Button className="mt-8 w-full font-medium h-11 cursor-pointer">
										Proceed to Checkout
									</Button>
								</Link>
							</div>
						</motion.div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
