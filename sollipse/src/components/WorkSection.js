import WorkExample from "./WorkExample";
import DevIcon from "./DevIcon";
import { motion } from "framer-motion";

const ICON_URL = "devicon-threejs-original";

export default function WorkSection({ isScrolling }) {
	return (
		<div className="pt-60 flex justify-center items-center flex-col">
			<motion.div
				className="-ml-4"
				animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
				transition={{
					repeat: Infinity,
					repeatDelay: 0.1,
					duration: 3,
					ease: "easeInOut",
				}}
			>
				<div style={{ transform: "rotateZ(104deg)" }}>
					<DevIcon
						colorOverride={isScrolling ? "rgba(255,0,0,1)" : null}
						iconName={ICON_URL}
					/>
				</div>
			</motion.div>
			<div
				style={{ fontFamily: "Oxanium", fontSize: 40 }}
				className="h-72 flex font-extralight justify-center items-center"
			>
				<motion.div
					className="text-white"
					initial={{ opacity: 0, x: -10 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.33 }}
				>
					Selected /
				</motion.div>
				<motion.div
					className="text-white mt-20 -ml-8"
					initial={{ opacity: 0, x: 10 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.33 }}
				>
					/ Projects
				</motion.div>
			</div>
			<WorkExample
				title={"Amazon Textract"}
				colorOverride="orange"
				contentSrc="https://www.youtube.com/embed/d3SQ-6KnXOU"
				description={
					"Extract CSV tables and raw text directly from images of documents."
				}
				badges={["Primary Developer", "Designer", "Patentholder"]}
			/>
			<WorkExample
				title={"Amazon Rekognition"}
				colorOverride="#0058ff"
				contentSrc="https://www.youtube.com/embed/gjUwPEqnEeI"
				description={
					"Pull facial identities and object labels from images and videos."
				}
				badges={["Primary Developer", "Designer", "Systems Architect"]}
			/>
			<WorkExample
				title={"Amazon CustomLabels"}
				colorOverride="rgb(41, 187, 0)"
				contentSrc="https://www.youtube.com/embed/5uNs7JFY9Tk"
				description={
					"Train a customized, production-ready AI Model in hours using only the AWS Console"
				}
				badges={[
					"Primary Developer",
					"Designer",
					"Systems Achitect",
					"Team Lead",
				]}
			/>
			<WorkExample
				title={"Facebook Commerce"}
				colorOverride="rgb(255, 203, 0)"
				description={
					"Set up a storefront, and sell inventory directly through the Facebook Mobile App"
				}
				badges={["Team Lead", "Core Developer", "Systems Architect"]}
				contentSrc="https://www.youtube.com/embed/ZK-UNVKvxoU"
			/>
			<WorkExample
				title={"Instagram Commerce"}
				colorOverride="rgb(201, 0, 129)"
				description={
					"Broadcast shopping-integrated live videos to millions of IG followers"
				}
				badges={["Team Lead", "Core Developer", "Systems Architect"]}
				contentSrc="https://www.youtube.com/embed/XD0vrmiPvls"
			/>
		</div>
	);
}
