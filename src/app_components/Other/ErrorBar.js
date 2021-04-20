import React from "react";

const ErrorBar = ({ msg }) => {
	return (
		<div className="ui negative message">
			<div className="header">{msg}</div>
		</div>
	);
};

export default ErrorBar;
