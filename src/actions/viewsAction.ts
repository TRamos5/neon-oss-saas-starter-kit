"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { views } from "@/db/schema";

export async function increment(slug: string) {
	await db
		.insert(views)
		.values({ slug: slug, count: 1 })
		.onConflictDoUpdate({
			target: views.slug,
			set: { count: sql`${views.count} + 1` },
		});
}

export async function getViews() {
	const allViews = await db.select().from(views);
	return allViews;
}

export async function getViewsForSlug(slug: string) {
	const slugViews = await db.select().from(views).where(eq(views.slug, slug));
	return slugViews;
}
