import React, { useState, useEffect, Component, createRef } from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import axios from "axios";
import "./App.css";
import Home from "./Home";
import Collections from "./Collections";
import LandingPage from "../sessions/LandingPage";
import {
	Header,
	Icon,
	Image,
	Menu,
	Segment,
	Sidebar,
	Sticky,
	Ref,
} from "semantic-ui-react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

class App extends React.Component {
	contextRef = createRef();
	state = {
		animes: [],
		isloggedin: 0,
		userID: 0,
		username: "",
		activeItem: "home",
	};

	constructor() {
		super();
		this.contextRef = React.createRef();
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	Capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	logUserOut = () => {
		this.setState({ isloggedin: 0, userID: 0, activeItem: "home" });
	};

	OnLoginSubmit = (isLoggedin, userID, username) => {
		this.setState({
			isloggedin: isLoggedin,
			userID: userID,
			username: username,
		});
	};

	render() {
		if (this.state.isloggedin) {
			return (
				<div>
					<div className="ui visible labeled icon inverted vertical menu sidebar">
						<a class="item">
							<i class="napster icon"></i>
							{this.Capitalize(this.state.username)}
						</a>
						<a class="item logout-button" onClick={this.logUserOut}>
							<i class="paper plane layout icon"></i>
							Logout
						</a>
					</div>
					<div className="pusher">
						<Router>
							<Redirect to="/home" />
							<Segment basic>
								<div className="ui Segment">
									<div className="ui sticky">
										<div className=" ui two item menu">
											<Menu.Item
												as={Link}
												to="/home"
												name="home"
												active={
													this.state.activeItem ===
													"home"
												}
												onClick={this.handleItemClick}
											>
												Home
											</Menu.Item>

											<Menu.Item
												as={Link}
												to="/collections"
												name="collections"
												active={
													this.state.activeItem ===
													"collections"
												}
												onClick={this.handleItemClick}
											>
												Collections
											</Menu.Item>
										</div>
									</div>
								</div>

								<Switch>
									<Route exact path="/home">
										<Home userID={this.state.userID} />
									</Route>
									<Route path="/collections">
										<Collections
											userID={this.state.userID}
										/>
									</Route>
									<Route path="/about">
										<Home />
									</Route>
								</Switch>
							</Segment>
						</Router>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Router>
						<Redirect to="/" />
						<LandingPage OnLoginSubmit={this.OnLoginSubmit} />
					</Router>
				</div>
			);
		}
	}
}

export default App;
