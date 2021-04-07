import React from "react";
import "./App.css";

class SearchBarCollections extends React.Component {
	state = { term: "" };

	constructor(props) {
		super(props);
	}

	OnTermChange = (event) => {
		this.setState({ term: event.target.value }, () => {
			this.props.OnInputSubmit(this.state.term.toLowerCase());
		});
	};

	OnSubmit = (event) => {
		event.preventDefault();
		this.props.OnInputSubmit(this.state.term);
	};

	render() {
		return (
			<div className="ui category search">
				{" "}
				<br />
				<div className="ui icon input" onSubmit={this.OnSubmit}>
					<label id="formHome"> {this.props.msg} </label>
					<input
						type="text"
						placeholder="search your collection ..."
						value={this.state.term}
						onChange={this.OnTermChange}
					/>
					<i class="search icon"></i>
				</div>
			</div>
		);
	}
}

export default SearchBarCollections;
