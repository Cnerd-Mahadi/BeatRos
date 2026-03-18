"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart";
import { getProduct } from "@/services/product";
import { productDetailSchema } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
	Check,
	ChevronRight,
	Loader2,
	ShoppingCart,
	Star,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductDetail() {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;

	const { isPending, mutate } = useMutation({
		mutationKey: [`product/${id}/addtocart`],
		mutationFn: async () => addToCart(id, 1),
		onSuccess: () => toast.success("Added to cart"),
		onError: () => toast.error("Failed to add to cart"),
	});

	const { isLoading, data } = useQuery({
		queryKey: [`product/${id}`],
		queryFn: async () => await getProduct(id),
	});

	if (isLoading) {
		return (
			<div className="flex flex-col w-full min-h-screen">
				<Header />
				<ProductDetailSkeleton />
				<Footer />
			</div>
		);
	}

	const parsed = productDetailSchema.safeParse(data.data);
	if (!parsed.success) throw new Error("No product found");
	const product = parsed.data;

	const handleAddToCart = () => {
		mutate();
	};

	const handleBuyNow = () => {
		mutate(undefined, {
			onSuccess: () => router.push("/cart"),
		});
	};

	const ratingValue = product.rating / 100;

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex flex-1 justify-center px-6 sm:px-8 lg:px-12 py-10">
				<div className="w-full max-w-6xl">
					<nav className="flex items-center gap-1.5 mb-8 text-muted-foreground text-sm font-medium">
						<Link
							href="/"
							className="hover:text-primary transition-colors cursor-pointer">
							Home
						</Link>
						<ChevronRight className="w-3.5 h-3.5" />
						<Link
							href="/products"
							className="hover:text-primary transition-colors cursor-pointer">
							Shop
						</Link>
						<ChevronRight className="w-3.5 h-3.5" />
						<span className="text-foreground">
							{product.title}
						</span>
					</nav>

					<motion.div
						className="gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.4,
							ease: [0.16, 1, 0.3, 1],
						}}>
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								ease: [0.16, 1, 0.3, 1],
								delay: 0.1,
							}}>
							<div className="bg-muted/50 rounded-2xl aspect-square overflow-hidden">
								<img
									src={product.imageUrl}
									alt={product.title}
									className="w-full h-full object-cover object-center"
								/>
							</div>
						</motion.div>

						<motion.div
							className="flex flex-col"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								ease: [0.16, 1, 0.3, 1],
								delay: 0.2,
							}}>
							<p className="text-sm uppercase tracking-[0.12em] text-primary font-semibold mb-3">
								{product.brand.name}
							</p>
							<h1 className="text-heading-lg tracking-tight">
								{product.title}
							</h1>

							<div className="flex items-center gap-3 mt-4">
								<div className="flex items-center gap-0.5 text-amber-500">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className="w-4 h-4"
											fill={
												i < Math.floor(ratingValue)
													? "currentColor"
													: "none"
											}
										/>
									))}
								</div>
								<span className="text-sm font-medium text-foreground tabular-nums">
									{ratingValue.toFixed(1)}
								</span>
							</div>

							<p className="font-heading font-bold text-foreground text-3xl mt-6 tabular-nums">
								${(product.priceInCents / 100).toFixed(2)}
							</p>

							<p className="text-foreground text-base leading-relaxed mt-6">
								{product.description}
							</p>

							{product.features &&
								product.features.length > 0 && (
									<div className="mt-8">
										<h3 className="font-semibold text-base mb-4">
											Key Features
										</h3>
										<ul className="space-y-3">
											{product.features.map(
												(feature, idx) => (
													<li
														key={idx}
														className="flex items-start gap-2.5">
														<Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
														<span className="text-[15px] text-foreground">
															{feature}
														</span>
													</li>
												)
											)}
										</ul>
									</div>
								)}

							<div className="flex gap-3 mt-10">
								<Button
									onClick={handleAddToCart}
									disabled={isPending}
									size="lg"
									className="flex-1 font-semibold h-12 cursor-pointer">
									{isPending ? (
										<Loader2 className="mr-2 w-4 h-4 animate-spin" />
									) : (
										<ShoppingCart className="mr-2 w-4 h-4" />
									)}
									Add to Cart
								</Button>
								<Button
									onClick={handleBuyNow}
									disabled={isPending}
									size="lg"
									variant="outline"
									className="flex-1 font-semibold h-12 cursor-pointer">
									<Zap className="mr-2 w-4 h-4" />
									Buy Now
								</Button>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
