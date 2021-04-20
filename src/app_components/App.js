import React, { useState, useEffect, Component, createRef } from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import axios from "axios";
import "./App.css";
import Home from "./Search/Home";
import Collections from "./Collections/Collections";
import Discovery from "./Discovery/Discovery";
import LandingPage from "../sessions/LandingPage";
import ls from "local-storage";
import DarkMode from "./Other/DarkMode.js";
import {
	Button,
	Grid,
	Checkbox,
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
	state = {
		animes: [],
		isloggedin: 0,
		userID: 0,
		username: "",
		activeItem: "home",
		visible: false,
	};

	constructor() {
		super();
	}

	componentDidMount() {
		this.setState({
			isloggedin: ls.get("loginToken"),
			userID: ls.get("userID"),
			username: ls.get("username"),
		});
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	Capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	logUserOut = () => {
		ls.set("loginToken", 0);
		ls.set("userID", 0);
		this.setState({ isloggedin: 0, userID: 0, activeItem: "home" });
	};

	OnLoginSubmit = (isLoggedin, userID, username) => {
		this.setState({
			isloggedin: isLoggedin,
			userID: userID,
			username: username,
		});

		ls.set("loginToken", isLoggedin);
		ls.set("userID", userID);
		ls.set("username", username);
	};

	render() {
		if (this.state.isloggedin) {
			return (
				<div>
					<DarkMode onSelectTheme={this.onSelectTheme} />
					<Router>
						<Icon
							name="big bars"
							className="menu-bars"
							onClick={() => {
								this.setState({ visible: true });
							}}
						/>
						<Sidebar
							as={Menu}
							animation="overlay"
							icon="labeled"
							inverted
							onHide={() => this.setState({ visible: false })}
							vertical
							visible={this.state.visible}
							width="very-thin"
						>
							<Menu.Item
								style={{ paddingTop: "20px" }}
								as={Link}
								to="/home"
								name="home"
								onClick={this.handleItemClick}
							>
								<i class="napster icon"></i>
								{this.Capitalize(this.state.username)}
							</Menu.Item>

							<a
								class="item logout-button"
								onClick={this.logUserOut}
							>
								<i class="paper plane layout icon"></i>
								Logout
							</a>
						</Sidebar>
						<div className="pusher">
							<Redirect to="/home" />
							<Segment basic>
								<div className=" ui three item menu">
									<Menu.Item
										id="menu1"
										as={Link}
										to="/home"
										name="home"
										active={
											this.state.activeItem === "home"
										}
										onClick={this.handleItemClick}
									>
										Home
									</Menu.Item>

									<Menu.Item
										id="menu2"
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
									<Menu.Item
										id="menu3"
										as={Link}
										to="/discovery"
										name="discovery"
										active={
											this.state.activeItem ===
											"discovery"
										}
										onClick={this.handleItemClick}
									>
										Discovery
									</Menu.Item>
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
									<Route path="/discovery">
										<Discovery userID={this.state.userID} />
									</Route>
								</Switch>
							</Segment>
						</div>
					</Router>
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
