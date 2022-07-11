import { motion } from "framer-motion";
import "./WorkExample.css";
export default function WorkExample({
	title = "",
	description,
	link,
	contentSrc,
	colorOverride,
	badges = [],
}) {
	const TitleWords = title.split(" ");
	const LastWord = TitleWords.pop();
	const FirstWords = TitleWords.join(" ");
	const maxSectionWidth =
		window.innerWidth < 600
			? window.innerWidth - 60
			: Math.min(700, window.innerWidth - 50);
	return (
		<>
			<motion.div
				className="p-10 text-3xl text-white flex justify-center items-center relative flex flex-col"
				style={{ height: "80vh" }}
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.33 }}
			>
				<motion.div
					className="w-full text-left"
					whileInView={{ opacity: 1, x: -1 }}
				>
					<motion.h1
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						style={{
							fontFamily: "Oxanium",
							fontSize: 30,
							marginBottom: "-7px",
							marginTop: "14px",
						}}
						transition={{ duration: 0.66 }}
						viewport={{ once: true }}
					>
						{FirstWords}{" "}
						<motion.span
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.66 }}
							viewport={{ once: true }}
							style={{ color: colorOverride ?? "orange" }}
							transition={{ duration: 0.66 }}
						>
							{LastWord}
						</motion.span>
					</motion.h1>
					<div className="flex mt-1 mb-3 flex-wrap">
						{badges.map((badge, idx) => (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.66, delay: idx / 5 }}
								viewport={{ once: true }}
								class="bg-gray-700 mt-3 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
							>
								{badge}
							</motion.div>
						))}
					</div>
					<p
						className="mt-1 mb-5 text-left w-full max-w-screen font-normal"
						style={{
							fontFamily: "Open Sans",
							fontSize: 15,
							lineHeight: "1.5em",
							maxWidth: maxSectionWidth,
						}}
					>
						{description}
					</p>
					<motion.iframe
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.66 }}
						viewport={{ once: true }}
						src={contentSrc}
						className="max-w-screen mt-3"
						title="Nyan Cat [original]"
						width={maxSectionWidth}
						height="315"
						frameborder="0"
						allowfullscreen
					></motion.iframe>
				</motion.div>
			</motion.div>
		</>
	);
}
