import React, { useState, useEffect } from "react";
import SuchEmpty from "./SuchEmpty";
import AnimeListingsCollections from "./AnimeListingsCollections";

class Collections extends React.Component {
	state = { anime: [], emptyCollections: 0 };

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		fetch(`http://localhost:3000/getUserAnime?userID=${this.props.userID}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.length == 0) {
					this.setState({ emptyCollections: 1 });
				}
				this.setState({ anime: data });
			});
	};

	render() {
		return (
			<div>
				<AnimeListingsCollections anime_data={this.state.anime} />
				{this.state.emptyCollections ? <SuchEmpty /> : ""}
			</div>
		);
	}
}

export default Collections;
