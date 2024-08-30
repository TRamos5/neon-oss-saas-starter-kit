export const revalidate = 0; // This disables caching for this page

import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { getViews } from "@/actions/viewsAction";
import { BlogPost } from "@/types/blog";

async function getBlogPosts(): Promise<BlogPost[]> {
	const postsDirectory = path.join(process.cwd(), "src/content/blog");
	const files = await fs.readdir(postsDirectory);

	const posts = await Promise.all(
		files
			.filter((file) => file.endsWith(".mdx"))
			.map(async (file) => {
				const postPath = path.join(postsDirectory, file);
				const fileContents = await fs.readFile(postPath, "utf8");

				const { data: metadata, content } = matter(fileContents);

				return {
					title: metadata.title,
					publishedAt: metadata.publishedAt,
					summary: metadata.summary,
					slug: file.replace(/\.mdx$/, ""),
					content, // Include content if needed
				} as BlogPost;
			})
	);

	const allViews = await getViews();
	const postsWithViews = posts.map((post) => ({
		...post,
		views: allViews.find((v) => v.slug === post.slug)?.count || 0,
	}));

	return postsWithViews.sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	);
}

export default async function BlogPage() {
	const posts = await getBlogPosts();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-text-primary">Blog Posts</h1>
			<ul className="space-y-4">
				{posts.map((post) => (
					<li key={post.slug} className="border-b border-gray-200 pb-4">
						<Link
							href={`/blog/${post.slug}`}
							className="block p-4 rounded transition duration-150 ease-in-out
								hover:bg-gray-50 dark:hover:bg-gray-800
								hover:shadow-md dark:hover:shadow-gray-700 group"
						>
							<div>
								<h2
									className="text-xl font-semibold mb-2 text-text-primary dark:text-gray-100
									group-hover:text-primary dark:group-hover:text-primary-light"
								>
									{post.title}
								</h2>
								<p className="text-text-secondary dark:text-gray-300 mb-2">
									{post.summary}
								</p>
								<div className="flex justify-between items-center">
									<p className="text-sm text-text-tertiary dark:text-gray-400">
										{new Date(post.publishedAt).toLocaleDateString()}
									</p>
									<p className="text-sm text-text-tertiary dark:text-gray-400">
										{post.views} views
									</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
