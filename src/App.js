import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import AnimeListings from "./AnimeListings";

class App extends React.Component {
	state = { animes: [] };

	OnInputSubmit = async (term) => {
		axios
			.get(`https://api.jikan.moe/v3/search/anime?q=${term}&limit=5`)
			.then((res) => {
				const anime_results = res.data.results;
				this.setState({ animes: anime_results });
			});
	};

	render() {
		return (
			<div>
				<SearchBar OnInputSubmit={this.OnInputSubmit} />
				<AnimeListings anime_data={this.state.animes} />
			</div>
		);
	}
}

export default App;
