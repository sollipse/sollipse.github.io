import { motion } from "framer-motion";
export default function DevIcon({ iconName, stagger, colorOverride }) {
	return (
		<motion.i
			animate={{
				color: colorOverride ?? "rgb(255,255,255)",
				transform: "translateY(0px)",
			}}
			initial={{ color: "rgb(30,30,30)", transform: "translateY(5px)" }}
			style={{ fontSize: "60px" }}
			className={`${iconName} p-3`}
			transition={{ delay: stagger * 0.3 + 0.5, duration: 0.5 }}
		/>
	);
}
