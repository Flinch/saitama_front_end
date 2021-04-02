import React, { useState, useEffect } from "react";
import "./AnimeListings.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import TextTruncate from "react-text-truncate";

const AnimePost = ({ anime, userID, duration }) => {
	const [status, setStatus] = useState({
		notice: "Add to List",
		statusColor: "",
	});

	useEffect(() => {
		AOS.init({});
	}, []);

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
				if (data.notice.toString() === "Mal has already been taken") {
					setStatus({
						notice: "Already Added to List",
						statusColor: "yellow",
					});
					console.log(status.color);
				} else {
					setStatus(data);
				}
			})
			.catch((error) => {
				if (error.response) {
					setStatus({
						notice: "Something Went Wrong. Try again",
						statusColor: "red",
					});
				}
			});
	};

	return (
		<div class="column" data-aos="fade-right">
			<div class="ui fluid card">
				<div class="content" style={{ BackgroundColor: "#E0E1E2" }}>
					<p class="ui center aligned header">{anime.title}</p>
				</div>
				<div class="ui slide masked reveal image">
					<img
						src={anime.image_url}
						className="visible content max-height"
					/>

					<div
						class="hidden content slide"
						style={{ overflow: "auto" }}
					>
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
