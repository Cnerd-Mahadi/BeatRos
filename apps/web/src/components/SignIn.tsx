"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { attachAuthParams } from "@/lib/utils";
import { useSignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SignInProps {
	sessionId: string;
}

export default function SignIn({ sessionId }: SignInProps) {
	const { toast } = useToast();
	const { signIn } = useSignIn();
	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get("redirect_url");

	const handleGoogleSignIn = async () => {
		try {
			if (!signIn) return null;

			await signIn.authenticateWithRedirect({
				strategy: "oauth_google",
				redirectUrl: attachAuthParams({
					url: "/auth/sso-callback",
					sessionId,
					redirectUrl,
				}),
				redirectUrlComplete: attachAuthParams({
					url: "/auth/callback",
					sessionId,
					redirectUrl,
				}),
			});
		} catch {
			toast({
				title: "Sign In Failed",
				description: "Sorry! Something went wrong",
			});
		}
	};

	return (
		<div className="flex flex-col bg-gradient-to-b from-background to-muted/20 w-full min-h-screen">
			<main className="flex flex-1 justify-center items-center px-4 py-16">
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className="w-full max-w-md">
					<div className="space-y-8">
						{/* Logo */}
						<Logo variant="standalone" />

						{/* Text Content */}
						<div className="space-y-3 text-center">
							<h1 className="font-semibold text-foreground text-2xl tracking-tight">
								Welcome back
							</h1>
							<p className="mx-auto max-w-sm text-muted-foreground text-sm leading-relaxed">
								Sign in to access your personalized shopping experience and
								manage your orders
							</p>
						</div>

						{/* Sign In Button */}
						<div className="pt-2">
							<Button
								onClick={handleGoogleSignIn}
								variant="outline"
								size="lg"
								className="w-full h-11 font-medium text-sm">
								<svg
									fill="currentColor"
									height="18px"
									viewBox="0 0 24 24"
									width="18px"
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2.5">
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
									<path d="M1 1h22v22H1z" fill="none" />
								</svg>
								Continue with Google
							</Button>
						</div>

						{/* Footer */}
						<div className="space-y-4 pt-4">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="border-border/50 border-t w-full" />
								</div>
								<div className="relative flex justify-center text-xs">
									<span className="bg-background px-3 text-muted-foreground/60">
										New to BeatRos?
									</span>
								</div>
							</div>

							<p className="text-sm text-center">
								<Link
									href={attachAuthParams({
										url: "/auth/sign-up",
										redirectUrl,
									})}
									className="font-medium text-foreground hover:text-primary transition-colors">
									Create an account
								</Link>
							</p>
						</div>
					</div>
				</motion.div>
			</main>
		</div>
	);
}
