"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";

export default function Payment() {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			<main className="flex flex-grow justify-center items-center px-6 sm:px-8 lg:px-12 py-16">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					className="mx-auto max-w-lg text-center">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							duration: 0.4,
							ease: [0.16, 1, 0.3, 1],
							delay: 0.1,
						}}
						className="flex justify-center mb-8">
						<div className="bg-primary/10 p-5 rounded-full">
							<CheckCircle2 className="w-12 h-12 text-primary" />
						</div>
					</motion.div>

					<h1 className="mb-3 text-heading-lg tracking-tight">
						Thank You for Your Order!
					</h1>

					<p className="text-muted-foreground leading-relaxed">
						Your order has been placed and will be confirmed shortly.
					</p>

					<div className="flex justify-center items-center gap-2 mt-4 text-muted-foreground text-sm">
						<Mail className="w-4 h-4" />
						<p>A confirmation email will be sent to you.</p>
					</div>

					<div className="flex sm:flex-row flex-col justify-center gap-3 mt-10">
						<Link href="/">
							<Button
								size="lg"
								className="w-full sm:w-auto font-medium h-11 px-8 cursor-pointer">
								Continue Shopping
							</Button>
						</Link>
						<Link href="/products">
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto font-medium h-11 px-8 cursor-pointer">
								View Products
							</Button>
						</Link>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
