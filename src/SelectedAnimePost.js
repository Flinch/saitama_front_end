import React from "react";

const SelectedAnimePost = ({ anime, data }) => {
	return (
		<div class="column">
			{console.log("hello")}
			<div class="ui fluid card">
				<div class="content">
					<p class="ui center aligned header">{anime.title}</p>
				</div>
				<div class="ui slide masked reveal image">
					<img src={anime.image_url} class="visible content" />
					<div class="hidden content slide">
						{" "}
						<p class="ui center aligned"> {anime.synopsis} </p>{" "}
					</div>
				</div>
				<div class={`ui ${data.statusColor} bottom attached button`}>
					<p> {data.notice} </p>
				</div>
			</div>
		</div>
	);
};

export default SelectedAnimePost;
