import React from "react";
import "./style.css";

interface MenuProps {
	show?: boolean;
	onClose?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const NewNav: React.FunctionComponent<MenuProps> = (props) => {
	return (
		<section className="big-nav" style={{ opacity: props.show ? 1 : 0, pointerEvents: props.show ? "initial" : "none" }}>
			<section className="big-nav-static">
				<a onClick={props.onClose} href="/" style={{ display: "inline-flex", color: "white", textDecoration: "none" }}>back</a>
				<h2 className="title" style={{ color: "white", marginRight: "auto" }}>Menu - Contents</h2>
			</section>
			{props.children}
		</section>
	);
};