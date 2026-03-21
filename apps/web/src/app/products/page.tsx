"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
	getBrands,
	getCategories,
	getProducts,
	type ProductFilters,
} from "@/services/product";
import { useQueries } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PackageOpen, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Client shows 10 per page, server sends 40 per page
const CLIENT_PAGE_SIZE = 10;
const SERVER_PAGE_SIZE = 40;
const CLIENT_PAGES_PER_SERVER = SERVER_PAGE_SIZE / CLIENT_PAGE_SIZE; // 4

function ProductsPageSkeleton() {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
				<div className="mb-10">
					<div className="h-4 w-24 bg-muted rounded mb-2" />
					<div className="h-8 w-32 bg-muted rounded" />
				</div>
				<div className="flex gap-10 lg:gap-14 items-start">
					<aside className="hidden lg:flex flex-col w-[240px] shrink-0 space-y-6">
						<div className="h-10 w-full bg-muted rounded" />
						<div className="h-24 w-full bg-muted rounded" />
					</aside>
					<div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
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
	const router = useRouter();

	// Read all state from URL
	const clientPage = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
	const categorySlug = searchParams.get("category") ?? undefined;
	const brandParam = searchParams.get("brand") ?? undefined;
	const sortParam = (searchParams.get("sort") ?? "newest") as ProductFilters["sort_by"];
	const minPrice = parseInt(searchParams.get("min_price") ?? "0");
	const maxPrice = parseInt(searchParams.get("max_price") ?? "500");

	// Local UI state only for the price slider (not yet committed to URL)
	const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

	// Derived: which server page do we need for this client page?
	const serverPage = Math.ceil(clientPage / CLIENT_PAGES_PER_SERVER);

	// Push URL changes
	const pushParams = useCallback(
		(updates: Record<string, string | null>) => {
			const params = new URLSearchParams(searchParams.toString());
			for (const [key, value] of Object.entries(updates)) {
				if (value === null || value === "") {
					params.delete(key);
				} else {
					params.set(key, value);
				}
			}
			// Always reset to page 1 when any filter changes
			if (!("page" in updates)) params.set("page", "1");
			router.push(`/products?${params.toString()}`);
		},
		[searchParams, router],
	);

	const filters = useMemo<ProductFilters>(() => {
		const f: ProductFilters = {
			page: serverPage,
			limit: SERVER_PAGE_SIZE,
		};
		if (categorySlug) f.category = categorySlug;
		if (brandParam) f.brand = brandParam;
		if (sortParam) f.sort_by = sortParam;
		if (minPrice > 0) f.min_price = minPrice * 100;
		if (maxPrice < 500) f.max_price = maxPrice * 100;
		return f;
	}, [serverPage, categorySlug, brandParam, sortParam, minPrice, maxPrice]);

	const results = useQueries({
		queries: [
			{
				queryKey: ["products", filters],
				queryFn: () => getProducts(filters),
				staleTime: 30_000,
				placeholderData: (prev: Awaited<ReturnType<typeof getProducts>> | undefined) => prev,
			},
			{ queryKey: ["categories"], queryFn: getCategories },
			{ queryKey: ["brands"], queryFn: getBrands },
		],
	});

	const [productsQuery, categoriesQuery, brandsQuery] = results;
	const { isLoading: productsLoading, data: serverResult } = productsQuery;
	const { data: brands = [] } = brandsQuery;
	const { data: categories = [] } = categoriesQuery;

	// Preserve total across server page transitions so pagination never disappears
	const totalRef = useRef(0);
	if (serverResult?.total !== undefined) totalRef.current = serverResult.total;

	const serverProducts = serverResult?.data ?? [];
	const total = totalRef.current;

	// Slice the right 10 from the server's 40
	const offsetWithinServer = ((clientPage - 1) % CLIENT_PAGES_PER_SERVER) * CLIENT_PAGE_SIZE;
	const products = serverProducts.slice(offsetWithinServer, offsetWithinServer + CLIENT_PAGE_SIZE);
	const totalClientPages = Math.ceil(total / CLIENT_PAGE_SIZE);

	// Sync category slug → category ID for filter display
	const selectedCategoryId = useMemo(() => {
		if (!categorySlug || categories.length === 0) return "";
		const match = categories.find(
			(c) =>
				c.slug === categorySlug ||
				c.name.toLowerCase() === categorySlug.toLowerCase(),
		);
		return match?.id ?? "";
	}, [categorySlug, categories]);

	// Keep price slider in sync if URL changes externally
	useEffect(() => {
		setPriceRange([minPrice, maxPrice]);
	}, [minPrice, maxPrice]);

	const [showAllCategories, setShowAllCategories] = useState(false);
	const [showAllBrands, setShowAllBrands] = useState(false);
	const SHOW_LIMIT = 12;

	const filterPanel = (
		<div className="space-y-6 pr-3">
			<div>
				<Label
					htmlFor="sort-by"
					className="font-heading font-semibold text-foreground text-xs uppercase tracking-[0.08em]">
					Sort by
				</Label>
				<Select
					value={sortParam}
					onValueChange={(value) => pushParams({ sort: value })}>
					<SelectTrigger className="mt-2 w-full cursor-pointer">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest" className="cursor-pointer">Newest</SelectItem>
						<SelectItem value="oldest" className="cursor-pointer">Oldest</SelectItem>
						<SelectItem value="price: low to high" className="cursor-pointer">Price: Low to High</SelectItem>
						<SelectItem value="price: high to low" className="cursor-pointer">Price: High to Low</SelectItem>
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
					onValueCommit={(value) =>
						pushParams({
							min_price: value[0] > 0 ? value[0].toString() : null,
							max_price: value[1] < 500 ? value[1].toString() : null,
						})
					}
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
					value={selectedCategoryId}
					onValueChange={(value) => {
						if (value === "") {
							pushParams({ category: null });
						} else {
							const cat = categories.find((c) => c.id === value);
							pushParams({ category: cat?.slug ?? cat?.name.toLowerCase() ?? null });
						}
					}}>
					<div className="space-y-2.5">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="" id="category-none" className="cursor-pointer" />
							<Label htmlFor="category-none" className="font-normal text-sm cursor-pointer">All Categories</Label>
						</div>
						{(showAllCategories ? categories : categories.slice(0, SHOW_LIMIT)).map((category) => (
							<div key={category.id} className="flex items-center space-x-2">
								<RadioGroupItem value={category.id} id={category.id} className="cursor-pointer" />
								<Label htmlFor={category.id} className="font-normal text-sm cursor-pointer">{category.name}</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{categories.length > SHOW_LIMIT && (
					<button
						onClick={() => setShowAllCategories((v) => !v)}
						className="mt-2 text-xs text-primary hover:underline cursor-pointer">
						{showAllCategories ? "Show less" : `See ${categories.length - SHOW_LIMIT} more`}
					</button>
				)}
			</div>

			<div className="pt-6 border-border/60 border-t">
				<h3 className="mb-4 font-heading font-semibold text-foreground text-xs uppercase tracking-[0.08em]">
					Brand
				</h3>
				<RadioGroup
					value={brandParam ?? ""}
					onValueChange={(value) => pushParams({ brand: value === "" ? null : value })}>
					<div className="space-y-2.5">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="" id="brand-none" className="cursor-pointer" />
							<Label htmlFor="brand-none" className="font-normal text-sm cursor-pointer">All Brands</Label>
						</div>
						{(showAllBrands ? brands : brands.slice(0, SHOW_LIMIT)).map((brand) => (
							<div key={brand.id} className="flex items-center space-x-2">
								<RadioGroupItem value={brand.id} id={brand.id} className="cursor-pointer" />
								<Label htmlFor={brand.id} className="font-normal text-sm cursor-pointer">{brand.name}</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{brands.length > SHOW_LIMIT && (
					<button
						onClick={() => setShowAllBrands((v) => !v)}
						className="mt-2 text-xs text-primary hover:underline cursor-pointer">
						{showAllBrands ? "Show less" : `See ${brands.length - SHOW_LIMIT} more`}
					</button>
				)}
			</div>
		</div>
	);

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
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

				{/* Mobile filter sheet */}
				<div className="lg:hidden mb-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="sm" className="gap-2 cursor-pointer">
								<SlidersHorizontal className="w-4 h-4" />
								Filters
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-72 pt-10 overflow-y-auto">
							{filterPanel}
						</SheetContent>
					</Sheet>
				</div>

				{/* Desktop: page layout with independent scrolls */}
				<div className="flex gap-10 lg:gap-14">
					{/* Sidebar: sticky, its own scroll, isolated with overscroll-contain */}
					<aside
						className="hidden lg:block w-[240px] shrink-0 sticky top-24 self-start scrollbar-hide"
						style={{ height: "calc(100vh - 7rem)", overflowY: "auto", overscrollBehavior: "contain", scrollbarWidth: "none" }}>
						{filterPanel}
					</aside>

					{/* Products column scrolls with the page normally */}
					<div className="flex-1 min-w-0">
						<motion.div
							key={`products-${clientPage}-${categorySlug}-${brandParam}-${sortParam}`}
							className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
							initial="hidden"
							animate={productsLoading ? "hidden" : "visible"}
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
							}}>
							{productsLoading
								? Array.from({ length: 6 }).map((_, index) => (
										<motion.div
											key={`skeleton-${index}`}
											variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
											transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
											<ProductCardSkeleton />
										</motion.div>
									))
								: products.map((product) => (
										<motion.div
											key={product.id}
											variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
											transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
											<ProductCard {...product} />
										</motion.div>
									))}
						</motion.div>

						{!productsLoading && total === 0 && (
							<div className="flex flex-col justify-center items-center py-20">
								<PackageOpen className="mb-4 w-14 h-14 text-muted-foreground/40" />
								<p className="mb-1 font-semibold text-lg">No products found</p>
								<p className="text-muted-foreground text-sm">Try adjusting your filters.</p>
							</div>
						)}

						{!productsLoading && totalClientPages > 1 && (
							<div className="flex items-center justify-center gap-2 mt-10">
								<Button
									variant="outline"
									size="sm"
									className="cursor-pointer"
									disabled={clientPage === 1}
									onClick={() => pushParams({ page: (clientPage - 1).toString() })}>
									Previous
								</Button>
								<span className="text-sm text-muted-foreground px-2">
									{clientPage} / {totalClientPages}
								</span>
								<Button
									variant="outline"
									size="sm"
									className="cursor-pointer"
									disabled={clientPage === totalClientPages}
									onClick={() => pushParams({ page: (clientPage + 1).toString() })}>
									Next
								</Button>
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
