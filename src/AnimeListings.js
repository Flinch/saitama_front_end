import React from "react";
import AnimePost from "./AnimePost";
import "./AnimeListings.css";

const AnimeListings = ({ anime_data, userID }) => {
	const Listings = anime_data.map((anime) => {
		return <AnimePost anime={anime} userID={userID} key={anime.mal_id} />;
	});

	return <div className="ui five column grid">{Listings} </div>;
};

export default AnimeListings;
