import React, { useState } from "react";
import ErrorBar from "./ErrorBar.js";

const LoginForm = ({ OnLoginSubmit }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [incorrectCreds, setIncorrectCreds] = useState(0);

	const VerifyLogin = (event) => {
		fetch(
			`http://localhost:3000/getuser?user=${username}&password=${password}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				OnLoginSubmit(data.isUser, data.userID);
				setIncorrectCreds(1);
			});
	};

	return (
		<div>
			<form class="container ui form">
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
						type="text"
						name="last-name"
						placeholder=""
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<button
					class="ui button"
					type="button"
					onClick={() => {
						VerifyLogin();
					}}
				>
					Submit
				</button>
				{incorrectCreds ? <ErrorBar /> : null}
			</form>
		</div>
	);
};

export default LoginForm;
