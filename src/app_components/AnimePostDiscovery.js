import React, { useState, useEffect } from "react";
import "./AnimeListings.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import TextTruncate from "react-text-truncate";

const AnimePost = ({ anime, animeSelected }) => {
	const [status, setStatus] = useState({
		notice: "Add to List",
		statusColor: "",
	});

	const [isSelected, setIsSelected] = useState(0);

	const API_URL = "https://saitama-back.herokuapp.com/";

	useEffect(() => {}, []);

	const onAnimeSelected = () => {
		animeSelected(anime.mal_id);
	};

	return (
		<div className="column">
			<div
				className="ui card"
				style={{ width: "max-content" }}
				onClick={() => {
					onAnimeSelected();
				}}
			>
				<div class="image">
					<img
						src={anime.image_url}
						className={
							isSelected
								? "img-random-bar-selected"
								: "img-random-bar"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnimePost;
