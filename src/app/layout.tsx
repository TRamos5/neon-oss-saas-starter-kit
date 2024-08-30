import "@/styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="relative flex min-h-screen flex-col">
						<SiteHeader />
						<div className="flex-1">{children}</div>
					</div>
					{/* Helpful widget to see what size screen your browser is */}
					{/* <TailwindIndicator /> */}
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
