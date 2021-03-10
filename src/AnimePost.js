import React from "react";

const AnimePost = ({ anime }) => {
	const onAnimeSelected = () => {
		fetch(`http://localhost:3000/getanime?anime=${anime.mal_id}`);
	};

	return (
		<div class="card">
			<div
				class="image"
				onClick={() => {
					onAnimeSelected();
				}}
			>
				<img src={anime.image_url} />
			</div>
		</div>
	);
};

export default AnimePost;
