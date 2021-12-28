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
	id?: string;
	visible?: boolean;
}

interface PageState {
	showPage: boolean;
}

export class Page extends React.Component<PageProps, PageState> {
	constructor(props: PageProps) {
		super(props);
		this.observer = new IntersectionObserver(this.handleObserver, { threshold: [0.1, 0.6, 1] });
		this.helloObserver = new IntersectionObserver(this.handleObserver, { threshold: [0, 0.1] });
		this.state = {
			showPage: false,
		};
	}

	observer: IntersectionObserver;
	// opacityObserver: IntersectionObserver;
	helloObserver: IntersectionObserver;

	handleObserver: IntersectionObserverCallback = (entries, observer) => {
		for (const entry of entries) {
			const intersectionRatio = this.props.background === "#000000" ? 0.1 : 0.6;
			if (entry.intersectionRatio >= 0.6) {
				this.setState({ showPage: true });
			} else {
				this.setState({ showPage: false });
			}
			if (entry.intersectionRatio >= intersectionRatio) {
				console.log("element on screen");
				document.body.style.backgroundColor = this.props.background;
				document.body.style.color = this.props.colour || "#000000";
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
			<div className="page" data-visible={this.props.visible} data-showPage={this.state.showPage} id={this.props.id} style={{ opacity: this.props.visible === undefined ? (this.state.showPage ? 1 : 0) : (this.props.visible ? 1 : 0) }}>
				<div className="project">
					<div ref={this.sectionRef} className="project-info">
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