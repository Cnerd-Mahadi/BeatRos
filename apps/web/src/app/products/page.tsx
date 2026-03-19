"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
	getBrands,
	getCategories,
	getProducts,
	type ProductFilters,
} from "@/services/product";
import { useQueries } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function ProductsPageSkeleton() {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full max-w-7xl">
				<div className="mb-10">
					<div className="h-4 w-24 bg-muted rounded mb-2" />
					<div className="h-8 w-32 bg-muted rounded" />
				</div>
				<div className="gap-10 grid grid-cols-1 lg:grid-cols-[240px_1fr]">
					<aside className="space-y-6">
						<div className="h-10 w-full bg-muted rounded" />
						<div className="h-24 w-full bg-muted rounded" />
					</aside>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<ProductCardSkeleton key={i} />
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

function ProductsContent() {
	const searchParams = useSearchParams();
	const categorySlug = searchParams.get("category");

	const [priceRange, setPriceRange] = useState([0, 500]);
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
		undefined,
	);
	const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
		undefined,
	);
	const [sortBy, setSortBy] = useState<ProductFilters["sort_by"]>("newest");

	const filters = useMemo<ProductFilters>(() => {
		const filterObj: ProductFilters = {};
		if (selectedCategory) filterObj.category = selectedCategory;
		if (selectedBrand) filterObj.brand = selectedBrand;
		if (sortBy) filterObj.sort_by = sortBy;
		if (priceRange[0] > 0) filterObj.min_price = priceRange[0] * 100;
		if (priceRange[1] < 500) filterObj.max_price = priceRange[1] * 100;
		return filterObj;
	}, [selectedCategory, selectedBrand, sortBy, priceRange]);

	const results = useQueries({
		queries: [
			{
				queryKey: ["products", filters],
				queryFn: () => getProducts(filters),
			},
			{ queryKey: ["categories"], queryFn: getCategories },
			{ queryKey: ["brands"], queryFn: getBrands },
		],
	});

	const [productsQuery, categoriesQuery, brandsQuery] = results;
	const { isLoading: productsLoading, data: products = [] } = productsQuery;
	const { data: brands = [] } = brandsQuery;
	const { data: categories = [] } = categoriesQuery;

	// Sync URL category slug → selected category ID
	useEffect(() => {
		if (categories.length === 0) return;
		if (categorySlug) {
			const match = categories.find(
				(c) =>
					c.slug === categorySlug ||
					c.name.toLowerCase() === categorySlug.toLowerCase(),
			);
			setSelectedCategory(match?.id ?? undefined);
		} else {
			setSelectedCategory(undefined);
		}
	}, [categorySlug, categories]);

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full max-w-7xl">
				<motion.div
					key={categorySlug ?? "all"}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
					className="mb-10">
					<p className="mb-2 font-semibold text-primary text-sm uppercase tracking-[0.12em]">
						Browse Collection
					</p>
					<h1 className="text-heading-lg tracking-tight">
						{categorySlug
							? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
							: "Shop"}
					</h1>
					<p className="mt-2 text-muted-foreground text-base">
						{categorySlug
							? `Browsing our ${categorySlug} collection.`
							: "Browse our full collection of premium audio equipment."}
					</p>
				</motion.div>

				<div className="gap-10 lg:gap-14 grid grid-cols-1 lg:grid-cols-[240px_1fr]">
					<aside className="space-y-8">
						<div className="space-y-6">
							<div>
								<Label
									htmlFor="sort-by"
									className="font-heading font-semibold text-foreground text-xs uppercase tracking-[0.08em]">
									Sort by
								</Label>
								<Select
									value={sortBy}
									onValueChange={(value) =>
										setSortBy(value as ProductFilters["sort_by"])
									}>
									<SelectTrigger className="mt-2 w-full cursor-pointer">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="newest" className="cursor-pointer">
											Newest
										</SelectItem>
										<SelectItem value="oldest" className="cursor-pointer">
											Oldest
										</SelectItem>
										<SelectItem
											value="price: low to high"
											className="cursor-pointer">
											Price: Low to High
										</SelectItem>
										<SelectItem
											value="price: high to low"
											className="cursor-pointer">
											Price: High to Low
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="pt-6 border-border/60 border-t">
								<h3 className="font-heading font-semibold text-foreground text-xs uppercase tracking-[0.08em]">
									Price Range
								</h3>
								<div className="flex justify-between items-center mt-3 text-sm">
									<span className="tabular-nums">${priceRange[0]}</span>
									<span className="tabular-nums">${priceRange[1]}+</span>
								</div>
								<Slider
									className="mt-3"
									value={priceRange}
									onValueChange={setPriceRange}
									max={500}
									step={10}
									minStepsBetweenThumbs={1}
								/>
							</div>

							<div className="pt-6 border-border/60 border-t">
								<h3 className="mb-4 font-heading font-semibold text-foreground text-xs uppercase tracking-[0.08em]">
									Category
								</h3>
								<RadioGroup
									value={selectedCategory || ""}
									onValueChange={(value) =>
										setSelectedCategory(value === "" ? undefined : value)
									}>
									<div className="space-y-2.5">
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value=""
												id="category-none"
												className="cursor-pointer"
											/>
											<Label
												htmlFor="category-none"
												className="font-normal text-sm cursor-pointer">
												All Categories
											</Label>
										</div>
										{categories.map((category) => (
											<div
												key={category.id}
												className="flex items-center space-x-2">
												<RadioGroupItem
													value={category.id}
													id={category.id}
													className="cursor-pointer"
												/>
												<Label
													htmlFor={category.id}
													className="font-normal text-sm cursor-pointer">
													{category.name}
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
							</div>

							<div className="pt-6 border-border/60 border-t">
								<h3 className="mb-4 font-heading font-semibold text-foreground text-xs uppercase tracking-[0.08em]">
									Brand
								</h3>
								<RadioGroup
									value={selectedBrand || ""}
									onValueChange={(value) =>
										setSelectedBrand(value === "" ? undefined : value)
									}>
									<div className="space-y-2.5">
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value=""
												id="brand-none"
												className="cursor-pointer"
											/>
											<Label
												htmlFor="brand-none"
												className="font-normal text-sm cursor-pointer">
												All Brands
											</Label>
										</div>
										{brands.map((brand) => (
											<div
												key={brand.id}
												className="flex items-center space-x-2">
												<RadioGroupItem
													value={brand.id}
													id={brand.id}
													className="cursor-pointer"
												/>
												<Label
													htmlFor={brand.id}
													className="font-normal text-sm cursor-pointer">
													{brand.name}
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>
					</aside>

					<div>
						<motion.div
							key={`products-${products.length}-${selectedCategory}-${selectedBrand}-${sortBy}`}
							className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
							initial="hidden"
							animate={productsLoading ? "hidden" : "visible"}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.05 },
								},
							}}>
							{productsLoading
								? Array.from({ length: 6 }).map((_, index) => (
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
												duration: 0.35,
												ease: [0.16, 1, 0.3, 1],
											}}>
											<ProductCardSkeleton />
										</motion.div>
									))
								: products.map((product) => (
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
												duration: 0.35,
												ease: [0.16, 1, 0.3, 1],
											}}>
											<ProductCard {...product} />
										</motion.div>
									))}
						</motion.div>
						{!productsLoading && products.length === 0 && (
							<div className="flex flex-col justify-center items-center py-20">
								<PackageOpen className="mb-4 w-14 h-14 text-muted-foreground/40" />
								<p className="mb-1 font-semibold text-lg">No products found</p>
								<p className="text-muted-foreground text-sm">
									Try adjusting your filters.
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default function Products() {
	return (
		<Suspense fallback={<ProductsPageSkeleton />}>
			<ProductsContent />
		</Suspense>
	);
}
