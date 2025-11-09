"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Products() {
	const [priceRange, setPriceRange] = useState([0, 500]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const categories = Array.from(new Set(products.map((p) => p.category)));

	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const filteredProducts = products.filter((product) => {
		const matchesPrice =
			product.price >= priceRange[0] && product.price <= priceRange[1];
		const matchesCategory =
			selectedCategories.length === 0 ||
			selectedCategories.includes(product.category);
		return matchesPrice && matchesCategory;
	});

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 mx-auto px-6 py-8 container">
				<div className="gap-8 grid grid-cols-1 lg:grid-cols-4">
					<aside className="space-y-8 lg:col-span-1">
						<div>
							<h2 className="font-bold text-xl">Filters</h2>
						</div>

						<div className="space-y-6">
							<div>
								<Label htmlFor="sort-by" className="font-medium text-sm">
									Sort by
								</Label>
								<Select defaultValue="popular">
									<SelectTrigger className="mt-1 w-full">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="popular">Most Popular</SelectItem>
										<SelectItem value="newest">Newest</SelectItem>
										<SelectItem value="price-low">
											Price: Low to High
										</SelectItem>
										<SelectItem value="price-high">
											Price: High to Low
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<h3 className="font-medium text-sm">Price Range</h3>
								<div className="flex justify-between items-center mt-2 text-muted-foreground text-sm">
									<span>${priceRange[0]}</span>
									<span>${priceRange[1]}+</span>
								</div>
								<Slider
									className="mt-4"
									value={priceRange}
									onValueChange={setPriceRange}
									max={500}
									step={10}
									minStepsBetweenThumbs={1}
								/>
							</div>

							<div>
								<h3 className="mb-4 font-medium text-sm">Category</h3>
								<div className="space-y-3">
									{categories.map((category) => (
										<div key={category} className="flex items-center space-x-2">
											<Checkbox
												id={category}
												checked={selectedCategories.includes(category)}
												onCheckedChange={() => toggleCategory(category)}
											/>
											<Label
												htmlFor={category}
												className="font-normal text-sm cursor-pointer">
												{category}
											</Label>
										</div>
									))}
								</div>
							</div>
						</div>
					</aside>

					<motion.div
						className="lg:col-span-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}>
						<motion.div
							className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
							{filteredProducts.map((product) => (
								<motion.div
									key={product.id}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: {
												duration: 0.4,
												ease: "easeOut",
											},
										},
									}}>
									<ProductCard {...product} />
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
