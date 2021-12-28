import React from "react";

interface Props {
	accent: string;
	onReadyToNavigate?: () => void;
}

export const Panel: React.FunctionComponent<Props> = (props) => {
	const [shouldPlayAnimation, setAnimationState] = React.useState(false);
	const [isAnimationDone, setAnimationDone] = React.useState(false);
	const playAnimation = () => {
		setAnimationState(true);
	};
	const handleAnimationEnd: React.AnimationEventHandler = (e) => {
		console.log(e.animationName);
		if (e.animationName === "big-nav-horizontal") {
			setAnimationDone(true);
			console.log("animation done");
			if (props.onReadyToNavigate) props.onReadyToNavigate();
		};
	};
	return (
		<div className="panel" onClick={playAnimation} onAnimationEnd={handleAnimationEnd}>
			<h2>{props.children}</h2>
			<div className={shouldPlayAnimation ? "animate" : ""} style={{ backgroundColor: props.accent }} />
		</div>
	);
};