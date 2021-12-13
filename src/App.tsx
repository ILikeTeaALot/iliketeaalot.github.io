import React from "react";
import "./App.css";
import "./fonts/fonts.css";

interface Props {

}

interface State {
	scrollPosition: number;
	showProjects: boolean;
}

export class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			scrollPosition: window.scrollY,
			showProjects: window.scrollY >= window.innerHeight / 2,
		};
	}

	doNothing: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
	};

	scrollToProjects: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
	};

	handleScroll = () => {
		if (window.scrollY > window.innerHeight / 2) {
			document.body.style.backgroundColor = "#FFFFFF";
		} else {
			document.body.style.backgroundColor = "var(--beige)";
		}
		this.setState({ scrollPosition: window.scrollY, showProjects: window.scrollY >= window.innerHeight / 2 });
	};

	componentDidMount = () => {
		document.addEventListener("scroll", this.handleScroll);
		window.addEventListener("resize", this.handleScroll);
	};

	componentWillUnmount = () => {
		document.removeEventListener("scroll", this.handleScroll);
		window.removeEventListener("resize", this.handleScroll);
	};

	signatureHeading = () => {
		return (
			<h2 className="signature" aria-hidden>
				<div style={{ maxWidth: this.state.showProjects ? "0" : "4ch", opacity: this.state.showProjects ? 0 : 1, justifyContent: "flex-end" }}>I'm </div>
				<div>Madeline Hart.</div>
			</h2>
		);
	};

	// Smaller numbers result in large-size links further down the page
	// Original divisor was 1.4; It was too accurate
	// Good values: 1.2, 1.4, 1.5
	useSmallLinks = () => this.state.scrollPosition >= window.innerHeight / 1.4;

	render() {
		// <nav className="navbar" style={{ opacity: this.state.showProjects ? 1 : 0, /* transitionDelay: this.state.showProjects ? "820ms" : "0ms" */ }}>{this.signatureHeading()}</nav>
		return (
			<>
				{/* <div id="dynamic-background" style={{ background: this.state.scrollPosition > window.innerHeight / 2 ? "#FFFFFF" : "var(--beige)" }} /> */}
				<div className="main">
					<div className="front-page">
						{/* Navbar was here */}
						<div style={{ justifyContent: "flex-end", alignContent: "center" }}>
							<h1 className="signature">hello</h1>
						</div>
					</div>
					<div className="navbar" style={{ top: 0, overflow: "visible", backgroundColor: "inherit" }}>{this.signatureHeading()}</div>
					<div style={{ minHeight: "20vh" }}>
						{/* <h2 className="signature invisible">I'm Madeline Hart.</h2> */} {/* accomodate accessibilty and layout */}
						<div style={{ justifyContent: "flex-start", alignContent: "center" }}>
							{/* <h2 className="signature">I'm Madeline Hart.</h2> */}
							{/* {this.signatureHeading()} */}
							<p className="copy">I'm a front-end web developer and UX designer, and this is my portfolio.</p>
							{/* <p className="copy">I make websites & apps, and this is my portfolio.</p> */}
							<p className="copy">This portfolio was made entirely in vanilla React JS.</p>
							<p className="copy">I am highly skilled in React (Web & Native), and I have a passion for making elegant, frictionless, and calming user experiences.</p>
							{/* <p className="copy">My web-development work is primarily focused on React.JS, and I have good experience in React-Native for mobile.</p>
							<p className="copy">“Do one thing, and do it well”</p> */}
						</div>
					</div>
					{/* TODO: Make work better on mobile */}
					<div className={this.useSmallLinks() ? "navbar links small" : "navbar links"}>
						<div><a onClick={this.doNothing} href="/contact">contact</a></div>
						<div><a onClick={this.scrollToProjects} href="/projects">view projects</a></div>
						<div><a onClick={this.doNothing} href="/about">about</a></div>
					</div>
					<div className="padding" aria-hidden />
					<div className="page" style={{ opacity: this.state.showProjects ? 1 : 0 }}>
						{/* <div>
							<h1 className="heading">My work</h1>
						</div> */}
						<div className="project">
							<div className="project-info">
								<h1 className="title">June</h1>
							</div>
							<div className="project-showcase">
								<div style={{ height: "200vh" }} />
							</div>
						</div>
					</div>
					<div className="page" style={{ opacity: this.state.showProjects ? 1 : 0 }}>
						{/* <div>
							<h1 className="heading">My work</h1>
						</div> */}
						<div className="project">
							<div className="project-info">
								<h1 className="title">MobileTrainTimes</h1>
							</div>
							<div className="project-showcase">
								<div style={{ height: "200vh" }} />
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default App;
