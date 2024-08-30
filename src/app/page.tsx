import Image from "next/image";
import Link from "next/link";
import { validateRequest } from "@/lib/validate-request";
import { Icons } from "@/components/icons";

export default async function Home() {
	const { user } = await validateRequest();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								{user && (
									<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
										Hi {user?.username}
									</p>
								)}
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none leading-tight">
									Open Source SaaS Starter Kit
								</h1>
								<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
									This Neon and Next.js starter kit includes everything you need
									to build a SaaS product. From authentication to analytics, to
									blogging and deployment, we have it all.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link
									href="#"
									className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								>
									Get the free starter kit
								</Link>
							</div>
						</div>
						<Image
							alt="Hero"
							className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square"
							height="550"
							src="/heroImage.webp"
							width="550"
						/>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
				<div className="container px-4 md:px-6">
					<h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FeatureCard
							icon={<Icons.neon className="h-10 w-10" />}
							title="Neon Database"
							description="Serverless Postgres for modern applications"
						/>
						<FeatureCard
							icon={<Icons.nextjs className="h-10 w-10" />}
							title="Next.js 14"
							description="The React framework for production"
						/>
						<FeatureCard
							icon={<Icons.idCard className="h-10 w-10" />}
							title="Lucia Auth"
							description="Secure user authentication system"
						/>
						<FeatureCard
							icon={<Icons.squarePen className="h-10 w-10" />}
							title="Blog"
							description="Easy to use blog system with Markdown support"
						/>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="w-full py-12">
				<div className="container px-4 md:px-6">
					<h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
						<StepCard
							number="1"
							title="Clone the Repository"
							description="Start by cloning our GitHub repository to your local machine."
						/>
						<StepCard
							number="2"
							title="Create a Neon Database"
							description="Create a Neon Project and grab your connection string."
						/>
						<StepCard
							number="3"
							title="Configure Your Environment"
							description="Set up your environment variables and connect to your Neon database."
						/>
						<StepCard
							number="4"
							title="Customize and Deploy"
							description="Modify the starter kit to fit your needs and deploy your SaaS application."
						/>
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="w-full py-12 bg-gray-100 dark:bg-gray-900">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center text-center">
						<h2 className="text-3xl font-bold mb-4">Subscribe To Level Up</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
							A newsletter for developers by a developer.
						</p>
						<div className="w-full max-w-md">
							<iframe
								src="https://embeds.beehiiv.com/f7b33701-dde2-40de-9234-1a6acb1cf0d9?slim=true"
								data-test-id="beehiiv-embed"
								height="52"
								frameBorder="0"
								scrolling="no"
								style={{
									margin: 0,
									borderRadius: "0px !important",
									backgroundColor: "transparent",
									width: "100%",
								}}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
			{icon}
			<h3 className="mt-4 text-xl font-semibold">{title}</h3>
			<p className="mt-2 text-gray-500 dark:text-gray-300">{description}</p>
		</div>
	);
}

function StepCard({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col items-center text-center p-4">
			<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
				{number}
			</div>
			<h3 className="text-xl font-semibold">{title}</h3>
			<p className="mt-2 text-gray-500 dark:text-gray-300">{description}</p>
		</div>
	);
}
