import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import ErrorBar from "../ErrorBar";
import AnimeListings from "./AnimeListings";
import saitama from "../img/saitama-50.svg";
import Loading from "../Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

class Home extends React.Component {
	state = {
		animes: [],
		isloggedin: 0,
		userID: this.props.userID,
		firstLogin: "",
		getError: 0,
		isLoading: 0,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount = (props) => {
		AOS.init({
			// initialise with other settings
			duration: 2000,
		});
		this.setState({ firstLogin: "firstLogin" });
	};

	OnInputSubmit = async (term) => {
		this.setState({ firstLogin: 0 });
		this.setState({ animes: [] });

		axios
			.get(`https://api.jikan.moe/v3/search/anime?q=${term}&limit=5`)
			.then((res) => {
				this.setState({ getError: 0 });
				const anime_results = res.data.results;
				this.setState({ animes: anime_results });
				this.setState({ isLoading: 0 });
			})
			.catch((error) => {
				if (error.response) {
					this.setState({ getError: 1 });
				}
			});
	};

	logUserOut = () => {
		this.setState({ isloggedin: 0 });
	};

	render() {
		if (this.state.isLoading) {
			return (
				<div>
					<Loading />;
				</div>
			);
		} else {
			return (
				<div style={{ height: "100vh", overflow: "hidden" }}>
					<div className={this.state.firstLogin}>
						<div data-aos="fade-up">
							{this.state.firstLogin === "firstLogin" ? (
								<img
									className="saitama-img hvr-bob"
									src={saitama}
								/>
							) : (
								""
							)}
						</div>
						<SearchBar
							OnInputSubmit={this.OnInputSubmit}
							msg="Add to your favorite animes"
						/>
						{this.state.getError ? (
							<div className="error-bar">
								<ErrorBar msg="Oops, we couldn't find that. Try another search" />
							</div>
						) : (
							""
						)}
					</div>

					<AnimeListings
						anime_data={this.state.animes}
						userID={this.state.userID}
					/>
				</div>
			);
		}
	}
}

export default Home;
