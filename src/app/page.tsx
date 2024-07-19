import { Metadata } from "next";

import { getSession } from "@/actions";
import { Header } from "@/components/home/Header";
import { PopularTag } from "@/components/home/PopularTag";
import { ArticleList } from "@/components/home/ArticleList";
import { ArticleHeader } from "@/components/home/ArticleHeader";

export const metadata: Metadata = {
	title: "Home — Conduit",
	description:
		"Conduit is realworld social blogging site. it uses a custom API for all requests, including authentication. home page of conduit",
};

export default async function Home() {
	const session = await getSession();
	return (
		<main>
			<Header />
			<div className="min-w-full flex flex-col gap-5 md:flex-row  py-2 px-4 md:px-10 lg:px-14 mt-10">
				<div className="flex-1">
					<ArticleHeader
						choices={[
							{
								name: "Your Feed",
								query: `follow=${session.username}`,
							},
							{
								name: "Global Feed",
								query: ``,
							},
						]}
					/>
					<ArticleList />
				</div>
				<PopularTag />
			</div>
		</main>
	);
}
