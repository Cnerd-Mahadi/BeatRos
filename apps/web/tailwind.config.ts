import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				heading: [
					"var(--font-heading)",
					"system-ui",
					"-apple-system",
					"sans-serif",
				],
				body: [
					"var(--font-body)",
					"system-ui",
					"-apple-system",
					"sans-serif",
				],
			},
			fontSize: {
				"display-lg": [
					"4.5rem",
					{
						lineHeight: "1.05",
						fontWeight: "700",
						letterSpacing: "-0.035em",
					},
				],
				display: [
					"3.75rem",
					{
						lineHeight: "1.08",
						fontWeight: "700",
						letterSpacing: "-0.025em",
					},
				],
				"display-sm": [
					"3rem",
					{
						lineHeight: "1.15",
						fontWeight: "600",
						letterSpacing: "-0.02em",
					},
				],
				"heading-lg": [
					"2.25rem",
					{
						lineHeight: "1.2",
						fontWeight: "600",
						letterSpacing: "-0.02em",
					},
				],
				heading: [
					"1.875rem",
					{
						lineHeight: "1.25",
						fontWeight: "600",
						letterSpacing: "-0.015em",
					},
				],
				"heading-sm": [
					"1.5rem",
					{
						lineHeight: "1.35",
						fontWeight: "600",
						letterSpacing: "-0.01em",
					},
				],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			boxShadow: {
				sm: "0 1px 3px 0 hsl(217 20% 20% / 0.05)",
				md: "0 4px 14px -2px hsl(217 20% 20% / 0.07), 0 2px 6px -2px hsl(217 20% 20% / 0.03)",
				lg: "0 10px 24px -6px hsl(217 20% 20% / 0.1), 0 4px 10px -4px hsl(217 20% 20% / 0.05)",
				xl: "0 20px 40px -8px hsl(217 20% 20% / 0.12), 0 8px 16px -6px hsl(217 20% 20% / 0.06)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: {
						height: "var(--radix-accordion-content-height)",
						opacity: "1",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
						opacity: "1",
					},
					to: { height: "0", opacity: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(8px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(16px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.97)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
			},
			animation: {
				"accordion-down":
					"accordion-down 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
				"accordion-up":
					"accordion-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
				"fade-in": "fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
				"fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
				"scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
			},
			transitionTimingFunction: {
				smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
