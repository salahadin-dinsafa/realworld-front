import axios from "axios";

import { getSession } from "@/actions";
import ProfileHeader from "@/components/profiles/ProfileHeader";
import { ArticleHeader } from "@/components/home/ArticleHeader";

type TProfilePageProps = {
	username: string;
};

const ProfilePage = async ({ params }: { params: TProfilePageProps }) => {
	const session = await getSession();

	try {
		const res = await axios.get(
			`http://localhost:4000/api/profiles/${params.username}`,
			{
				headers: {
					Authorization: `Token ${session.token}`,
				},
			}
		);

		const data = await res.data;

		const { profile } = await data.data;

		return (
			<div className="">
				<ProfileHeader profile={profile} />
				<div className="min-w-full py-2 px-4 md:px-10 lg:px-14 mt-10">
					<ArticleHeader
						choices={[
							{ name: "My Articles", query: "" },
							{
								name: "Favorited Articles",
								query: `favorite=true`,
							},
						]}
					/>
				</div>
			</div>
		);
	} catch (err) {
		//console.log(err);
		return (
			<h1 className="text-rose-500 w-fit mx-auto">
				Internal server Error
			</h1>
		);
	}
};

export default ProfilePage;
