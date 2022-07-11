import React, { useState, useEffect, useRef } from "react";
import TitleSection from "../components/TitleSection";
import WorkSection from "../components/WorkSection";

export default function HomePage() {
	const [scrollTop, setScrollTop] = useState(0);
	const scrollableElement = useRef();
	useEffect(() => {
		const onScroll = (e) => {
			setScrollTop(scrollableElement.current.scrollTop);
		};
		scrollableElement.current.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [scrollableElement]);
	return (
		<>
			<div
				ref={scrollableElement}
				className="max-h-screen overflow-scroll"
				style={{
					background: `rgba(0, 0, 0, ${scrollTop > 0 ? 0.86 : 0}`,
					transition: "background .33s ease",
					maxHeight: "calc(100vh - 70px)",
					paddingTop: "calc(50vh - 200px)",
				}}
			>
				<TitleSection />
				<WorkSection isScrolling={scrollTop > 0} />
			</div>
		</>
	);
}
