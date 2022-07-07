import React, { useEffect, useState, useRef } from "react";
import useAnimateDistortedMusicSphere from "../hooks/UseAnimateDistortedMusicSphere";
import { motion } from "framer-motion";

export default function MusicSphere() {
	let [animationID, setAnimationID] = useState();
	const appRef = useRef();
	const canvasRef = useRef();
	useAnimateDistortedMusicSphere(canvasRef, animationID, setAnimationID);
	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 1.5 }}
			className="absolute -z-10 h-screen w-screen mx-auto top-0 pointer-events-none"
			ref={appRef}
		>
			<canvas ref={canvasRef} />
		</motion.div>
	);
}
