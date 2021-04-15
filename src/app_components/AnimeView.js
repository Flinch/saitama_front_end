import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Discovery.css";
import youtube from "../api/youtube";

const AnimeView = ({ anime }) => {
	const [animeDetail, setAnimeDetail] = useState({});
	const [trailerURL, setTrailerURL] = useState("");
	const [genreArry, setgenreArry] = useState([]);

	useEffect(() => {
		try {
			axios.get(`https://api.jikan.moe/v3/anime/${anime}`).then((res) => {
				setAnimeDetail(res.data);

				if (res.data.trailer_url != null) {
					setTrailerURL(
						res.data.trailer_url.replace("autoplay=1", "autoplay=0")
					);
				} else {
					try {
						const response = youtube.get("/search", {
							params: { q: `${animeDetail.title} trailer` },
						});

						setTrailerURL(
							`https://www.youtube.com/embed/${response.data.items[0].id.videoId}`
						);
					} catch (err) {
						setTrailerURL(
							`https://images.drivereasy.com/wp-content/uploads/2017/10/this-video-is-not-available-1.jpg`
						);
						console.log(err);
					}
				}
				setgenreArry([]);
				res.data.genres.map((g) => {
					setgenreArry((genreArry) => genreArry.concat(g.name));
				});
			});
		} catch (err) {
			console.log(err);
		}
	}, [anime]);

	const removeAutoplay = (url) => {
		var src = url.replace("autoplay=1", "autoplay=0");
		return src;
	};

	return (
		<div className="row ui three column grid anime-view">
			<div className="column stats">
				<h2>
					{" "}
					{animeDetail.score == null
						? "No Score Yet"
						: animeDetail.score}{" "}
				</h2>
				<p>
					{" "}
					Genres:
					{genreArry.map((gen) => `  ${gen},`)}
				</p>
				<p> Episodes : {animeDetail.episodes} </p>
				<p> Popularity : {animeDetail.popularity} </p>
				<p>
					{" "}
					Rank: {animeDetail.rank == null
						? "None"
						: animeDetail.rank}{" "}
				</p>
				<p> Status: {animeDetail.status} </p>
				<p> Premiered: {animeDetail.premiered} </p>
			</div>
			<div className="column title">
				<h2> {animeDetail.title} </h2>

				<div className="ui embed">
					<iframe title="video player" src={trailerURL} />
				</div>
			</div>
			<div className="column synopsis">
				<h2> Synopsis </h2>
				<p style={{ lineHeight: "2" }}> {animeDetail.synopsis} </p>
			</div>
		</div>
	);
};

export default AnimeView;
