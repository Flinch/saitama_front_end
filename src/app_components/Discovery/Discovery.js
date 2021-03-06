import React from "react";
import axios from "axios";
import RandomBar from "./RandomBar";
import LoadingBar from "../Other/Loading.js";
import AnimeView from "./AnimeView";
import ls from "local-storage";
import dice from "../../img/dice.svg";
import "./Discovery.css";

const genre = [
	1,
	2,
	6,
	7,
	8,
	9,
	10,
	14,
	16,
	17,
	18,
	19,
	21,
	22,
	24,
	27,
	30,
	31,
	32,
	36,
	37,
	38,
	40,
	41,
];

class Discovery extends React.Component {
	state = {
		randomAnime: [],
		animeCollection: [],
		isLoading: 0,
		animeSelectedID: 0,
		animeView: 0,
		hideButton: 0,
		selected: 0,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		const API_URL = "https://saitama-back.herokuapp.com/";
		fetch(`${API_URL}/getUserAnime?userID=1`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ animeCollection: data, randomAnime: [] });
			});
	};

	inCollection = (anime) => {
		const check = (element) => element.mal_id === anime.mal_id;
		return this.state.animeCollection.some(check);
	};

	inCurrentList = (anime) => {
		const check = (element) => element.mal_id === anime.mal_id;
		return this.state.randomAnime.some(check);
	};

	animeFilterPass = (anime) => {
		if (anime.score > 7) return true;
		return false;
	};

	onInputClick = () => {
		this.setState({ randomAnime: [], isLoading: 1, hideButton: 1 }, () => {
			this.generateRandomAnime();
		});
	};

	onAnimeSelected = (animeID, index) => {
		this.setState(
			{ animeSelectedID: animeID },
			this.setState({ animeView: 1, selected: index })
		);
	};

	generateRandomAnime = async () => {
		var anime_res = [];

		while (anime_res.length < 4) {
			let genreNumber = genre[Math.floor(Math.random() * genre.length)];
			let pageNumber = Math.round(Math.random() * 2 + 0.5);
			let animeNumber = Math.round(Math.random() * 15);

			try {
				await axios
					.get(
						`https://api.jikan.moe/v3/search/anime?&type=TV&page=${pageNumber}&limit=15&genre=${genreNumber}&order_by=score&sort=desc`
					)
					.then((res) => {
						var anime_results = res.data.results[animeNumber];
						if (
							!this.inCollection(anime_results) &&
							!this.inCurrentList(anime_results) &&
							this.animeFilterPass(anime_results)
						)
							anime_res.push(anime_results);
					});
			} catch (err) {
				console.log(err);
			}
		}

		this.setState({ randomAnime: anime_res }, () => {
			setTimeout(() => {
				this.setState({
					isLoading: 0,
					hideButton: 0,
				});

				this.onAnimeSelected(this.state.randomAnime[0].mal_id, 0);
			}, 1000);
		});
	};

	render() {
		return (
			<div>
				{this.state.animeView ? (
					<AnimeView
						anime={this.state.animeSelectedID}
						userID={this.props.userID}
					/>
				) : (
					""
				)}
				<div
					className={
						this.state.animeView
							? "button-container-view"
							: "button-container"
					}
				>
					<img
						src={dice}
						className={
							this.state.hideButton
								? "hideDice"
								: this.state.animeView
								? "reduced-dice"
								: ""
						}
						onClick={this.onInputClick}
					/>
				</div>
				<div
					className={
						this.state.animeView ? "hideDice" : "discovery-title"
					}
				>
					<h4>
						{" "}
						Click on the dice to get rolling. We'll pick out some
						shows we think you ought to see. <br />
					</h4>
				</div>
				{this.state.isLoading ? (
					<div
						className={
							this.state.animeView ? "" : "button-container"
						}
					>
						<LoadingBar />
					</div>
				) : (
					<RandomBar
						animes={this.state.randomAnime}
						animeSelected={this.onAnimeSelected}
						selected={this.state.selected}
					/>
				)}
			</div>
		);
	}
}

export default Discovery;
