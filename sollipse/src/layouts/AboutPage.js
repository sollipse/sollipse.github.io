import { motion } from "framer-motion";
import DevIcon from "../components/DevIcon";
import "./BorderAnimation.css";
const RESUME_URL =
	"https://pk-resume.s3-us-west-2.amazonaws.com/Awesome_CV+(1).pdf";
const SKILL_ICON_SET = [
	"devicon-amazonwebservices-plain-wordmark",
	"devicon-javascript-plain",
	"devicon-typescript-plain",
	"devicon-php-plain",
	"devicon-python-plain-wordmark",
	"devicon-react-original-wordmark",
	"devicon-docker-plain",
	"devicon-jest-plain",
];
export default function AboutPage() {
	return (
		<motion.div
			animate={{ y: 0, opacity: 1 }}
			initial={{ y: 10, opacity: 0 }}
			transition={{ duration: 1 }}
			className="h-full w-full flex flex-col justify-center items-center"
		>
			<div
				style={{ background: "rgba(0,0,0,.88)" }}
				className="draw columns-1 top-20 relative rounded-[12px] md:w-3/5 shadow-md md:flex-row md:max-w-xl text-white"
			>
				<motion.span
					style={{
						fontFamily: "Oxanium",
						left: "-270px",
						right: "0px",
					}}
					animate={{
						opacity: 1,
						right: "0px",
					}}
					initial={{
						opacity: 0,
						right: "-40px",
					}}
					transition={{ duration: 1 }}
					className="text-red -top-12 text-4xl absolute font-semibold"
				>
					paul<span style={{ color: "red" }}></span>
				</motion.span>
				<motion.div
					animate={{
						opacity: 1,
						left: "0px",
					}}
					initial={{
						opacity: 0,
						left: "-40px",
					}}
					transition={{ duration: 1 }}
					style={{
						fontFamily: "Oxanium",
						textAlign: "center",
						left: "0px",
						right: "-270px",
					}}
					className="-top-12 absolute text-4xl top-3 font-semibold"
				>
					<span style={{ color: "red" }}></span>kang
				</motion.div>
				<div className="absolute w-full flex justify-center -top-24">
					<motion.img
						animate={{
							marginBottom: 0,
						}}
						initial={{
							marginBottom: -100,
						}}
						transition={{ duration: 1 }}
						className="border-4 border-red left-0 top-0 right-0 bottom-0 w-44 rounded-full overflow-hidden shadow"
						src="https://pk-resume.s3.us-west-2.amazonaws.com/face.jpg"
						alt=""
					/>
				</div>

				<div
					className="flex h-100 flex-col p-8 pt-4 leading-normal text-center"
					style={{ height: 300 }}
				>
					<h6
						style={{
							textAlign: "left",
							fontFamily: "Oxanium",
						}}
						className="text-center mb-2 text-red text-2xl mt-20 font-bold"
					>
						<span style={{ color: "red" }}>/</span>about
					</h6>
					<p
						style={{ fontFamily: "Open Sans" }}
						className="text-white text-l text-white tracking-normal leading-7 text-left"
					>
						I'm Paul - your friendly neighborhood frontend engineer.
						I've spent the past decade working on interesting
						problems in the AI domain, including confidential
						patents for AWS Computer Vision.
						<br />
						<br />
						I'm currently a senior contributor @
						<a href="https://www.metacareers.com/">
							<b style={{ textDecoration: "underline" }}>
								Meta Commerce
							</b>
						</a>{" "}
						in Seattle, where we're building the future of social
						commerce.
					</p>
					<h6
						style={{ textAlign: "left", fontFamily: "Oxanium" }}
						className="text-center mb-2 text-red text-2xl mt-10 font-bold"
					>
						<span style={{ color: "red" }}>/</span>ski11s
					</h6>
					<div className="flex pt-1 pb-1 flex-wrap justify-start items-stretch">
						{SKILL_ICON_SET.map((icon, stagger) => (
							<DevIcon
								key={stagger}
								iconName={icon}
								stagger={0.5}
							/>
						))}
					</div>
					<h6
						style={{
							textAlign: "left",
							fontFamily: "Oxanium",
						}}
						className="text-center pt-5 text-red text-2xl font-bold"
					></h6>
					<a
						style={{
							textAlign: "left",
							fontFamily: "Oxanium",
						}}
						href={RESUME_URL}
						target="__blank"
					>
						<motion.span
							animate={{ opacity: 1 }}
							whileHover={{
								boxShadow: "inset 240px 0 0 0 red",
								color: "black",
								transition: { duration: 0.1 },
							}}
							initial={{
								color: "white",
								boxShadow: "inset 0 0 0 0 white",
								opacity: 0,
							}}
							className="w-full p-2 pl-0 text-center cursor-pointer mt-3 mb-10 text-red text-2xl font-bold transition-all"
						>
							<span style={{ color: "red" }}>/</span>
							down1oad_resume
						</motion.span>
					</a>
					<div className="pb-10" />
				</div>
			</div>
		</motion.div>
	);
}
