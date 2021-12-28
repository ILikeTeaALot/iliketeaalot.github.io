import React from "react";

export const ListNav: React.FunctionComponent = (props) => {
	return (
		<li>
			<a>{props.children}</a>
		</li>
	);
};