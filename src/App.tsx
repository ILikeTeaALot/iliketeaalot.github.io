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
			showProjects: false,
		}
	}

	doNothing: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
	}

	handleScroll = () => {
		if (window.scrollY > window.innerHeight / 2) {
			document.body.style.backgroundColor = "#FFFFFF";
		} else {
			document.body.style.backgroundColor = "var(--beige)";
		}
		this.setState({ scrollPosition: window.scrollY, showProjects: window.scrollY >= window.innerHeight / 2 });
	}

	componentDidMount = () => {
		document.addEventListener("scroll", this.handleScroll);
		window.addEventListener("resize", this.handleScroll);
	}

	componentWillUnmount = () => {
		document.removeEventListener("scroll", this.handleScroll);
		window.removeEventListener("resize", this.handleScroll);
	};

	signatureHeading = () => {
		return (
			<h2 className="signature">
				<div style={{ maxWidth: this.state.showProjects ? "0" : "5ch", opacity: this.state.showProjects ? 0 : 1, justifyContent: "flex-end" }}>I'm </div>
				<div>Madeline Hart.</div>
			</h2>
		);
	};

	render() {
		// <nav className="navbar" style={{ opacity: this.state.showProjects ? 1 : 0, /* transitionDelay: this.state.showProjects ? "820ms" : "0ms" */ }}>{this.signatureHeading()}</nav>
		return (
			<>
				{/* <div id="dynamic-background" style={{ background: this.state.scrollPosition > window.innerHeight / 2 ? "#FFFFFF" : "var(--beige)" }} /> */}
				<div className="main">
					<div style={{ position: "sticky", top: "50vh", height: 0, overflow: "visible" }}>{this.signatureHeading()}</div>
					<div className="front-page">
						{/* Navbar was here */}
						<div style={{ justifyContent: "flex-end", alignContent: "center" }}>
							<h1 className="signature">hello</h1>
						</div>
						<div style={{ justifyContent: "flex-start", alignContent: "center" }}>
							{/* <h2 className="signature">I'm Madeline Hart.</h2> */}
							{/* {this.signatureHeading()} */}
							<p className="copy">I make websites, and this is my portfolio.</p>
							<div className="links">
								<div><a onClick={this.doNothing} href="/projects">projects</a></div>
								<div><a onClick={this.doNothing} href="/concepts">concepts</a></div>
								<div><a onClick={this.doNothing} href="/about">about</a></div>
							</div>
							<div className="padding" aria-hidden />
						</div>
					</div>
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
