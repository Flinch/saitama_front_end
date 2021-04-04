import React from "react";

class SearchBar extends React.Component {
	state = { term: "" };

	constructor(props) {
		super(props);
	}

	OnTermChange = (event) => {
		this.setState({ term: event.target.value });
		{
			/*if (this.state.term.length > 2) {
			this.props.OnInputSubmit(this.state.term);
		}*/
		}
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
						<label> {this.props.msg} </label>
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
