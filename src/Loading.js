import React from "react";

const Loading = (props) => {
	return (
		<div
			className="ui active centered inline loader"
			style={{ marginTop: "300px" }}
		>
			<div className="ui text loader">{props.message}</div>
		</div>
	);
};

Loading.defaultProps = {
	message: "Loading...",
};

export default Loading;
