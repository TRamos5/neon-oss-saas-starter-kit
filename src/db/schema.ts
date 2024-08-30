import {
	integer,
	text,
	boolean,
	timestamp,
	pgTable,
} from "drizzle-orm/pg-core";

export const views = pgTable("views", {
	slug: text("slug").primaryKey(),
	count: integer("count").notNull().default(0),
});

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	password_hash: text("password").notNull(),
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
