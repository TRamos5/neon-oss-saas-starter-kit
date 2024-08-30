export const revalidate = 0;

import { increment, getViewsForSlug } from "@/actions/viewsAction";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPostProps {
	params: {
		slug: string;
	};
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = params;

	// Increment view count
	await increment(slug);

	// Get updated view count
	const views = await getViewsForSlug(slug);

	// Read the MDX file
	const postPath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
	const fileContents = await fs.readFile(postPath, "utf8");
	const { data: metadata, content } = matter(fileContents);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-4 text-text-primary dark:text-gray-100">
				{metadata.title}
			</h1>
			<p className="text-sm text-text-tertiary dark:text-gray-400 mb-4">
				Published on {new Date(metadata.publishedAt).toLocaleDateString()} |{" "}
				{views[0]?.count || 0} views
			</p>
			<div className="prose dark:prose-invert max-w-none">
				<MDXRemote source={content} />
			</div>
		</div>
	);
}
