import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex justify-center items-center bg-background min-h-screen">
			<div className="mx-auto px-6 max-w-md text-center">
				<p className="font-heading font-bold text-[8rem] leading-none text-primary/15">
					404
				</p>
				<h1 className="mt-4 font-heading font-semibold text-xl tracking-tight">
					Page not found
				</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					The page you&apos;re looking for doesn&apos;t exist or has
					been moved.
				</p>
				<Link href="/" className="inline-block mt-8">
					<Button
						variant="outline"
						className="font-medium cursor-pointer">
						<ArrowLeft className="mr-2 w-4 h-4" />
						Back to Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
