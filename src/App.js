import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import LoginForm from "./LoginForm";
import "./App.css";
import Home from "./Home";
import Collections from "./Collections";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
	state = { animes: [], isloggedin: 0, userID: 0 };

	OnInputSubmit = async (term) => {
		axios
			.get(`https://api.jikan.moe/v3/search/anime?q=${term}&limit=5`)
			.then((res) => {
				const anime_results = res.data.results;
				this.setState({ animes: anime_results });
			});
	};

	logUserOut = () => {
		this.setState({ isloggedin: 0, userID: 0 });
	};

	OnLoginSubmit = (isLoggedin, userID) => {
		this.setState({ isloggedin: isLoggedin });
		this.setState({ userID: userID });
	};

	render() {
		if (!this.state.isloggedin) {
			return <LoginForm OnLoginSubmit={this.OnLoginSubmit} />;
		} else {
			return (
				<Router>
					<div style={{ height: "100vh" }}>
						<Sidebar.Pushable as={Segment}>
							<Sidebar
								as={Menu}
								animation="overlay"
								icon="labeled"
								inverted
								vertical
								visible
								width="extra-thin"
							>
								<Menu.Item as="a">
									<Icon name="napster" />
									<Link to="/">Home</Link>
								</Menu.Item>
								<Menu.Item as="a">
									<Icon name="book" />
									<Link to="/collections">Collections</Link>
								</Menu.Item>
								<Menu.Item
									as="a"
									style={{
										position: "absolute",
										bottom: "0px",
									}}
									onClick={this.logUserOut}
								>
									<Icon name="napstere" />
									Malik
								</Menu.Item>
							</Sidebar>
							<Sidebar.Pusher>
								<Segment
									basic
									style={{
										overflow: "auto",
										maxHeight: "100vh",
									}}
								>
									<Switch>
										<Route exact path="/">
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
		}
	}
}

export default App;
