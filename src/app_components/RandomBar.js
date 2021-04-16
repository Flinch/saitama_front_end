import React from "react";
import AnimePostDiscovery from "./AnimePostDiscovery.js";
import "./Discovery.css";

const RandomBar = ({ animes, animeSelected }) => {
	const Listings = animes.map((anime, index) => {
		return (
			<AnimePostDiscovery
				anime={anime}
				key={index}
				animeSelected={animeSelected}
			/>
		);
	});

	return <div className="container ui four column grid"> {Listings} </div>;
};

export default RandomBar;
