import React from "react";
import "./App.css";
import { ListNav } from "./components/NewListNav";
import { ListNavItem } from "./components/NewListNav/ListNavItem";
import { Page } from "./components/Page";
import { VCDiv } from "./components/VerticallyCentredDiv";
import "./fonts/fonts.css";

interface Props {

}

interface State {
	scrollPosition: number;
	showProjects: boolean;
	showAbout: boolean;
	showMenu: boolean;
	hasLoaded: boolean;
}

export class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		// this.observer = new IntersectionObserver(this.handleObserver, { threshold: [0.1, 0.6, 1] });
		this.helloObserver = new IntersectionObserver(this.handleObserver, { threshold: [0, 1] });
		// this.opacityObserver = new IntersectionObserver(this.handleObserver, { threshold: [0, 0.1, 1] });
		this.state = {
			scrollPosition: window.scrollY,
			showProjects: window.scrollY >= window.innerHeight / 2,
			showAbout: false,
			showMenu: false,
			hasLoaded: false,
		};
	}

	// observer: IntersectionObserver;
	// opacityObserver: IntersectionObserver;
	helloObserver: IntersectionObserver;

	handleObserver: IntersectionObserverCallback = (entries, observer) => {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0) {
				document.body.style.backgroundColor = "var(--beige)";
				document.body.style.color = "#000000";
				// document.body.style.backgroundColor = "#000000";
				// document.body.style.color = "#FFFFFF";
				this.setState({ showProjects: false });
			} else {
				// document.body.style.backgroundColor = "#FFFFFF";
				// document.body.style.color = "#000000";
				this.setState({ showProjects: true });
			}
			// /// @ts-expect-error
			// if (entry.target.dataset.signature) {
			// 	return;
			// }
			// /// @ts-expect-error
			// const intersectionRatio = entry.target.dataset.background === "#000000" ? 0.1 : 0.6;
			// if (entry.intersectionRatio >= 0.6) {
			// 	/// @ts-ignore
			// 	entry.target.parentElement.parentElement.style.opacity = 1;
			// } else {
			// 	/// @ts-ignore
			// 	entry.target.parentElement.parentElement.style.opacity = 0;
			// }
			// if (entry.intersectionRatio >= intersectionRatio) {
			// 	console.log("element on screen");
			// 	/// @ts-ignore
			// 	document.body.style.backgroundColor = entry.target.dataset.background;
			// 	/// @ts-ignore
			// 	document.body.style.color = entry.target.dataset.color || "#000000";
			// 	return;
			// }
		}
	};

	doNothing: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
	};

	showAbout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		window.scrollTo({ top: window.innerHeight, behavior: "auto" });
		this.setState({ showAbout: true });
	};

	showMenu: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		// document.documentElement.style.overflowY = "hidden";
		this.setState({ showMenu: true });
	};

	handleMenuClick: React.MouseEventHandler = (e) => {
		if (e.target !== e.currentTarget)
			this.hideMenu(e);
	};

	hideMenu: React.MouseEventHandler = (e) => {
		e.preventDefault();
		// document.documentElement.style.overflowY = "auto";
		this.setState({ showMenu: false });
	};

	hideAbout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		this.setState({ showAbout: false });
	};

	scrollToProjects: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		window.scrollTo({ top: window.innerHeight, behavior: "auto" });
	};

	handleScroll = () => {
		// if (window.scrollY > window.innerHeight / 2) {
		// 	// document.body.style.backgroundColor = "#FFFFFF";
		// } else {
		// 	// document.body.style.backgroundColor = "var(--beige)";
		// }
		this.setState({ scrollPosition: window.scrollY, /* showProjects: window.scrollY >= window.innerHeight / 2 */ });
	};

	handleLoad = () => {
		this.setState({ hasLoaded: true }, () => {
			// document.documentElement.style.overflowY = "";
		});
	};

	componentDidMount = () => {
		/// @ts-expect-error
		this.helloObserver.observe(this.hello.current);
		window.scrollTo(0, 0);
		// document.documentElement.style.overflowY = "hidden";
		document.addEventListener("scroll", this.handleScroll);
		window.addEventListener("resize", this.handleScroll);
		window.addEventListener("load", this.handleLoad);
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

	hello = React.createRef<HTMLDivElement>();

	// Smaller numbers result in large-size links further down the page
	// Original divisor was 1.4; It was too accurate
	// Good values: 1.2, 1.4, 1.5
	useSmallLinks = () => this.state.scrollPosition >= window.innerHeight / 1.4;

	// isAtTopOfPage = () => this.state.scrollPosition < 4;

	render() {
		// <nav className="navbar" style={{ opacity: this.state.showProjects ? 1 : 0, /* transitionDelay: this.state.showProjects ? "820ms" : "0ms" */ }}>{this.signatureHeading()}</nav>
		return (
			<>
				{/* <div id="dynamic-background" style={{ background: this.state.scrollPosition > window.innerHeight / 2 ? "#FFFFFF" : "var(--beige)" }} /> */}
				<div className={this.state.hasLoaded ? "main" : "main not-loaded"} style={{ transform: "tanslateZ(0)" }}>
					{/* <div className="slide-in" aria-hidden style={{ position: "fixed", bottom: 0, left: 0, right: 0, pointerEvents: "none", transform: "rotateZ(-90deg)", transformOrigin: "center", display: "flex", placeContent: "center", justifyContent: "center", textAlign: "center", verticalAlign: "center", fontSize: 32, opacity: this.isAtTopOfPage() ? 1 : 0, transitionDuration: "800ms" }}>???</div> */}
					<div className="front-page" id="Hello">
						{/* Navbar was here */}
						<div style={{ justifyContent: "flex-end", alignContent: "center" }} data-signature ref={this.hello}>
							<h1 className="signature">hello</h1>
						</div>
					</div>
					<div style={{ position: "fixed", bottom: 0, right: 0, textAlign: "right", opacity: this.state.hasLoaded ? 0 : 1 }}><h2 className="loading title">Loading...</h2></div>
					<div className="navbar fade-in" style={{ top: 0, overflow: "visible", backgroundColor: "inherit" }}>{this.signatureHeading()}</div>
					<div className="fade-in" style={{ minHeight: "20vh" }}>
						{/* <h2 className="signature invisible">I'm Madeline Hart.</h2> */} {/* accomodate accessibilty and layout */}
						<div style={{ justifyContent: "flex-start", alignContent: "center" }}>
							{/* <h2 className="signature">I'm Madeline Hart.</h2> */}
							{/* {this.signatureHeading()} */}
							<p className="about">I'm a front-end web developer and UX designer, and I am highly skilled in React (Web & Native), and I have a passion for making elegant, frictionless, and enjoyable user experiences.</p>
							{/* <p className="about">I'm a front-end web developer and UX designer, and this is my portfolio.</p> */}
							{/* <p className="about">I make websites & apps, and this is my portfolio.</p> */}
							{/* <p className="about">This portfolio was made entirely in vanilla React JS.</p> */}
							{/* <p className="about">I am highly skilled in React (Web & Native), and I have a passion for making elegant, frictionless, and calming user experiences.</p> */}
							{/* <p className="about">N.B. None of the projects on this site use CSS or styling libraries. I prefer to do that myself to keep things slim.</p> */}
							{/* <p className="about">My web-development work is primarily focused on React.JS, and I have good experience in React-Native for mobile.</p>
							<p className="about">???Do one thing, and do it well???</p> */}
						</div>
					</div>
					{/* TODO: Make work better on mobile */}
					<div className={this.useSmallLinks() ? "navbar links small fade-in" : "navbar links fade-in"}>
						{/* <div><a onClick={this.showAbout} href="/about">about</a></div>
						<div><a onClick={this.scrollToProjects} href="/projects">view projects</a></div>
						<div><a onClick={this.doNothing} href="/contact">contact</a></div> */}
						<div><a onClick={this.showMenu} href="/index">index</a></div>
					</div>
					<div className="padding" aria-hidden />
					<ListNav show={this.state.showMenu} onClick={this.handleMenuClick}>
						<ListNavItem accent="var(--beige)" to="#Hello">Hello</ListNavItem>
						<ListNavItem accent="var(--beige)" to="#About">About</ListNavItem>
						<ListNavItem accent="#FFFFFF" to="#June">June</ListNavItem>
						<ListNavItem accent="#FFFFFF" to="#MobileTrainTimes">MobileTrainTimes</ListNavItem>
						<ListNavItem accent="#000000" to="#IsItWeekA">IsItWeekA</ListNavItem>
						{/* <ListNavItem accent="#000000" to="#SteamTV">"Steam TV UI"</ListNavItem> */}
						{/* <ListNavItem accent="#2B2B2F" to="#RykanMail">Rykan Mail</ListNavItem> */}
						{/* <ListNavItem accent="#2B2B2F" to="#Rykan.Search">Rykan Search</ListNavItem> */}
						{/* <ListNavItem accent="#FFC118" to="#Drezr">Drezr</ListNavItem> */}
						<ListNavItem accent="#FFC118" to="#Contact">Contact</ListNavItem>
						<ListNavItem accent="#FFC118" to="" onClick={this.hideMenu}>Back</ListNavItem>
					</ListNav>
					<section className="page-container">
						<Page background="#000000" colour="#FFFFFF" id="About" /* id="about" visible={this.state.showAbout} */ info={[
							{ type: "title", content: "My Skills" },
							{ type: "date", content: "2018 - Present" },
							{ type: "heading", content: "Vertically Centring a Div" },
							{ type: "copy", content: "It's often joked about how difficult it is to vertically centre an HTML \"div\" element. So here it is, right in front of you. Enjoy." },
							{ type: "heading", content: "React" },
							{ type: "copy", content: "As of December 2021, I have been using React for over 3 years, and have finished multiple projects." },
							{ type: "heading", content: "CSS" },
							{ type: "copy", content: "I am highly skilled in CSS. Every projects' styles on this website were written from the ground up." },
							{ type: "heading", content: "Googling" },
							{ type: "copy", content: "While I don't use Google specifically, I know very well what to search to find the right result." },
							{ type: "heading", content: "React Native" },
							{ type: "copy", content: "I have roughly 18 months experience in React Native, as can be seen in MobileTrainTimes, and a number of smaller experiemental projects." },
							{ type: "heading", content: "Git" },
							{ type: "copy", content: "I have collaborated with multiple devlopers on several occasions." },
							{ type: "heading", content: "Other Languages & Technologies" },
							{ type: "list", content: ["Node.JS Server+Desktop", "C#/.NET Core", "Rust"] },
						]}>
							<div>
								<h2 className="title">Vertically Centred Div</h2>
								<p className="copy">(Real HTML. Press F12 and open your inspector!)</p>
								<VCDiv />
							</div>
							<div>
								<h2 className="title">Interesting CSS Demos</h2>
								<p className="copy">(Real HTML. Press F12 and open your inspector!)</p>
							</div>
						</Page>
						<Page background="#FFFFFF" colour="#000000" id="June" info={[
							{ type: "title", content: "June" },
							{ type: "date", content: "July - Winter 2020" },
							{ type: "heading", content: "About" },
							{ type: "copy", content: "In 2020, I took Zune as a design start-point, and attempted to build my own music playing software that could stand toe-to-toe with iTunes and WinAmp." },
							{ type: "copy", content: "In many ways, I succeeded: the Windows version could play multiple tracks seamlessly, and on both Windows and Mac OS the music database was reliable and highly performant. The User Interface is stunningly clean and simple, but due to the single-threaded and poor-performance nature of Javascript+Electron, playing music and attempting to animate the UI simultaneously resulted in the application stuttering." },
							{ type: "heading", content: "Frameworks" },
							{ type: "subheading", content: "Desktop:" },
							{ type: "list", content: ["React", "Electron", "Node.js"] },
							{ type: "subheading", content: "Mobile:" },
							{ type: "list", content: ["React Native"] },
							{ type: "heading", content: "Platforms" },
							{ type: "list", content: ["Windows", "Mac OS (Prototype)", "Linux (Theoretical - Untested)", "Android (Prototype)", "iOS (Prototype)"] },
							{ type: "heading", content: "Notable Libraries/APIs Used" },
							{ type: "list", content: ["SQLite"] },
						]}>
							<section>
								<h2 className="title">Website Concept</h2>
								<p className="copy">(Click to enlarge)</p>
								<img className="software-image concept-image" src={require("./concepts/June/Website Concept.png")?.default} />
							</section>
							<section>
								<h2 className="title">Mobile Concepts</h2>
								<p className="copy">(Click to enlarge)</p>
								<img className="software-image concept-image" src={require("./concepts/June/Mobile Concept/Home.png")?.default} />
								<img className="software-image concept-image" src={require("./concepts/June/Mobile Concept/Now Playing.png")?.default} />
								<img className="software-image concept-image" src={require("./concepts/June/Mobile Concept/Quickplay - With Pins.png")?.default} />
							</section>
							<section>
								<h2 className="title">Desktop Application</h2>
							</section>
							<section>
								<h2 className="title">Big-Screen Concept</h2>
								<img className="software-image concept-image" src={require("./concepts/June/Big Screen Concept.png")?.default} />
							</section>
						</Page>
						<Page background="#FFFFFF" colour="#000000" id="MobileTrainTimes" info={[
							{ type: "title", content: "MobileTrainTimes" },
							{ type: "date", content: "August - December 2020" },
							{ type: "heading", content: "About" },
							{ type: "copy", content: "In addition to computers, I have been interested in trains for about as long as I can remember. MobileTrainTimes is an amalgamation of those two interests; It is designed to be the simplest, most elegant rail journey planning and information app available." },
							{ type: "copy", content: "The app uses an API called \"Huxley\" to interface with the National Rail systems." },
							{ type: "heading", content: "Frameworks" },
							{ type: "list", content: ["React Native"] },
							{ type: "heading", content: "Platforms" },
							{ type: "list", content: ["Android", "iOS"] },
							{ type: "heading", content: "Notable Libraries/APIs Used" },
							{ type: "list", content: ["Huxley 2 - For interfacing with the National Rail Enquiries \"Darwin\" system."] },
						]}>
							<h2 className="title">Home</h2>
							<section>
								{/* <img className="software-image mobile-image" style={{ position: "absolute", top: 0, left: "20%" }} src={require("./screenshots/MobileTrainTimes/Dark/Home.png")?.default} />
								<img className="software-image mobile-image" style={{ position: "absolute", top: "10vh", left: "40%" }} src={require("./screenshots/MobileTrainTimes/Light/Home.png")?.default} /> */}
								<img className="software-image mobile-image" src={require("./screenshots/MobileTrainTimes/MobileTrainTimes Home.png")?.default} />
							</section>
							<h2 className="title">Search</h2>
							<section>
								<img className="software-image mobile-image" src={require("./screenshots/MobileTrainTimes/MobileTrainTimes Search.png")?.default} />
								{/* <img className="software-image mobile-image" style={{ position: "absolute", transform: "scale(0.75)", top: "-5vh", left: "40%" }} src={require("./screenshots/MobileTrainTimes/Light/Search/Moor.png")?.default} />
								<img className="software-image mobile-image" style={{ position: "absolute", transform: "scale(0.75)", top: 0, left: "20%" }} src={require("./screenshots/MobileTrainTimes/Dark/Search/WEY.png")?.default} />
								<img className="software-image mobile-image" style={{ position: "absolute", transform: "scale(0.75)", top: "10vh", right: "20%" }} src={require("./screenshots/MobileTrainTimes/Dark/Search/Birmingham.png")?.default} />
								<img className="software-image mobile-image" style={{ alignSelf: "center", justifySelf: "center", flex: 0, margin: "auto", transform: "scale(1)" }} src={require("./screenshots/MobileTrainTimes/Light/Search/London.png")?.default} /> */}
							</section>
							<h2 className="title">Train Information</h2>
							<section>
								<img className="software-image mobile-image" src={require("./screenshots/MobileTrainTimes/MobileTrainTimes Live Trains.png")?.default} />
							</section>
						</Page>
						<Page background="#000000" colour="#FFFFFF" id="IsItWeekA" info={[
							{ type: "title", content: "IsItWeekA.com" },
							{ type: "date", content: "Dec 2020 - Present" },
							{ type: "link", content: "View Website ->", url: "https://isitweeka.com/" },
							{ type: "heading", content: "About" },
							{ type: "copy", content: "At the end of 2020, a friend of mine became the latest student of my secondary school to own and manage the domain \"isitweeka.com\"." },
							{ type: "copy", content: "He asked me to modernise and redesign the website, as well as help implement a number of new features." },
							{ type: "copy", content: "My design responsibilities included the typography, layout, and colour." },
							{ type: "heading", content: "Frameworks" },
							{ type: "list", content: ["React"] },
							{ type: "heading", content: "Platforms" },
							{ type: "list", content: ["Web"] },
							{ type: "heading", content: "Notable Libraries/APIs Used" },
							{ type: "list", content: ["Raw iCal Parsing."] },
						]}>
							<h2 className="title">Main Landing Page</h2>
							<object data="https://isitweeka.com?autoDeclineCookies" style={{ width: "calc(calc(100% - var(--info-width)) - calc(var(--showcase-padding-h) * 2))", height: "70vh", position: "absolute", left: "calc(var(--info-width) + var(--showcase-padding-h))", outline: "2px solid var(--grey)" }}>Live preview of https://isitweeka.com/</object>
						</Page>
						{/* <Page background="#2B2B2F" colour="#FFFFFF" id="RykanMail" info={[
							{ type: "title", content: "Rykan Mail, Calendar, and Chat" },
							{ type: "date", content: "Dec 2019" },
							{ type: "link", content: "View Demo ->", url: "/demos/RykanMail" },
							{ type: "heading", content: "About" },
							{ type: "copy", content: "Lorem ipsum dolor sit amet" },
							{ type: "heading", content: "Frameworks" },
							{ type: "list", content: ["React"] },
							{ type: "heading", content: "Platforms" },
							{ type: "list", content: ["Web"] },
						]}>
							<section>
								<h2 className="title">Big-Screen Concept</h2>
								<img className="software-image concept-image" src={require("./concepts/June/Big Screen Concept.png")?.default} />
							</section>
						</Page>
						<Page background="#FFC118" colour="#000000" id="Drezr" info={[
							{ type: "title", content: "Drezr" },
							{ type: "date", content: "Dec 2018 - Jan 2019" },
							{ type: "heading", content: "About" },
							{ type: "copy", content: "In December 2018, I was asked if I'd like to help with a startup idea. I jumped at the opportunity, being particularly young and na??ve at the time." },
							{ type: "copy", content: "I was given a detailed mockup of the site and finished an early prototype within 24 hours, although it was only a simple single-page website." },
							// { type: "copy", content: "I have multiple versions of the website in my Projects folder, and have no clue which one is the version that actually went live." },
							{ type: "copy", content: "Unfortuntely, as of some time in late 2019/early 2020, the site is down." },
							{ type: "heading", content: "Frameworks" },
							{ type: "list", content: ["React", "Vanilla HTML/CSS/JS"] },
							{ type: "heading", content: "Platforms" },
							{ type: "list", content: ["Web"] },
							{ type: "heading", content: "Notable Libraries/APIs Used" },
							{ type: "list", content: ["PHP Backend for handling email form."] },
						]}>
							<h2 className="title">Main Landing Page</h2>
							<p className="copy">(Click to enlarge)</p>
						</Page> */}
						<Page background="#000000" colour="#FFFFFF" id="Contact" info={[
							{ type: "title", content: "Contact Details" },
							{ type: "heading", content: "E-mail" },
							{ type: "copy", content: "contact [at] madelinehart [dot] co.uk" },
							{ type: "heading", content: "Social Media" },
							{ type: "copy", content: "Sorry, I don't use social media." },
							{ type: "heading", content: "Github" },
							{ type: "link", content: "I go by ILikeTeaALot on Github", url: "https://github.com/iliketeaalot" },
						]}>
							<h1 className="title">The Fancy Method</h1>
							<p className="copy">If you'd prefer to contact me via an HTTP(S) request, go ahead!</p>
						</Page>
					</section>
				</div>
			</>
		);
	}
}

export default App;
