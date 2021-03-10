import React from "react";

class SearchBar extends React.Component {
	state = { term: "" };

	OnTermChange = (event) => {
		this.setState({ term: event.target.value });
		//console.log(this.state.term);
	};

	OnSubmit = (event) => {
		event.preventDefault();
		this.props.OnInputSubmit(this.state.term);
	};

	render() {
		return (
			<div className="ui form">
				<form className="ui form" onSubmit={this.OnSubmit}>
					<div className="field">
						<label> Enter Search </label>
						<input
							value={this.state.term}
							onChange={this.OnTermChange}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
