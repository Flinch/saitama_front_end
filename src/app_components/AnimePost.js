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

	const API_URL = "https://saitama-back.herokuapp.com/";

	useEffect(() => {
		AOS.init({});
	}, []);

	const onAnimeSelected = () => {
		fetch(`${API_URL}getanime?anime=${anime.mal_id}&userID=${userID}`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.notice.toString() === "Mal has already been taken") {
					setStatus({
						notice: "Already Added to List",
						statusColor: "yellow",
					});
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
		<div className="column" data-aos="fade-right">
			<div className="ui fluid card">
				<div className="content" style={{ BackgroundColor: "#E0E1E2" }}>
					<p className="ui center aligned header">{anime.title}</p>
				</div>
				<div class="ui slide masked reveal image">
					<img
						src={anime.image_url}
						className="visible content max-height"
					/>

					<div
						className="hidden content slide"
						style={{ overflow: "auto" }}
					>
						{" "}
						<p class="ui center aligned text-black">
							{" "}
							{anime.synopsis}{" "}
						</p>{" "}
					</div>
				</div>
				<div
					className={`ui ${status.statusColor} bottom attached button`}
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
