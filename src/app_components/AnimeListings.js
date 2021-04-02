import React from "react";
import AnimePost from "./AnimePost";
import "./AnimeListings.css";

const AnimeListings = ({ anime_data, userID, username }) => {
	const Listings = anime_data.map((anime, index) => {
		return (
			<AnimePost
				anime={anime}
				userID={userID}
				username={username}
				key={anime.mal_id}
			/>
		);
	});

	return (
		<div>
			<h1
				className={
					anime_data.length === 0 ? "hideHeading" : "showHeading"
				}
				data-aos="fade-up"
			>
				{" "}
				Umm ... Which One?{" "}
			</h1>
			<div className="ui five column grid">{Listings}</div>
		</div>
	);
};

export default AnimeListings;
