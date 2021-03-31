import React from "react";
import AnimePostCollections from "./AnimePostCollections";
import "./AnimeListings.css";

const AnimeListingsCollections = ({ anime_data }) => {
	const Listings = anime_data.map((anime) => {
		return <AnimePostCollections anime={anime} key={anime.mal_id} />;
	});

	return <div className="ui five column grid">{Listings} </div>;
};

export default AnimeListingsCollections;
