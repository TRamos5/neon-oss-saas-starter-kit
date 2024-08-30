import { signup } from "@/actions/signupAction";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function SignupPage() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/");
	}
	return (
		<div className="container flex items-center justify-center min-h-screen py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your details to sign up for a new account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={signup}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input id="username" name="username" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" name="password" type="password" required />
							</div>
						</div>
						<Button type="submit" className="w-full mt-6">
							Sign up
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-center text-muted-foreground">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Log in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
