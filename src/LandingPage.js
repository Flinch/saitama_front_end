import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./App.css";
import saitama from "./img/saitama.svg";

class LandingPage extends React.Component {
	state = { login: 0 };

	constructor(props) {
		super(props);
	}

	userClickLogin = () => {
		this.setState({ login: 1 });
	};

	userClickSignup = () => {
		this.setState({ login: 0 });
	};

	userClickGuest = () => {
		this.props.OnLoginSubmit(1, 6, "guest");
	};

	on;

	render() {
		return (
			<div className="ui container col-5">
				<div className="landing-page-content">
					<h1>Saitama</h1>
					<button onClick={this.userClickLogin} className="ui button">
						{" "}
						Login Form{" "}
					</button>
					<button
						onClick={this.userClickSignup}
						className="ui button"
					>
						{" "}
						Signup Form{" "}
					</button>{" "}
					<br />
					<img src={saitama} className="saitama" />
				</div>

				{this.state.login ? (
					<LoginForm OnLoginSubmit={this.props.OnLoginSubmit} />
				) : (
					<SignupForm OnLoginSubmit={this.props.OnLoginSubmit} />
				)}
				<div className="guest">
					<p>
						{" "}
						Too shy? Try{" "}
						<a
							onClick={this.userClickGuest}
							style={{ cursor: "pointer" }}
						>
							{" "}
							Guest{" "}
						</a>{" "}
						Login instead{" "}
					</p>
				</div>
			</div>
		);
	}
}

export default LandingPage;
