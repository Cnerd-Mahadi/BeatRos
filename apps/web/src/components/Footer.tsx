import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-background border-t w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 container">
				<nav className="flex flex-wrap justify-center -mx-5 -my-2">
					<div className="px-5 py-2">
						<Link
							href="/"
							className="text-muted-foreground hover:text-primary text-sm">
							About Us
						</Link>
					</div>
					<div className="px-5 py-2">
						<Link
							href="/"
							className="text-muted-foreground hover:text-primary text-sm">
							Contact
						</Link>
					</div>
					<div className="px-5 py-2">
						<Link
							href="/"
							className="text-muted-foreground hover:text-primary text-sm">
							Support
						</Link>
					</div>
					<div className="px-5 py-2">
						<Link
							href="/"
							className="text-muted-foreground hover:text-primary text-sm">
							Privacy Policy
						</Link>
					</div>
					<div className="px-5 py-2">
						<Link
							href="/"
							className="text-muted-foreground hover:text-primary text-sm">
							Terms of Service
						</Link>
					</div>
				</nav>

				<div className="flex justify-center space-x-6 mt-8">
					<a href="#" className="text-muted-foreground hover:text-primary">
						<span className="sr-only">Twitter</span>
						<Twitter className="w-6 h-6" />
					</a>
					<a href="#" className="text-muted-foreground hover:text-primary">
						<span className="sr-only">Instagram</span>
						<Instagram className="w-6 h-6" />
					</a>
					<a href="#" className="text-muted-foreground hover:text-primary">
						<span className="sr-only">Facebook</span>
						<Facebook className="w-6 h-6" />
					</a>
				</div>

				<p className="mt-8 text-muted-foreground text-sm text-center">
					© 2024 SoundWave. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
