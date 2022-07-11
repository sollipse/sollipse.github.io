import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
export default function NavigationBar() {
	const [showMobileMenu, toggleMobileMenu] = useState(false);
	const { pathname } = useLocation();
	return (
		<motion.nav
			animate={{
				opacity: 1,
				x: 0,
			}}
			style={{ zIndex: 100 }}
			initial={{ opacity: 0, x: -5 }}
			transition={{ duration: 1 }}
		>
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
							onClick={() => toggleMobileMenu(!showMobileMenu)}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>

							<svg
								className="hidden h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="flex-1 flex sm:justify-between">
						<div className="flex-shrink-0 flex items-center grow">
							<div
								style={{ fontFamily: "Oxanium", fontSize: 18 }}
								className="hidden sm:block w-auto text-white font-extrabold"
							>
								@sollipse
							</div>
						</div>
						<div className="hidden sm:block">
							<div
								className="flex"
								style={{ background: "rgba(0,0,0,.9)" }}
							>
								<Link
									style={{
										fontFamily: "Oxanium",
										fontSize: 18,
									}}
									to={"/"}
									className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-extrabold items-end transition-all"
								>
									/home
								</Link>
							</div>
						</div>
						<div className="hidden sm:block">
							<div
								className="flex"
								style={{ background: "rgba(0,0,0,.9)" }}
							>
								<Link
									style={{
										fontFamily: "Oxanium",
										fontSize: 18,
									}}
									to={"/about"}
									className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-extrabold items-end transition-all"
								>
									/about
								</Link>
							</div>
						</div>

						<div className="hidden sm:block">
							<div
								className="flex"
								style={{ background: "rgba(0,0,0,.9)" }}
							>
								<Link
									style={{
										fontFamily: "Oxanium",
										fontSize: 18,
									}}
									to={"/contact"}
									className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-extrabold items-end transition-all"
								>
									/contact
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showMobileMenu && (
				<motion.div
					animate={{
						opacity: 1,
						x: 0,
						height: "auto",
						background: "rgba(0,0,0,.9)",
						zIndex: 100,
					}}
					initial={{
						opacity: 0,
						y: -10,
						height: 0,
						background: "rgba(0,0,0,0)",
					}}
					transition={{ duration: 0.3 }}
					className="fixed w-full sm:hidden"
					id="mobile-menu"
					onClick={() => toggleMobileMenu(false)}
				>
					<div className="px-2 pt-2 pb-3 space-y-1">
						<a
							style={{
								fontFamily: "Oxanium",
								fontWeight: 900,
								fontSize: 20,
							}}
							href="#/about"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							/about
						</a>
					</div>
					<div className="px-2 pt-2 pb-3 space-y-1">
						<a
							style={{
								fontFamily: "Oxanium",
								fontWeight: 900,
								fontSize: 20,
							}}
							href="#/contact"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							/contact
						</a>
					</div>
					<div className="px-2 pt-2 pb-3 space-y-1">
						<a
							style={{
								fontFamily: "Oxanium",
								fontWeight: 900,
								fontSize: 20,
							}}
							href="#"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							/home
						</a>
					</div>
				</motion.div>
			)}
		</motion.nav>
	);
}
