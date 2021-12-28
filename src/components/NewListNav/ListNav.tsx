import React from "react";

export const ListNav: React.FunctionComponent = (props) => {
	return (
		<div className="list-nav">
			<ul>
				{props.children}
			</ul>
		</div>
	)
}