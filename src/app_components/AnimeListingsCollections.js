import React, { useState, useEffect } from "react";
import AnimePostCollections from "./AnimePostCollections";
import "./AnimeListings.css";

const AnimeListingsCollections = ({ anime_data, userID, triggerRefresh }) => {
	const [editClick, setEditClick] = useState(0);
	const Listings = anime_data.map((anime) => {
		return (
			<AnimePostCollections
				anime={anime}
				key={anime.mal_id}
				userID={userID}
				triggerRefresh={triggerRefresh}
				editClick={editClick}
			/>
		);
	});

	useEffect(() => {
		console.log("re-render!");
	}, [editClick]);

	const onEditClick = () => {
		setEditClick(!editClick);
	};

	return (
		<div>
			<div className="container-editBox">
				<div class="ui toggle checkbox">
					<input
						type="checkbox"
						name="public"
						onClick={() => {
							onEditClick();
						}}
					/>
					<label>Edit Mode</label>
				</div>
			</div>
			<div className="ui five column grid">{Listings}</div>
		</div>
	);
};

export default AnimeListingsCollections;
