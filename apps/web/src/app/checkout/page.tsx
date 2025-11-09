"use client";

import Header from "@/components/Header";
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
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function Checkout() {
	const { items, getTotalPrice } = useCart();
	const subtotal = getTotalPrice();
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	return (
		<div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
			<Header />
			<main className="flex-grow mx-auto px-4 sm:px-6 lg:px-8 py-8 container">
				<div className="gap-16 grid grid-cols-1 lg:grid-cols-2">
					<div className="lg:col-span-1">
						<div className="flex items-center gap-2 mb-6 text-muted-foreground text-sm">
							<Link href="/cart" className="hover:text-primary">
								Cart
							</Link>
							<span>/</span>
							<span className="font-semibold text-foreground">Checkout</span>
						</div>

						<h1 className="mb-8 font-bold text-3xl">Checkout</h1>

						<div className="space-y-6">
							<div>
								<h2 className="mb-4 font-bold text-xl">Shipping Information</h2>
								<div className="gap-4 grid grid-cols-1">
									<div>
										<Label htmlFor="name">Name</Label>
										<Input id="name" placeholder="John Doe" className="mt-1" />
									</div>
									<div>
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="john.doe@example.com"
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="phone">Phone</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="+1 (555) 123-4567"
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="address">Address</Label>
										<Input
											id="address"
											placeholder="123 Audio Lane"
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="apartment">
											Apartment, suite, etc. (optional)
										</Label>
										<Input id="apartment" className="mt-1" />
									</div>
									<div className="gap-4 grid grid-cols-2">
										<div>
											<Label htmlFor="city">City</Label>
											<Input
												id="city"
												placeholder="New York"
												className="mt-1"
											/>
										</div>
										<div>
											<Label htmlFor="zip">Zip Code</Label>
											<Input id="zip" placeholder="10001" className="mt-1" />
										</div>
									</div>
									<div>
										<Label htmlFor="country">Country</Label>
										<Select defaultValue="us">
											<SelectTrigger className="mt-1">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="us">United States</SelectItem>
												<SelectItem value="ca">Canada</SelectItem>
												<SelectItem value="mx">Mexico</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<div>
								<h2 className="mb-4 font-bold text-xl">Payment Details</h2>
								<div className="gap-4 grid grid-cols-1">
									<div>
										<Label htmlFor="card-number">Card Number</Label>
										<Input
											id="card-number"
											placeholder="•••• •••• •••• 1234"
											className="mt-1"
										/>
									</div>
									<div className="gap-4 grid grid-cols-2">
										<div>
											<Label htmlFor="expiry">Expiration Date</Label>
											<Input
												id="expiry"
												placeholder="MM / YY"
												className="mt-1"
											/>
										</div>
										<div>
											<Label htmlFor="cvv">CVV</Label>
											<Input id="cvv" placeholder="123" className="mt-1" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="top-28 sticky bg-card shadow-sm p-6 rounded-xl">
							<h2 className="mb-4 font-bold text-xl">Order Summary</h2>
							<div className="space-y-4">
								{items.map((item) => (
									<div key={item.id} className="flex items-center gap-4">
										<div
											className="bg-cover bg-center rounded-lg w-16 h-16"
											style={{ backgroundImage: `url(${item.image})` }}
										/>
										<div className="flex-grow">
											<p className="font-semibold">{item.name}</p>
											<p className="text-muted-foreground text-sm">
												Quantity: {item.quantity}
											</p>
										</div>
										<p className="font-semibold">
											${(item.price * item.quantity).toFixed(2)}
										</p>
									</div>
								))}
							</div>

							<div className="my-6 border-t" />

							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span>Free</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Taxes</span>
									<span>${tax.toFixed(2)}</span>
								</div>
							</div>

							<div className="my-6 border-t" />

							<div className="flex justify-between font-bold text-lg">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>

							<Button className="mt-6 w-full font-bold transition-colors">
								<Lock className="mr-2 w-4 h-4" />
								Place Order
							</Button>
						</motion.div>
					</div>
				</div>
			</main>
		</div>
	);
}
