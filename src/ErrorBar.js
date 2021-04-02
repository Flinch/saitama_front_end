import React from "react";

const ErrorBar = ({ msg }) => {
	return (
		<div class="ui negative message">
			<div class="header">{msg}</div>
		</div>
	);
};

export default ErrorBar;
