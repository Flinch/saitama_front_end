import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import AnimeListings from "./AnimeListings";
import LoginForm from "./LoginForm";

class App extends React.Component {
	state = { animes: [], isloggedin: 0, userID: 0 };

	OnInputSubmit = async (term) => {
		axios
			.get(`https://api.jikan.moe/v3/search/anime?q=${term}&limit=5`)
			.then((res) => {
				const anime_results = res.data.results;
				this.setState({ animes: anime_results });
			});
	};

	logUserOut = () => {
		fetch(`http://localhost:3000/destroysession`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	OnLoginSubmit = async (isLoggedin, userID) => {
		this.setState({ isloggedin: isLoggedin });
		this.setState({ userID: userID });
		console.log(this.state.userID);
	};

	render() {
		if (!this.state.isloggedin) {
			return <LoginForm OnLoginSubmit={this.OnLoginSubmit} />;
		} else {
			return (
				<div>
					<button onClick={this.logUserOut}> Log out </button>
					<SearchBar OnInputSubmit={this.OnInputSubmit} />
					<AnimeListings
						anime_data={this.state.animes}
						userID={this.state.userID}
					/>
				</div>
			);
		}
	}
}

export default App;
