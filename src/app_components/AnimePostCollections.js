import React, { useState, useEffect } from "react";
import "./AnimeListings.css";
import "./App.css";

const AnimePostCollections = ({ anime, userID, triggerRefresh, editClick }) => {
	const [status, setStatus] = useState("");
	const [showDelete, setShowDelete] = useState(0);

	useEffect(() => {
		setShowDelete(editClick);
	}, [editClick]);

	const onDeleteAnime = () => {
		const API_URL = "https://saitama-back.herokuapp.com/";
		fetch(`${API_URL}/removeAnime?animeID=${anime.id}&userID=${userID}`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				triggerRefresh();
			})
			.catch((error) => {
				if (error.response) {
					setStatus("Something Went Wrong. Try again");
				}
			});
	};

	return (
		<div className="column">
			<div className="ui fluid card">
				<div className="content">
					<p className="ui center aligned header">{anime.title}</p>
				</div>
				<div className="ui image">
					<img
						src={anime.image}
						className="visible content max-height"
					/>
				</div>
				{showDelete ? (
					<div
						class="extra content center"
						style={{ display: "block" }}
					>
						<span
							class="red"
							style={{ cursor: "pointer" }}
							onClick={() => {
								onDeleteAnime();
							}}
						>
							<i class="trash icon"></i>
							Remove
						</span>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default AnimePostCollections;
