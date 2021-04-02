import React, { useState } from "react";
import ErrorBar from "../ErrorBar";

const SignupForm = ({ OnLoginSubmit }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState([""]);
	const [invalidCreds, setInvalidCreds] = useState(0);

	const VerifySignup = () => {
		fetch(
			`http://localhost:3000/userSignup?username=${username}&password=${password}&email=${email}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.status) {
					OnLoginSubmit(1, data.userID, username);
				} else {
					setErrorMsg(data.message);
					setInvalidCreds(1);
				}
			});
	};

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
						<label>Email</label>
						<input
							type="text"
							name="last-name"
							placeholder=""
							onChange={(e) => {
								setEmail(e.target.value);
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
						<button
							className="ui button"
							type="button"
							onClick={() => {
								VerifySignup();
							}}
						>
							Signup
						</button>
					</div>
					{invalidCreds ? (
						<ErrorBar msg={errorMsg.toString("")} />
					) : null}
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
