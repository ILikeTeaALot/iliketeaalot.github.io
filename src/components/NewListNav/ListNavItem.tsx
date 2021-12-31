import React from "react";

interface Props {
	accent?: string;
	to: string;
	onClick?: React.MouseEventHandler;
}

export const ListNavItem: React.FunctionComponent<Props> = (props) => {
	const handleClick: React.MouseEventHandler = (e) => {
		e.preventDefault();
		if (props.onClick) { props.onClick(e); return; }
		// const y = getComputedStyle(document.documentElement).getPropertyValue("--y-position");
		// console.log(y)
		// console.log((document.querySelector(props.to)?.getBoundingClientRect().y || 0) - parseInt(y));
		// window.scrollTo({ behavior: "smooth", top: document.querySelector(props.to)?.getBoundingClientRect().y });
		document.querySelector(props.to)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<li onClick={handleClick}>
			<a href={props.to}>{props.children}</a>
		</li>
	);
};