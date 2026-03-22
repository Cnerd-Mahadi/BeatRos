"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/use-services";
import { SignedOut } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Shield, Truck } from "lucide-react";
import Link from "next/link";

export default function Home() {
	const { product } = useServices();
	const { isLoading, data: result } = useQuery({
		queryKey: ["products"],
		queryFn: () => product.getProducts(),
	});

	const featuredProducts = result?.data.slice(0, 3) ?? [];
	const bestSellers = result?.data.slice(0, 4) ?? [];

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-grow">
				{/* Hero */}
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					className="relative flex items-center justify-center bg-cover bg-no-repeat bg-center px-6 sm:px-8 lg:px-12 min-h-[80vh]"
					style={{
						backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2000&auto=format&fit=crop')`,
					}}>
					<motion.div
						className="max-w-3xl text-white text-center"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							ease: [0.16, 1, 0.3, 1],
							delay: 0.15,
						}}>
						<p className="text-white/90 text-sm font-medium uppercase tracking-[0.2em] mb-5">
							Premium Audio
						</p>
						<h1 className="text-4xl sm:text-display-lg tracking-[-0.04em] font-heading">
							Immerse Yourself
							<br />
							in Sound
						</h1>
						<p className="mt-6 text-white/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
							Premium headphones and audio gear, crafted for those
							who hear the difference.
						</p>
						<div className="mt-10">
							<Link href="/products">
								<Button
									size="lg"
									className="font-semibold text-sm px-8 h-12 cursor-pointer">
									Shop Collection
									<ArrowRight className="ml-2 w-4 h-4" />
								</Button>
							</Link>
						</div>
					</motion.div>
				</motion.section>

				{/* Value Propositions */}
				<section className="py-14 border-b border-border/60">
					<div className="mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
							{[
								{
									icon: Truck,
									title: "Free Shipping",
									desc: "On all orders over $50",
								},
								{
									icon: Shield,
									title: "2-Year Warranty",
									desc: "Full coverage guaranteed",
								},
								{
									icon: Headphones,
									title: "Expert Support",
									desc: "Dedicated audio specialists",
								},
							].map((item, i) => (
								<motion.div
									key={item.title}
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.4,
										ease: [0.16, 1, 0.3, 1],
										delay: i * 0.08,
									}}
									className="flex items-center gap-4">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
										<item.icon className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-foreground">
											{item.title}
										</h3>
										<p className="text-sm text-muted-foreground mt-0.5">
											{item.desc}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Featured Products */}
				<section className="bg-muted/40 py-24 sm:py-28">
					<div className="mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{
								duration: 0.5,
								ease: [0.16, 1, 0.3, 1],
							}}
							className="flex items-end justify-between mb-12">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-2">
									Curated Selection
								</p>
								<h2 className="text-heading-lg tracking-tight">
									Featured Products
								</h2>
								<p className="mt-2 text-muted-foreground text-base">
									Handpicked for exceptional listening.
								</p>
							</div>
							<Link
								href="/products"
								className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
								View all
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</motion.div>
						<motion.div
							key={`featured-${featuredProducts.length}`}
							className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
							initial="hidden"
							animate={isLoading ? "hidden" : "visible"}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.08 },
								},
							}}>
							{isLoading
								? Array.from({ length: 3 }).map((_, index) => (
										<motion.div
											key={`skeleton-${index}`}
											variants={{
												hidden: {
													opacity: 0,
													y: 12,
												},
												visible: {
													opacity: 1,
													y: 0,
												},
											}}
											transition={{
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}>
											<ProductCardSkeleton />
										</motion.div>
									))
								: featuredProducts.map((product) => (
										<motion.div
											key={product.id}
											variants={{
												hidden: {
													opacity: 0,
													y: 12,
												},
												visible: {
													opacity: 1,
													y: 0,
												},
											}}
											transition={{
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}>
											<ProductCard {...product} />
										</motion.div>
									))}
						</motion.div>
					</div>
				</section>

				{/* Best Sellers */}
				<section className="py-24 sm:py-28">
					<div className="mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{
								duration: 0.5,
								ease: [0.16, 1, 0.3, 1],
							}}
							className="flex items-end justify-between mb-12">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-2">
									Popular Picks
								</p>
								<h2 className="text-heading-lg tracking-tight">
									Best Sellers
								</h2>
								<p className="mt-2 text-muted-foreground text-base">
									Most loved by our customers.
								</p>
							</div>
							<Link
								href="/products"
								className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
								View all
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</motion.div>
						<motion.div
							key={`bestsellers-${bestSellers.length}`}
							className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
							initial="hidden"
							animate={isLoading ? "hidden" : "visible"}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.06 },
								},
							}}>
							{isLoading
								? Array.from({ length: 4 }).map((_, index) => (
										<motion.div
											key={`skeleton-${index}`}
											variants={{
												hidden: {
													opacity: 0,
													y: 12,
												},
												visible: {
													opacity: 1,
													y: 0,
												},
											}}
											transition={{
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}>
											<ProductCardSkeleton />
										</motion.div>
									))
								: bestSellers.map((product) => (
										<motion.div
											key={product.id}
											variants={{
												hidden: {
													opacity: 0,
													y: 12,
												},
												visible: {
													opacity: 1,
													y: 0,
												},
											}}
											transition={{
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}>
											<ProductCard {...product} />
										</motion.div>
									))}
						</motion.div>
					</div>
				</section>

				{/* CTA Banner — only for guests */}
				<SignedOut>
					<section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-24 sm:py-28">
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(217_70%_55%_/_0.15)_0%,_transparent_60%)]" />
						<motion.div
							className="relative mx-auto px-6 sm:px-8 lg:px-12 max-w-3xl text-center"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{
								duration: 0.5,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<h2 className="text-heading-lg text-white tracking-tight">
								Join the BeatRos Community
							</h2>
							<p className="mt-4 text-slate-300 text-base leading-relaxed">
								Get early access to new products, exclusive offers,
								and curated audio content.
							</p>
							<div className="mt-8">
								<Link href="/auth/sign-up">
									<Button
										size="lg"
										className="font-semibold text-sm px-8 h-12 bg-white text-slate-900 hover:bg-slate-100 cursor-pointer">
										Join Now
									</Button>
								</Link>
							</div>
						</motion.div>
					</section>
				</SignedOut>
			</main>
			<Footer />
		</div>
	);
}
