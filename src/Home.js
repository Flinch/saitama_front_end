import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import AnimeListings from "./AnimeListings";

class Home extends React.Component {
	state = { animes: [], isloggedin: 0, userID: this.props.userID };

	constructor(props) {
		super(props);
	}

	componentDidMount = (props) => {};
	OnInputSubmit = async (term) => {
		axios
			.get(`https://api.jikan.moe/v3/search/anime?q=${term}&limit=5`)
			.then((res) => {
				const anime_results = res.data.results;
				this.setState({ animes: anime_results });
			});
	};

	logUserOut = () => {
		this.setState({ isloggedin: 0 });
	};

	render() {
		return (
			<div>
				<SearchBar OnInputSubmit={this.OnInputSubmit} />
				<AnimeListings
					anime_data={this.state.animes}
					userID={this.state.userID}
				/>
			</div>
		);
	}
}

export default Home;
