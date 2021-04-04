import React, { useState, useEffect } from "react";
import SuchEmpty from "./SuchEmpty";
import AnimeListingsCollections from "./AnimeListingsCollections";
import Loading from "../Loading";

class Collections extends React.Component {
	state = { anime: [], emptyCollections: 0, isLoading: 0 };

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.setState({ isLoading: 1 });
		const API_URL = "https://saitama-back.herokuapp.com/";
		fetch(`${API_URL}/getUserAnime?userID=${this.props.userID}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.length == 0) {
					this.setState({ emptyCollections: 1 });
				}
				this.setState({ anime: data });
				this.setState({ isLoading: 0 });
			});
	};

	render() {
		return (
			<div>
				{this.state.isLoading ? (
					<Loading />
				) : (
					<AnimeListingsCollections anime_data={this.state.anime} />
				)}
				{this.state.emptyCollections ? <SuchEmpty /> : ""}
			</div>
		);
	}
}

export default Collections;
