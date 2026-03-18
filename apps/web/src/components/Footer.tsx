import Logo from "@/components/Logo";
import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-card border-t border-border/60 w-full">
			<div className="mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10 max-w-7xl">
				<div className="gap-12 grid grid-cols-1 md:grid-cols-4">
					<div className="md:col-span-1">
						<Logo variant="header" />
						<p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
							Premium audio equipment designed for those who
							appreciate exceptional sound quality.
						</p>
					</div>

					<div>
						<h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-[0.08em] mb-5">
							Quick Links
						</h4>
						<ul className="space-y-3">
							<li>
								<Link
									href="/products"
									className="text-muted-foreground hover:text-primary text-sm transition-colors cursor-pointer">
									Shop
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="text-muted-foreground hover:text-primary text-sm transition-colors cursor-pointer">
									About Us
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-[0.08em] mb-5">
							Support
						</h4>
						<ul className="space-y-3">
							<li>
								<Link
									href="/"
									className="text-muted-foreground hover:text-primary text-sm transition-colors cursor-pointer">
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="text-muted-foreground hover:text-primary text-sm transition-colors cursor-pointer">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="text-muted-foreground hover:text-primary text-sm transition-colors cursor-pointer">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-[0.08em] mb-5">
							Follow Us
						</h4>
						<div className="flex items-center gap-4">
							<a
								href="#"
								className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
								<span className="sr-only">Twitter</span>
								<Twitter className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
								<span className="sr-only">Instagram</span>
								<Instagram className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border/60">
					<p className="text-muted-foreground/70 text-xs text-center tracking-wide">
						&copy; {new Date().getFullYear()} BeatRos. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
