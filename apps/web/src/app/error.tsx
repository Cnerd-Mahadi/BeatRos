"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex justify-center items-center bg-background min-h-screen">
			<div className="mx-auto px-4 max-w-md text-center">
				<div className="flex justify-center mb-6">
					<div className="bg-destructive/10 p-4 rounded-full">
						<AlertTriangle className="w-12 h-12 text-destructive" />
					</div>
				</div>
				<h1 className="mb-2 font-heading font-semibold text-2xl">
					Something went wrong
				</h1>
				<p className="mb-8 text-muted-foreground text-sm">
					{error.message ||
						"An unexpected error occurred. Please try again."}
				</p>
				<div className="flex justify-center gap-4">
					<Button onClick={reset} className="cursor-pointer">
						Try Again
					</Button>
					<Button
						variant="outline"
						asChild
						className="cursor-pointer">
						<Link href="/">Go Home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
