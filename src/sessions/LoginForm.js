import React, { useState, useCallback } from "react";
import ErrorBar from "../ErrorBar";

const LoginForm = ({ OnLoginSubmit }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [incorrectCreds, setIncorrectCreds] = useState(0);
	const [loginLoad, setLoginLoader] = useState(1);
	const API_URL = "https://saitama-back.herokuapp.com/";

	const VerifyLogin = useCallback(() => {
		setLoginLoader(0);
		fetch(`${API_URL}getuser?user=${username}&password=${password}`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				OnLoginSubmit(data.isUser, data.userID, data.username);
				setIncorrectCreds(1);
				setLoginLoader(1);
			});
	});

	return (
		<div className="ui card login-form">
			<div className="content" style={{ backgroundColor: "white" }}>
				<form className="container ui form">
					<div className="field">
						<label>Username</label>
						<input
							type="text"
							name="first-name"
							placeholder=""
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</div>
					<div className="field">
						<label>Password</label>
						<input
							type="password"
							name="password"
							placeholder=""
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className="center">
						{loginLoad ? (
							<button
								className="ui button"
								type="button"
								onClick={() => {
									VerifyLogin();
								}}
							>
								Login
							</button>
						) : (
							<div class="ui active inline loader"></div>
						)}
					</div>
					{incorrectCreds ? (
						<ErrorBar msg="We couldn't verify your credentials" />
					) : null}
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
