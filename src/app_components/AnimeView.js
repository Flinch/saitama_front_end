import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Discovery.css";
import AOS from "aos";
import youtube from "../api/youtube";
import loader from "../Loading";

const AnimeView = ({ anime }) => {
	const [animeDetail, setAnimeDetail] = useState({});
	const [trailerURL, setTrailerURL] = useState("");
	const [genreArry, setgenreArry] = useState([]);

	useEffect(() => {
		AOS.init({});

		try {
			axios.get(`https://api.jikan.moe/v3/anime/${anime}`).then((res) => {
				setAnimeDetail(res.data);
				try {
					const response = youtube.get("/search", {
						params: { q: `${animeDetail.title} trailer` },
					});

					setTrailerURL(
						`https://www.youtube.com/embed/${response.data.items[0].id.videoId}`
					);
				} catch (err) {
					if (res.data.trailer_url != null) {
						setTrailerURL(
							res.data.trailer_url.replace(
								"autoplay=1",
								"autoplay=0"
							)
						);
					} else {
						setTrailerURL(
							`https://images.drivereasy.com/wp-content/uploads/2017/10/this-video-is-not-available-1.jpg`
						);
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
		<div
			className="ui three column grid anime-view"
			style={{ fontFamily: "QuickSand" }}
		>
			<div className="column stats">
				<h2 className="hot-p">
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
				<p>
					{" "}
					Popularity :{" "}
					<span className="hot-p">{animeDetail.popularity}</span>{" "}
				</p>
				<p>
					{" "}
					Rank:{" "}
					<span className="hot-p">
						{animeDetail.rank == null ? "None" : animeDetail.rank}{" "}
					</span>
				</p>
				<p> Status: {animeDetail.status} </p>
				<p> Premiered: {animeDetail.premiered} </p>
			</div>
			<div className="column title">
				<h2 style={{ fontFamily: "Orbitron" }}>
					{" "}
					{animeDetail.title} <br />{" "}
					<span style={{ fontSize: "15px" }} className="hot-p">
						{animeDetail.title_japanese}
					</span>
				</h2>

				<div className="ui embed">
					<iframe title="video player" src={trailerURL} />
				</div>
			</div>
			<div className="column" style={{ width: "36%" }}>
				<div className=" synopsis-title">
					<h2 style={{ fontFamily: "Orbitron" }}> Synopsis </h2>
				</div>
				<div className="synopsis">
					<p style={{ lineHeight: "2" }}> {animeDetail.synopsis} </p>
				</div>
			</div>
		</div>
	);
};

export default AnimeView;
