import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { CurrentSongAudioElement, IsPlaying } from "../Atoms";
import useMusicAnalysis from "../hooks/UseMusicAnalysis";

export default function TitleSection() {
	const setMusicAnalyzer = useMusicAnalysis();
	const audioElement = useRecoilValue(CurrentSongAudioElement);
	const isPlaying = useRecoilValue(IsPlaying);
	return (
		<div
			style={{
				fontFamily: "Oxanium",
				fontSize: 60,
				color: "white",
			}}
		>
			<span className="t-white flex justify-center">
				<motion.div
					animate={{ x: 0, opacity: 1, y: 0 }}
					initial={{ opacity: 0, x: -5, y: -2 }}
					transition={{ duration: 0.5 }}
				>
					<div>paul</div>
					<div
						style={{ fontSize: 25, marginTop: -27, marginLeft: 18 }}
					>
						software
					</div>
				</motion.div>{" "}
				<div style={{ width: 12 }} />
				<motion.div
					animate={{ x: 0, opacity: 1, y: 0 }}
					initial={{ opacity: 0, x: 5, y: -2 }}
					transition={{ duration: 0.5 }}
				>
					<div>kang</div>
					<div
						style={{
							fontSize: 25,
							marginTop: -27,
							marginLeft: -29,
						}}
					>
						engineer
					</div>
				</motion.div>
			</span>
			<div className="w-full flex justify-center mt-3">
				<motion.button
					animate={{ opacity: 1 }}
					whileHover={{
						boxShadow: "inset 110px 0 0 0 red",
						color: "black",
						transition: { duration: 0.1 },
					}}
					initial={{
						color: "white",
						boxShadow: "inset 0 0 0 0 white",
						opacity: 0,
					}}
					onClick={() => {
						setMusicAnalyzer();
						isPlaying ? audioElement.pause() : audioElement.play();
					}}
					className="text-3xl px-4 pt-1 flex direction-row transition-all"
				>
					{isPlaying ? (
						"pause"
					) : (
						<>
							play<div className="pl-1">▷</div>
						</>
					)}
				</motion.button>
			</div>
		</div>
	);
}
