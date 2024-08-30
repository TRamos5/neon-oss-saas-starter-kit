# Welcome to the Open Source SaaS Starter Kit

This is a github template built using the following below with links to there respective documentation:

- [Neon.tech](https://neon.tech/) for the PostgresSQL Database (Serverless Version)
- [Next.js](https://nextjs.org/) (App router)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Light / Dark Mode](https://next-themes.mxs.dev/)
- [Bun](https://bun.sh/)
- [Lucia Auth](https://github.com/lucia-auth/lucia) for Authentication
- [Vercel](https://vercel.com/) for Hosting
- [Vercel Analytics](https://vercel.com/analytics)
- [Vercel Speed Insight](https://vercel.com/docs/products/speed-insights)
- [ShadCN](https://ui.shadcn.com/) for UI
- [Tailwind CSS](https://tailwindcss.com/) for Styling
- [Typescript](https://www.typescriptlang.org/) (of course)

It has everything you need to get started, whether you're creating a SaaS product, blog, or just want to play around!

## Steps to Take To Get Started

1. Start by clicking the "Use this template" button above to create a new repository with this template.

2. Next, clone the repository down to your local machine and install the dependencies using `bun run install`

- This project uses Bun, so make sure you have it installed on your local machine. You can find the installation instructions [here](https://bun.sh/docs/installation)

3. After you have installed the dependencies, go to Neon.tech, create an account if you don't have one, and create your first project.

4. Once your project is created, go to the settings page and find your project connection string.

5. Create a copy of `.env.sample` and change the `.sample` to `.local`. Popule the field `DATABASE_URL` with the token from your project in Neon. This environment variable will be used in `drizzle.ts` to make a connection with your PostgresSQL database.

6. The next step is to run `bun drizzle-kit generate` which will create a new migration under the `drizzle` folder. Once it completes, run `bun drizzle-kit migrate` to push up your migrations to Neon which will in turn create your tables based off what is in `db/schema.ts`.

7. After this all completes successfully, you can go ahead and run `bun dev` to start up a development environment locally.

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You should now be up and running!

## Database Schema

We have 3 tables in the DB with the following schemas:

```sql
CREATE TABLE IF NOT EXISTS "views" (
	"slug" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);

DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

- The `views` table keeps track of how many views your blog posts have
- The `user` table gets populated once a user creates an account
- The `session` table gets populated once a user is logged in

**These tables will be created for you once you run your drizzle commands from step 6.**

## Finding Your Way Around The Project

The project is structured with everything you needbesides your drizzle migrations being under `src`.

Structure Under `src`:

- `/actions`: All of the actions
- `/app`: The routes to each page of your application along with the `layout.tsx`
  - `/app/blog`: The layout for each blog post. Blogs are written in `mdx` and can be found in `/content/blog`
  - `/app/login`: The login page
  - `/app/signup`: The signup page
- `/components`: All of the components being used throughout the app
- `/config`: The metadata for your app along with the main header
- `/content/blog`: Where all of your blog posts will go
- `/db`: Your database connection and schema files
- `/lib`: All of your auth, fonts, utils, and user validation logic
- `/styles`: All of your styling. We are using `Tailwindcss` so also take a look at `tailwind.config.js` to see how they are being applied
- `/types`: All of your type declarations

I tried to label everything so it would be apparant, but if you have any questions reach out to me on [X](https://x.com/travislramos) or [email](mailto:travislramos@gmail.com)!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
