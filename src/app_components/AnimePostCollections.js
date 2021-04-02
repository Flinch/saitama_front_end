import React, { useState, useEffect } from "react";

const AnimePostCollections = ({ anime }) => {
	return (
		<div className="column">
			<div className="ui fluid card">
				<div className="content">
					<p className="ui center aligned header">{anime.title}</p>
				</div>
				<div className="ui slide masked reveal image">
					<img src={anime.image} className="visible content" />
					<div className="hidden content slide">
						{" "}
						<p> {anime.description} </p>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimePostCollections;
