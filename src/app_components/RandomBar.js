import React from "react";
import AnimePostDiscovery from "./AnimePostDiscovery.js";
import "./Discovery.css";

const RandomBar = ({ animes, animeSelected, selected }) => {
	const Listings = animes.map((anime, index) => {
		return (
			<AnimePostDiscovery
				anime={anime}
				key={index}
				animeSelected={animeSelected}
				index={index}
				selected={selected}
			/>
		);
	});

	return (
		<div className="container" style={{ marginLeft: "10px" }}>
			<div className=" ui four column grid "> {Listings} </div>
		</div>
	);
};

export default RandomBar;
