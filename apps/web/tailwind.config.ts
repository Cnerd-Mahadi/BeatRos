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
				sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
			},
			fontSize: {
				"display-lg": [
					"4.5rem",
					{ lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" },
				],
				display: [
					"3.75rem",
					{ lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" },
				],
				"display-sm": [
					"3rem",
					{ lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" },
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
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			boxShadow: {
				sm: "0 1px 2px 0 hsl(220 3% 15% / 0.08)",
				md: "0 6px 16px -2px hsl(220 3% 15% / 0.12), 0 2px 8px -2px hsl(220 3% 15% / 0.06)",
				lg: "0 12px 24px -8px hsl(220 3% 15% / 0.18), 0 6px 12px -6px hsl(220 3% 15% / 0.08)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
						opacity: "0",
					},
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
					to: {
						height: "0",
						opacity: "0",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.95)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				"slide-in-right": {
					"0%": {
						opacity: "0",
						transform: "translateX(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
			},
			animation: {
				"accordion-down":
					"accordion-down 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
				"accordion-up": "accordion-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
				"fade-in": "fade-in 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
				"fade-in-up": "fade-in-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
				"scale-in": "scale-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
				"slide-in-right":
					"slide-in-right 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
			},
			transitionTimingFunction: {
				smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
				"smooth-in": "cubic-bezier(0.42, 0, 1, 1)",
				"smooth-out": "cubic-bezier(0, 0, 0.58, 1)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
