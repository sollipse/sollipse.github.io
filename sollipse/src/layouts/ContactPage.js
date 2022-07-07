import { motion } from "framer-motion";
import DevIcon from "../components/DevIcon";
const CONTACT_ICON_SET = [
	[
		"devicon-linkedin-plain",
		"https://www.linkedin.com/in/paul-kang-67a75494",
	],
	[
		"devicon-twitter-plain",
		"https://twitter.com/sollipse?status=Isn't tweeting fun?”",
	],
	[
		"devicon-google-plain",
		"mailto:paulhyokang+personalsite@gmail.com?subject=Reaching%20out",
	],
];
export default function ContactPage() {
	return (
		<motion.div
			animate={{ y: 0, opacity: 1 }}
			initial={{ y: 10, opacity: 0 }}
			transition={{ duration: 1 }}
			className="h-fit w-screen flex mt-60 flex-col justify-center items-center"
		>
			<div
				className="text-4xl text-white"
				style={{ fontFamily: "Oxanium" }}
			>
				/connect
			</div>
			<div className="flex flex-row">
				{CONTACT_ICON_SET.map(([i, link], index) => (
					<a href={link} target="__blank" className="p-6">
						<div className="flex pt-1 pb-1 flex-wrap justify-start items-stretch">
							<DevIcon
								iconName={i}
								stagger={index / 2}
								key={index}
							/>
						</div>
					</a>
				))}
			</div>
		</motion.div>
	);
}
