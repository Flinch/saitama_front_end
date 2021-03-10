import React from "react";
import AnimePost from "./AnimePost";

const AnimeListings = ({ anime_data }) => {
	const Listings = anime_data.map((anime) => {
		return <AnimePost anime={anime} />;
	});

	return <div>{Listings} </div>;
};

export default AnimeListings;
