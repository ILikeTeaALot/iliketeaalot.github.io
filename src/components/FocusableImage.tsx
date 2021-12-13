import React from "react";

export const FocusableImage: React.FunctionComponent = (props) => {
	const [isZoomed, setZoomed] = React.useState(false);
	const toggleZoom = () => {
		setZoomed(!isZoomed);
	};
	return (
		<img onClick={toggleZoom} />
	);
};