import React from "react";

const AnimePost = ({ anime }) => {
	const onAnimeSelected = () => {
		fetch(`http://localhost:3000/getanime?anime=${anime.mal_id}`);
	};

	return (
		<div class="column">
			<div class="ui fluid card">
				<div class="ui slide masked reveal image">
					<img src={anime.image_url} class="visible content" />
					<div class="hidden content slide">
						{" "}
						<p class="ui center aligned"> {anime.synopsis} </p>{" "}
					</div>
				</div>
				<div class="content">
					<p class="ui center aligned header">{anime.title}</p>
				</div>
			</div>
		</div>
	);
};

export default AnimePost;
