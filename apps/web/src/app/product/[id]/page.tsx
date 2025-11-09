"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
	const params = useParams();
	const id = params.id as string;
	const product = products.find((p) => p.id === id);
	const [selectedImage, setSelectedImage] = useState(0);
	const { addItem } = useCart();

	if (!product) {
		return <div>Product not found</div>;
	}

	const images = product.images || [product.image];

	const handleAddToCart = () => {
		addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
		});
		toast.success("Added to cart!");
	};

	return (
		<div className="flex flex-col w-full min-h-screen overflow-x-hidden">
			<Header />
			<main className="flex flex-1 justify-center px-4 sm:px-6 lg:px-8 py-8">
				<div className="w-full max-w-6xl">
					<div className="flex items-center space-x-2 mb-6 font-medium text-muted-foreground text-sm">
						<Link href="/" className="hover:text-primary">
							Home
						</Link>
						<ChevronRight className="w-4 h-4" />
						<Link href="/products" className="hover:text-primary">
							Products
						</Link>
						<ChevronRight className="w-4 h-4" />
						<span className="text-foreground">{product.name}</span>
					</div>

					<motion.div
						className="gap-8 grid grid-cols-1 lg:grid-cols-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, ease: "easeOut" }}>
						<motion.div
							className="gap-4 grid grid-cols-4 grid-rows-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}>
							<div
								className="col-span-4 row-span-2 bg-cover bg-center rounded-lg h-[450px] overflow-hidden transition-opacity duration-300 will-change-transform"
								style={{ backgroundImage: `url(${images[selectedImage]})` }}
							/>
							{images.length > 1 &&
								images
									.slice(1)
									.map((img, idx) => (
										<motion.div
											key={idx}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											transition={{ duration: 0.2 }}
											className="bg-cover bg-center rounded-lg h-[100px] overflow-hidden cursor-pointer"
											style={{ backgroundImage: `url(${img})` }}
											onClick={() => setSelectedImage(idx + 1)}
										/>
									))}
						</motion.div>

						<motion.div
							className="flex flex-col space-y-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}>
							<h1 className="font-bold text-3xl">{product.name}</h1>

							<div className="flex flex-wrap items-center gap-x-8 gap-y-4">
								<div className="flex flex-col">
									<p className="font-black text-5xl">{product.rating}</p>
									<div className="flex items-center text-yellow-400">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className="w-5 h-5"
												fill={
													i < Math.floor(product.rating)
														? "currentColor"
														: "none"
												}
											/>
										))}
									</div>
								</div>
								<div>
									<p className="text-muted-foreground text-sm">
										{product.reviews} reviews
									</p>
								</div>
							</div>

							<p className="font-bold text-primary text-5xl">
								${product.price.toFixed(2)}
							</p>

							<p className="text-muted-foreground">{product.description}</p>

							{product.features && (
								<div>
									<h3 className="mb-3 font-semibold">Key Features:</h3>
									<ul className="space-y-2">
										{product.features.map((feature, idx) => (
											<li key={idx} className="flex items-start">
												<span className="mr-2 text-primary">•</span>
												<span className="text-sm">{feature}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							<div className="flex gap-4">
								<Button
									size="lg"
									className="flex-1 font-semibold"
									onClick={handleAddToCart}>
									Add to Cart
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="flex-1 font-semibold">
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
