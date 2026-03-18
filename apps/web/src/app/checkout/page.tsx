"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getCart } from "@/services/cart";
import { createOrder } from "@/services/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Lock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface CheckoutForm {
	name: string;
	email: string;
	phone: string;
	address: string;
	apartment?: string;
	city: string;
	zip: string;
	country: string;
}

export default function Checkout() {
	const router = useRouter();
	const { isLoading, data } = useQuery({
		queryKey: ["cart"],
		queryFn: getCart,
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<CheckoutForm>({
		defaultValues: { country: "us" },
	});

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ["order/create"],
		mutationFn: createOrder,
	});

	if (isLoading) {
		return (
			<div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
				<Header />
				<main className="flex-grow mx-auto px-6 sm:px-8 lg:px-12 py-10 max-w-6xl w-full">
					<div className="gap-16 grid grid-cols-1 lg:grid-cols-2">
						<div>
							<Skeleton className="mb-6 w-32 h-4" />
							<Skeleton className="mb-8 w-48 h-9" />
							<div className="space-y-6">
								<Skeleton className="w-40 h-7" />
								{Array.from({ length: 5 }).map((_, i) => (
									<div key={i} className="space-y-1">
										<Skeleton className="w-20 h-4" />
										<Skeleton className="w-full h-10" />
									</div>
								))}
							</div>
						</div>
						<div>
							<div className="space-y-4 p-6 border border-border/60 rounded-xl">
								<Skeleton className="w-32 h-7" />
								{Array.from({ length: 2 }).map((_, i) => (
									<div
										key={i}
										className="flex items-center gap-4">
										<Skeleton className="rounded-lg w-16 h-16" />
										<div className="flex-1 space-y-2">
											<Skeleton className="w-3/4 h-4" />
											<Skeleton className="w-16 h-3" />
										</div>
									</div>
								))}
								<Skeleton className="mt-4 w-full h-10" />
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	if (!data || data.cart.length === 0) {
		return (
			<div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
				<Header />
				<main className="flex flex-grow justify-center items-center">
					<div className="text-center">
						<ShoppingBag className="mx-auto mb-4 w-16 h-16 text-muted-foreground/40" />
						<h2 className="mb-2 font-heading font-semibold text-2xl">
							Your cart is empty
						</h2>
						<p className="mb-6 text-muted-foreground text-sm">
							Add some items to your cart before checking out.
						</p>
						<Link href="/products">
							<Button size="lg" className="cursor-pointer">
								Browse Products
							</Button>
						</Link>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	const cart = data.cart;
	const subTotal = cart.reduce(
		(total, item) => total + (item.priceInCents * item.quantity) / 100,
		0
	);

	async function onSubmit(formData: CheckoutForm) {
		const shippingAddress = [
			formData.address,
			formData.apartment,
			formData.city,
			formData.zip,
			formData.country.toUpperCase(),
		]
			.filter(Boolean)
			.join(", ");

		const res = await mutateAsync({
			address: shippingAddress,
			email: formData.email,
		});
		router.push(res.data.paymentSessionUrl);
	}

	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex-grow mx-auto px-6 sm:px-8 lg:px-12 py-10 max-w-6xl w-full">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="gap-14 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">
					<div>
						<nav className="flex items-center gap-1.5 mb-8 text-muted-foreground text-sm">
							<Link
								href="/cart"
								className="hover:text-primary transition-colors cursor-pointer">
								Cart
							</Link>
							<span className="text-muted-foreground/40">
								/
							</span>
							<span className="font-medium text-foreground">
								Checkout
							</span>
						</nav>

						<h1 className="mb-10 text-heading-lg tracking-tight">
							Checkout
						</h1>

						<div className="space-y-6">
							<div>
								<h2 className="mb-6 text-heading-sm">
									Shipping Information
								</h2>
								<div className="gap-4 grid grid-cols-1">
									<div>
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											placeholder="John Doe"
											className="mt-1.5"
											{...register("name", {
												required: "Name is required",
											})}
										/>
										{errors.name && (
											<p className="mt-1 text-destructive text-sm">
												{errors.name.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="john.doe@example.com"
											className="mt-1.5"
											{...register("email", {
												required: "Email is required",
												pattern: {
													value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
													message:
														"Valid email is required",
												},
											})}
										/>
										{errors.email && (
											<p className="mt-1 text-destructive text-sm">
												{errors.email.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="phone">Phone</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="+1 (555) 123-4567"
											className="mt-1.5"
											{...register("phone", {
												required:
													"Phone number is required",
											})}
										/>
										{errors.phone && (
											<p className="mt-1 text-destructive text-sm">
												{errors.phone.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="address">
											Address
										</Label>
										<Input
											id="address"
											placeholder="123 Audio Lane"
											className="mt-1.5"
											{...register("address", {
												required:
													"Address is required",
											})}
										/>
										{errors.address && (
											<p className="mt-1 text-destructive text-sm">
												{errors.address.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="apartment">
											Apartment, suite, etc. (optional)
										</Label>
										<Input
											id="apartment"
											className="mt-1.5"
											{...register("apartment")}
										/>
									</div>
									<div className="gap-4 grid grid-cols-2">
										<div>
											<Label htmlFor="city">City</Label>
											<Input
												id="city"
												placeholder="New York"
												className="mt-1.5"
												{...register("city", {
													required:
														"City is required",
												})}
											/>
											{errors.city && (
												<p className="mt-1 text-destructive text-sm">
													{errors.city.message}
												</p>
											)}
										</div>
										<div>
											<Label htmlFor="zip">
												Zip Code
											</Label>
											<Input
												id="zip"
												placeholder="10001"
												className="mt-1.5"
												{...register("zip", {
													required:
														"Zip code is required",
												})}
											/>
											{errors.zip && (
												<p className="mt-1 text-destructive text-sm">
													{errors.zip.message}
												</p>
											)}
										</div>
									</div>
									<div>
										<Label htmlFor="country">
											Country
										</Label>
										<Select
											defaultValue="us"
											onValueChange={(val) =>
												setValue("country", val)
											}>
											<SelectTrigger className="mt-1.5 cursor-pointer">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value="us"
													className="cursor-pointer">
													United States
												</SelectItem>
												<SelectItem
													value="ca"
													className="cursor-pointer">
													Canada
												</SelectItem>
												<SelectItem
													value="mx"
													className="cursor-pointer">
													Mexico
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
								<p className="text-foreground text-sm">
									You will be redirected to Stripe for secure
									payment processing after placing your order.
								</p>
							</div>
						</div>
					</div>

					<div>
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								ease: [0.16, 1, 0.3, 1],
								delay: 0.1,
							}}
							className="top-28 sticky bg-card p-6 rounded-xl border border-border/60">
							<h2 className="mb-6 font-heading text-heading-sm">
								Order Summary
							</h2>
							<div className="space-y-4">
								{cart.map((item) => (
									<div
										key={item.id}
										className="flex items-center gap-4">
										<div
											className="bg-cover bg-center rounded-lg w-14 h-14 flex-shrink-0"
											style={{
												backgroundImage: `url(${item.imageUrl})`,
											}}
										/>
										<div className="flex-grow min-w-0">
											<p className="font-medium text-sm truncate">
												{item.title}
											</p>
											<p className="text-muted-foreground text-xs">
												Qty: {item.quantity}
											</p>
										</div>
										<p className="font-medium text-sm tabular-nums">
											$
											{(
												(item.priceInCents *
													item.quantity) /
												100
											).toFixed(2)}
										</p>
									</div>
								))}
							</div>

							<div className="my-6 border-t border-border/60" />

							<div className="space-y-2.5 text-sm">
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Subtotal
									</span>
									<span className="tabular-nums">
										${subTotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Shipping
									</span>
									<span className="text-primary font-medium">
										Free
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Taxes
									</span>
									<span className="tabular-nums">$0</span>
								</div>
							</div>

							<div className="my-6 border-t border-border/60" />

							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span className="tabular-nums">
									${subTotal.toFixed(2)}
								</span>
							</div>

							<Button
								type="submit"
								disabled={isPending}
								className="mt-8 w-full font-medium h-11 cursor-pointer">
								{isPending ? (
									<Loader2 className="mr-2 w-4 h-4 animate-spin" />
								) : (
									<Lock className="mr-2 w-4 h-4" />
								)}
								{isPending ? "Processing..." : "Place Order"}
							</Button>
						</motion.div>
					</div>
				</form>
			</main>
			<Footer />
		</div>
	);
}
