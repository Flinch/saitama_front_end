import React, { useState, useEffect } from "react";
import AnimeListingsCollections from "./AnimeListingsCollections";

class Collections extends React.Component {
	state = { anime: [] };

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		fetch(`http://localhost:3000/getUserAnime?userID=${this.props.userID}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ anime: data });
			});
	};

	render() {
		return (
			<div>
				<AnimeListingsCollections anime_data={this.state.anime} />
			</div>
		);
	}
}

export default Collections;
