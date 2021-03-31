import React, { useState, useEffect } from "react";

const AnimePostCollections = ({ anime }) => {
	return (
		<div class="column">
			<div class="ui fluid card">
				<div class="content">
					<p class="ui center aligned header">{anime.title}</p>
				</div>
				<div class="ui slide masked reveal image">
					<img src={anime.image} class="visible content" />
					<div class="hidden content slide">
						{" "}
						<p class="ui center aligned">
							{" "}
							{anime.description}{" "}
						</p>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimePostCollections;
