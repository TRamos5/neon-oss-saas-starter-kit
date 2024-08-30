import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { validateRequest } from "@/lib/validate-request";
import { logout } from "@/actions/logoutAction";

export async function SiteHeader() {
	const { user } = await validateRequest();
	return (
		<header className="bg-background sticky top-0 z-40 w-full border-b">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav} />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-2">
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.gitHub className="h-5 w-5" />
								<span className="sr-only">GitHub</span>
							</div>
						</Link>
						<Link
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.twitter className="h-5 w-5 fill-current" />
								<span className="sr-only">Twitter</span>
							</div>
						</Link>
						{user ? (
							<form action={logout}>
								<button className={buttonVariants({ variant: "outline" })}>
									Sign out
								</button>
							</form>
						) : (
							<>
								<Link
									href="/login"
									className={buttonVariants({ variant: "ghost" })}
								>
									Login
								</Link>
								<Link
									href="/signup"
									className={buttonVariants({ variant: "default" })}
								>
									Sign up
								</Link>
							</>
						)}
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
