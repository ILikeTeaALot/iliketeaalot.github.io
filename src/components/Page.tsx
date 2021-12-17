import React from "react";

type BlockType = "title" | "heading" | "subheading" | "date" | "copy";

type ListType = "list";

interface BaseBlock<T extends string> {
	type: T;
}

interface InfoBlock extends BaseBlock<BlockType> {
	content: string;
}

interface ListBlock extends BaseBlock<ListType> {
	content: string[];
}

interface LinkBlock extends BaseBlock<"link"> {
	content: string;
	url: string;
}

type Block = InfoBlock | ListBlock | LinkBlock;

interface PageProps {
	background: string;
	colour?: string;
	info: Array<Block>;
}

interface PageState {

}

export class Page extends React.Component<PageProps, PageState> {
	constructor(props: PageProps) {
		super(props);
		this.observer = new IntersectionObserver(this.handleObserver, { threshold: [0.1, 0.6, 1] });
		this.helloObserver = new IntersectionObserver(this.handleObserver, { threshold: [0, 0.1] });
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

	sectionRef = React.createRef<HTMLDivElement>();

	componentDidMount = () => {
		this.observer.observe(this.sectionRef.current as HTMLDivElement);
	};

	renderProjectInfo = (block: Block, index: number) => {
		switch (block.type) {
			case "title":
				return <h1 key={index} className="title">{block.content}</h1>;
			case "heading":
				return <h2 key={index} className="heading">{block.content}</h2>;
			case "subheading":
				return <h3 key={index} className="heading">{block.content}</h3>;
			case "date":
				return <h4 key={index}>{block.content}</h4>;
			case "copy":
				return <p key={index} className="copy">{block.content}</p>;
			case "list":
				return (
					<ul key={index}>
						{block.content.map((content, i) => (
							<li key={i}>{content}</li>
						))}
					</ul>
				);
			case "link":
				return <a key={index} href={block.url} style={{ margin: "0.5em 0", display: "inline-flex" }} target="_blank" rel="noreferrer">{block.content}</a>;
		}
	};

	render = () => {
		return (
			<div className="page" /* style={{ opacity: this.state.showProjects ? 1 : 0 }} */>
				<div className="project">
					<div ref={this.sectionRef} data-background={this.props.background} data-color={this.props.colour} className="project-info">
						{this.props.info.map(this.renderProjectInfo)}
					</div>
					<div className="project-showcase">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	};
}