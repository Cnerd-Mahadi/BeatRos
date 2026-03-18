import Link from "next/link";

interface LogoProps {
	variant?: "header" | "standalone";
	className?: string;
}

export default function Logo({
	variant = "header",
	className = "",
}: LogoProps) {
	const content = (
		<div className={`text-center ${className}`}>
			{variant === "header" ? (
				<span className="font-heading font-bold text-foreground text-xl tracking-tight">
					Beat<span className="text-primary">Ros</span>
				</span>
			) : (
				<div className="space-y-2">
					<span className="block font-heading font-bold text-foreground text-3xl tracking-tight">
						Beat<span className="text-primary">Ros</span>
					</span>
					<div className="mx-auto rounded-full w-8 h-0.5 bg-primary/60" />
				</div>
			)}
		</div>
	);

	if (variant === "header") {
		return (
			<Link href="/" className="flex items-center">
				{content}
			</Link>
		);
	}

	return content;
}
