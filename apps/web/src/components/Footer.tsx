import Logo from "@/components/Logo";

const Footer = () => {
	return (
		<footer className="bg-card border-t border-border/60 w-full">
			<div className="mx-auto px-6 sm:px-8 lg:px-12 py-8 max-w-7xl">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex flex-col items-center sm:items-start gap-1">
						<Logo variant="header" />
						<p className="text-muted-foreground text-xs">
							Premium audio equipment for exceptional sound.
						</p>
					</div>
					<div className="flex flex-col items-center sm:items-end gap-1">
						<p className="text-muted-foreground text-xs">
							&copy; {new Date().getFullYear()} BeatRos. All rights reserved.
						</p>
						<p className="text-muted-foreground text-xs">
							Built by{" "}
							<a
								href="https://github.com/Cnerd-Mahadi"
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground font-medium hover:text-primary transition-colors">
								Cnerd Mahadi
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
