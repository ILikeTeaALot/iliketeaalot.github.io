import React from "react";
import "./style.css";

interface Props {
	show?: boolean;
	onClose?: React.MouseEventHandler;
	onClick?: React.MouseEventHandler;
}

export const ListNav: React.FunctionComponent<Props> = (props) => {
	return (
		<div className="list-nav" style={{ opacity: props.show ? 1 : 0, pointerEvents: props.show ? "all" : "none" }} onClick={props.onClick}>
			<div id="nav-top"></div>
			<ul>
				{props.children}
			</ul>
			<div id="nav-bottom"></div>
		</div>
	);
};