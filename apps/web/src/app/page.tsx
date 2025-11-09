"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
	const featuredProducts = products.slice(0, 3);
	const bestSellers = products.slice(0, 4);

	return (
		<div className="flex flex-col w-full min-h-screen overflow-x-hidden">
			<Header />
			<main className="flex-grow">
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="relative flex items-end bg-cover bg-no-repeat bg-center px-4 md:px-8 lg:px-16 py-16 min-h-[60vh]"
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2000&auto=format&fit=crop')`,
					}}>
					<motion.div
						className="mx-auto max-w-4xl text-white text-center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
						<h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
							Immerse Yourself in Sound
						</h1>
						<p className="mt-4 sm:mt-6 text-white/90 text-lg">
							Experience the ultimate audio quality with our latest headphones.
							Designed for comfort and performance, they're perfect for any
							activity.
						</p>
						<div className="mt-8">
							<Link href="/products">
								<Button
									size="lg"
									className="bg-primary shadow-lg font-bold text-base hover:scale-105 transition-transform">
									Shop Now
								</Button>
							</Link>
						</div>
					</motion.div>
				</motion.section>

				<section className="py-16 sm:py-24">
					<div className="mx-auto px-4 sm:px-6 lg:px-8 container">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="mb-8 sm:mb-12 font-bold text-3xl text-center">
							Featured Products
						</motion.h2>
						<motion.div
							className="gap-x-5 gap-y-8 xl:gap-x-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.1 }}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.08,
									},
								},
							}}>
							{featuredProducts.map((product) => (
								<motion.div
									key={product.id}
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
									transition={{ duration: 0.3, ease: "easeOut" }}>
									<ProductCard {...product} />
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				<section className="bg-card py-16 sm:py-24">
					<div className="mx-auto px-4 sm:px-6 lg:px-8 container">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="mb-8 sm:mb-12 font-bold text-3xl text-center">
							Best Sellers
						</motion.h2>
						<motion.div
							className="gap-x-5 gap-y-8 xl:gap-x-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.1 }}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.08,
									},
								},
							}}>
							{bestSellers.map((product) => (
								<motion.div
									key={product.id}
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
									transition={{ duration: 0.3, ease: "easeOut" }}>
									<ProductCard {...product} />
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				<section className="py-16 sm:py-24">
					<motion.div
						className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center container"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.5, ease: "easeOut" }}>
						<h2 className="font-bold text-3xl sm:text-4xl tracking-tight">
							Join the SoundWave Community
						</h2>
						<p className="mt-4 text-muted-foreground text-lg">
							Stay up-to-date on the latest products, promotions, and exclusive
							offers.
						</p>
						<div className="flex justify-center mt-8">
							<Button
								size="lg"
								className="bg-primary shadow-lg font-bold text-base hover:scale-105 transition-transform">
								Sign Up
							</Button>
						</div>
					</motion.div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
