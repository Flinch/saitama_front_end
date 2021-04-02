import React from "react";
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
		this.setState({ isloggedin: 0, userID: 0 });
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
				<Router>
					<div>
						<Sidebar.Pushable as={Segment}>
							<Sidebar
								as={Menu}
								animation="overlay"
								icon="labeled"
								inverted
								vertical
								visible
								width="thin"
							>
								<Menu.Item as="a">
									<Icon name="napster" size="large" />

									{this.Capitalize(this.state.username)}
								</Menu.Item>
								<Menu.Item
									as="a"
									className="logout-button"
									onClick={this.logUserOut}
								>
									{" "}
									<Icon name="paper plane" />
									Logout
								</Menu.Item>
							</Sidebar>
							<Sidebar.Pusher>
								<Redirect to="/home" />
								<Segment
									basic
									style={{
										overflow: "auto",
										height: "100vh",
									}}
								>
									<div className="sticky ui two item menu">
										<Menu.Item
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
										{/*<Menu.Item
											as={Link}
											to=""
											name="feeling_lucky"
											active={
												this.state.activeItem ===
												"feeling_lucky"
											}
											onClick={this.handleItemClick}
										>
											Feeling Lucky
										</Menu.Item>*/}
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
										{/*<Route path="/about">
											<Home />
										</Route>*/}
									</Switch>
								</Segment>
							</Sidebar.Pusher>
						</Sidebar.Pushable>
					</div>
				</Router>
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
