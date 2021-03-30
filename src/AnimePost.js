import React, { useState, useEffect } from "react";

const AnimePost = ({ anime, userID }) => {
	const [status, setStatus] = useState({ notice: "Add to List", color: "" });

	const onAnimeSelected = () => {
		fetch(
			`http://localhost:3000/getanime?anime=${anime.mal_id}&userID=${userID}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setStatus(data);
			});
	};

	return (
		<div class="column">
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
				<div
					class={`ui ${status.statusColor} bottom attached button`}
					onClick={() => {
						onAnimeSelected();
					}}
				>
					<p> {status.notice} </p>
				</div>
			</div>
		</div>
	);
};

export default AnimePost;
