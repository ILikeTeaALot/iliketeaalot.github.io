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
		this.observer = new IntersectionObserver(this.handleObserver, { threshold: [0.1, 0.6, 1] });
		this.helloObserver = new IntersectionObserver(this.handleObserver, { threshold: [0, 0.1] });
		// this.opacityObserver = new IntersectionObserver(this.handleObserver, { threshold: [0, 0.1, 1] });
		this.state = {
			scrollPosition: window.scrollY,
			showProjects: window.scrollY >= window.innerHeight / 2,
		};
	}

	observer: IntersectionObserver;
	// opacityObserver: IntersectionObserver;
	helloObserver: IntersectionObserver;

	handleObserver: IntersectionObserverCallback = (entries, observer) => {
		for (const entry of entries) {
			/// @ts-expect-error
			if (entry.target.dataset.signature) {
				if (entry.intersectionRatio > 0) {
					document.body.style.backgroundColor = "var(--beige)";
					document.body.style.color = "#000000";
				} else {
					document.body.style.backgroundColor = "#FFFFFF";
					document.body.style.color = "#000000";
				}
				return;
			}
			/// @ts-expect-error
			const intersectionRatio = entry.target.dataset.background === "#000000" ? 0.1 : 0.6;
			if (entry.intersectionRatio >= 0.6) {
				/// @ts-ignore
				entry.target.parentElement.parentElement.style.opacity = 1;	
			} else {
				/// @ts-ignore
				entry.target.parentElement.parentElement.style.opacity = 0;
			}
			if (entry.intersectionRatio >= intersectionRatio) {
				console.log("element on screen");
				/// @ts-ignore
				document.body.style.backgroundColor = entry.target.dataset.background;
				/// @ts-ignore
				document.body.style.color = entry.target.dataset.color || "#000000";
				return;
			}
		}
	};

	doNothing: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
	};

	scrollToProjects: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
	};

	handleScroll = () => {
		// if (window.scrollY > window.innerHeight / 2) {
		// 	// document.body.style.backgroundColor = "#FFFFFF";
		// } else {
		// 	// document.body.style.backgroundColor = "var(--beige)";
		// }
		this.setState({ scrollPosition: window.scrollY, showProjects: window.scrollY >= window.innerHeight / 2 });
	};

	componentDidMount = () => {
		document.addEventListener("scroll", this.handleScroll);
		window.addEventListener("resize", this.handleScroll);
		for (const section of this.sections) {
			if (section.current !== null) this.observer.observe(section.current);
		}
		/// @ts-expect-error
		this.helloObserver.observe(this.hello.current);
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

	sections: React.RefObject<HTMLDivElement>[] = [
		React.createRef<HTMLDivElement>(),
		React.createRef<HTMLDivElement>(),
		React.createRef<HTMLDivElement>(),
		React.createRef<HTMLDivElement>(),
		React.createRef<HTMLDivElement>(),
	];

	hello = React.createRef<HTMLDivElement>();

	// Smaller numbers result in large-size links further down the page
	// Original divisor was 1.4; It was too accurate
	// Good values: 1.2, 1.4, 1.5
	useSmallLinks = () => this.state.scrollPosition >= window.innerHeight / 1.4;

	isAtTopOfPage = () => this.state.scrollPosition < 4;

	render() {
		// <nav className="navbar" style={{ opacity: this.state.showProjects ? 1 : 0, /* transitionDelay: this.state.showProjects ? "820ms" : "0ms" */ }}>{this.signatureHeading()}</nav>
		return (
			<>
				{/* <div id="dynamic-background" style={{ background: this.state.scrollPosition > window.innerHeight / 2 ? "#FFFFFF" : "var(--beige)" }} /> */}
				<div className="main" style={{ transform: "tanslateZ(0)" }}>
					<div style={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100vw", pointerEvents: "none", transform: "rotateZ(-90deg)", transformOrigin: "center", display: "flex", placeContent: "center", justifyContent: "center", textAlign: "center", verticalAlign: "center", fontSize: 32, opacity: this.isAtTopOfPage() ? 1 : 0, transitionDuration: "800ms" }}>❮</div>
					<div className="front-page">
						{/* Navbar was here */}
						<div style={{ justifyContent: "flex-end", alignContent: "center" }} data-signature ref={this.hello}>
							<h1 className="signature">hello</h1>
						</div>
					</div>
					<div className="navbar" style={{ top: 0, overflow: "visible", backgroundColor: "inherit" }}>{this.signatureHeading()}</div>
					<div style={{ minHeight: "20vh" }}>
						{/* <h2 className="signature invisible">I'm Madeline Hart.</h2> */} {/* accomodate accessibilty and layout */}
						<div style={{ justifyContent: "flex-start", alignContent: "center" }}>
							{/* <h2 className="signature">I'm Madeline Hart.</h2> */}
							{/* {this.signatureHeading()} */}
							<p className="about">I'm a front-end web developer and UX designer, and I am highly skilled in React (Web & Native), as well as having a passion for making elegant, frictionless, and enjoyable user experiences.</p>
							{/* <p className="about">I'm a front-end web developer and UX designer, and this is my portfolio.</p> */}
							{/* <p className="about">I make websites & apps, and this is my portfolio.</p> */}
							{/* <p className="about">This portfolio was made entirely in vanilla React JS.</p> */}
							{/* <p className="about">I am highly skilled in React (Web & Native), and I have a passion for making elegant, frictionless, and calming user experiences.</p> */}
							{/* <p className="about">N.B. None of the projects on this site use CSS or styling libraries. I prefer to do that myself to keep things slim.</p> */}
							{/* <p className="about">My web-development work is primarily focused on React.JS, and I have good experience in React-Native for mobile.</p>
							<p className="about">“Do one thing, and do it well”</p> */}
						</div>
					</div>
					{/* TODO: Make work better on mobile */}
					<div className={this.useSmallLinks() ? "navbar links small" : "navbar links"}>
						<div><a onClick={this.doNothing} href="/contact">contact</a></div>
						<div><a onClick={this.scrollToProjects} href="/projects">view projects</a></div>
						<div><a onClick={this.doNothing} href="/about">about</a></div>
					</div>
					<div className="padding" aria-hidden />
					<div className="page" /* style={{ opacity: this.state.showProjects ? 1 : 0 }} */>
						<div className="project">
							<div ref={this.sections[0]} data-background="#FFFFFF" className="project-info">
								<h1 className="title">My Skills</h1>
								<h4>2018 - Present</h4>
								<h2 className="heading">Vertically Centring a Div</h2>
								<p className="copy">It's often joked about how difficult it is to vertically centre an HTML "div" element. So here it is, right in front of you. Enjoy.</p>
								<h2 className="heading">React</h2>
								<p className="copy">As of December 2021, I have been using React for over 3 years, and have finished multiple projects.</p>
								<h2 className="heading">React Native</h2>
								<p className="copy">I also have about 18 months experience in React Native, as can be seen in MobileTrainTimes, and a number of smaller experiemental projects.</p>
								<h2 className="heading">CSS</h2>
								<p className="copy">I am highly skilled in CSS. Every projects' styles on this website were written from the ground up.</p>
								<h2 className="heading">Git</h2>
								<p className="copy">I have collaborated with multiple devlopers on several occasions.</p>
								<h2 className="heading">Other Languages & Technologies</h2>
								<ul>
									<li>Node.JS Server+Desktop</li>
									<li>C#/.NET Core</li>
									<li>Rust</li>
								</ul>
							</div>
							<div className="project-showcase">
								<div>
									<h2 className="title">Vertically Centred Div</h2>
									<p className="copy">(Real HTML. Press F12 and open your inspector!)</p>
									<div className="centre-outer">
										<div className="centred" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="page" /* style={{ opacity: this.state.showProjects ? 1 : 0 }} */>
						{/* <div>
							<h1 className="heading">My work</h1>
						</div> */}
						<div className="project">
							<div ref={this.sections[1]} data-background="#FFFFFF" className="project-info">
								<h1 className="title">June</h1>
								<h4>July - Winter 2020</h4>
								<h2 className="heading">About</h2>
								{/* <p className="copy">In 2006, Microsoft released the Zune. It was an interesting take on the portable music player, and by 2008 the visual style had evolved into what many today would recognise as "Metro", Microsoft's attempt at an ultra-minimalist user interface/experience. Zune was perhaps the best implmentation of the Metro design language, with a look that still feels modern and timeless today, 12 years later.</p>
								<p className="copy">However, the Zune devices were discontinued in 2011, and the desktop software stopped receiving updates in 2012.</p> */}
								<p className="copy">In 2020, I took Zune as a design start-point, and attempted to build my own music playing software that could stand toe-to-toe with iTunes and WinAmp.</p>
								<p className="copy">In many ways, I succeeded: the Windows version could play multiple tracks seamlessly, and on both Windows and Mac OS the music database was reliable and highly performant. The User Interface is stunningly clean and simple, but due to the single-threaded and poor-performance nature of Javascript+Electron, playing music and attempting to animate the UI simultaneously resulted in a muddied mess.</p>
								<h2 className="heading">Frameworks</h2>
								<h3 className="heading">Desktop:</h3>
								<ul>
									<li>React</li>
									<li>Electron</li>
									<li>Node.JS</li>
								</ul>
								<h3 className="heading">Mobile:</h3>
								<ul>
									<li>React Native</li>
								</ul>
								<h2 className="heading">Platforms</h2>
								<ul>
									<li>Windows</li>
									<li>Mac OS (Prototype)</li>
									<li>Linux (Theoretical - Untested)</li>
									<li>Android (Prototype)</li>
									<li>iOS (Prototype)</li>
								</ul>
								<h2 className="heading">Notable Libraries/APIs Used</h2>
								<ul>
									<li>SQLite</li>
								</ul>
							</div>
							<div className="project-showcase">
								<section>
									<h2 className="title">Website Concept</h2>
									<p className="copy">(Click to enlarge)</p>
									<img tabIndex={1} className="software-image concept-image" src={require("./concepts/June/Website Concept.png")?.default} />
								</section>
								<section>
									<h2 className="title">Mobile Concepts</h2>
									<p className="copy">(Click to enlarge)</p>
									<img tabIndex={1} className="software-image concept-image" src={require("./concepts/June/Mobile Concept/Home.png")?.default} />
									<img tabIndex={1} className="software-image concept-image" src={require("./concepts/June/Mobile Concept/Now Playing.png")?.default} />
									<img tabIndex={1} className="software-image concept-image" src={require("./concepts/June/Mobile Concept/Quickplay - With Pins.png")?.default} />
								</section>
								<section>
									<h2 className="title">Desktop Application</h2>
								</section>
							</div>
						</div>
					</div>
					<div className="page" /* style={{ opacity: this.state.showProjects ? 1 : 0 }} */>
						<div className="project">
							<div ref={this.sections[2]} data-background="#FFFFFF" className="project-info">
								<h1 className="title">MobileTrainTimes</h1>
								<h4>August - December 2020</h4>
								<h2 className="heading">About</h2>
								<p className="copy">In addition to computers, I have been interested in trains for about as long as I can remember. MobileTrainTimes is an amalgamation of two of those two interests; It is designed to be the simplest, most elegant rail journey planning and information app available.</p>
								<h2 className="heading">Frameworks</h2>
								<ul>
									<li>React Native</li>
								</ul>
								<h2 className="heading">Platforms</h2>
								<ul>
									<li>Android</li>
									<li>iOS</li>
								</ul>
								<h2 className="heading">Notable Libraries/APIs Used</h2>
								<ul>
									<li>Huxley 2 - For interfacing with the National Rail Enquiries "Darwin" system.</li>
								</ul>
							</div>
							<div className="project-showcase">
								<div style={{ height: "200vh" }} />
							</div>
						</div>
					</div>
					<div className="page" /* style={{ opacity: this.state.showProjects ? 1 : 0 }} */>
						<div className="project">
							<div ref={this.sections[3]} data-background="#000000" data-color="#FFFFFF" className="project-info">
								<h1 className="title">IsItWeekA.com</h1>
								<h4>Dec 2020 - Present</h4>
								<h2 className="heading">About</h2>
								{/* <p className="copy">Following a tradition going back over 10 years now, a student at my secondary school has managed the domain and website "isitweeka.com", and in 2020 that honour passed to a friend of mine, and I was asked to design the website. I also tasked myself with implementing a Google-free method of interfacing with the school's calendar, for privacy and maintainability purposes.</p> */}
								<p className="copy">At the end of 2020, a friend of mine became the latest student of my secondary school to own and manage the domain "isitweeka.com".</p>
								<p className="copy">He asked me to modernise and redesign the website, as well as help implement a number of new features.</p>
								<h2 className="heading">Frameworks</h2>
								<ul>
									<li>React</li>
								</ul>
								<h2 className="heading">Platforms</h2>
								<ul>
									<li>Web</li>
								</ul>
								<h2 className="heading">Notable Libraries/APIs Used</h2>
								<ul>
									<li>Raw iCal parsing.</li>
								</ul>
							</div>
							<div className="project-showcase">
								<h2 className="title">Main Landing Page</h2>
								<img tabIndex={1} className="software-image concept-image" src={require("./screenshots/IsItWeekA/main.png")?.default} />
							</div>
						</div>
					</div>
					<div className="page" /* style={{ opacity: this.state.showProjects ? 1 : 0 }} */>
						<div className="project">
							<div ref={this.sections[4]} data-background="#FFC118" className="project-info">
								<h1 className="title">Drezr</h1>
								<h4>Dec 2018 - Jan 2019</h4>
								<h2 className="heading">About</h2>
								<p className="copy">In December 2018, I was asked if I'd like to help with a startup idea. I jumped at the opportunity, being particularly young and naïve at the time.</p>
								<p className="copy">I was given a detailed mockup of the site and finished an early prototype within 24 hours, although it was only a simple single-page website.</p>
								<p className="copy">As of some time in late 2019/early 2020, the site is down.</p>
								<h2 className="heading">Frameworks</h2>
								<ul>
									<li>React</li>
									<li>Vanilla HTML/CSS/JS</li>
								</ul>
								<h2 className="heading">Platforms</h2>
								<ul>
									<li>Web</li>
								</ul>
								<h2 className="heading">Notable Libraries/APIs Used</h2>
								<ul>
									<li>PHP Backend for handling email form.</li>
								</ul>
							</div>
							<div className="project-showcase">
								<h2 className="title">Main Landing Page</h2>
								<p className="copy">(Click to enlarge)</p>
								{/* <img tabIndex={1} className="software-image concept-image" src={require("./screenshots/IsItWeekA/main.png")?.default} /> */}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default App;
