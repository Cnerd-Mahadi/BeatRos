import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex justify-center items-center bg-background min-h-screen">
			<div className="text-center">
				<h1 className="mb-4 font-bold text-4xl">404</h1>
				<p className="mb-4 text-muted-foreground text-xl">
					Oops! Page not found
				</p>
				<Link href="/" className="text-primary hover:text-primary/80 underline">
					Return to Home
				</Link>
			</div>
		</div>
	);
}
