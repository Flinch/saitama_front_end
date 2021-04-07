import React, { useState, useEffect } from "react";
import AnimePostCollections from "./AnimePostCollections";
import { Icon, Popup } from "semantic-ui-react";
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

	const onEditClick = () => {
		setEditClick(!editClick);
	};

	return (
		<div>
			<div className="container-editBox">
				<Popup
					content="Click to make changes"
					trigger={
						<i
							onClick={() => {
								onEditClick();
							}}
							className={
								editClick
									? "large lock open icon"
									: "large lock icon"
							}
							style={{ cursor: "pointer" }}
						>
							{" "}
						</i>
					}
				/>
			</div>
			<div className="ui five column grid">{Listings}</div>
		</div>
	);
};

export default AnimeListingsCollections;
