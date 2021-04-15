import React from "react";
import AnimePostDiscovery from "./AnimePostDiscovery.js";
import "./Discovery.css";

const RandomBar = ({ animes, animeSelected }) => {
	const Listings = animes.map((anime) => {
		return (
			<AnimePostDiscovery
				anime={anime}
				key={anime.mal_id}
				animeSelected={animeSelected}
			/>
		);
	});

	return <div className="container ui four column grid"> {Listings} </div>;
};

export default RandomBar;
