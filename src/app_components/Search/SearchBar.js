import React from "react";
import "../App.css";

class SearchBar extends React.Component {
	state = { term: "" };

	constructor(props) {
		super(props);
	}

	OnTermChange = (event) => {
		this.setState({ term: event.target.value });
	};

	OnSubmit = (event) => {
		event.preventDefault();
		this.props.OnInputSubmit(this.state.term);
	};

	render() {
		return (
			<div className="ui container form">
				{" "}
				<br />
				<form className="ui form" onSubmit={this.OnSubmit}>
					<div className="field">
						<label id="formHome"> {this.props.msg} </label>
						<input
							value={this.state.term}
							onChange={this.OnTermChange}
						/>
						<div className="go-button-container">
							<button
								className="ui button go-button"
								onClick={this.onSubmit}
							>
								{" "}
								Go!{" "}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
