// src/components/effects/loading-screen.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
	{ text: "Hello", language: "English", flag: "🇺🇸" },
	{ text: "नमस्ते", language: "Hindi", flag: "🇮🇳" },
	{ text: "Bonjour", language: "French", flag: "🇫🇷" },
	{ text: "Hola", language: "Spanish", flag: "🇪🇸" },
	{ text: "こんにちは", language: "Japanese", flag: "🇯🇵" },
	{ text: "你好", language: "Chinese", flag: "🇨🇳" },
	{ text: "Ciao", language: "Italian", flag: "🇮🇹" },
	{ text: "안녕하세요", language: "Korean", flag: "🇰🇷" },
	{ text: "Привет", language: "Russian", flag: "🇷🇺" },
	{ text: "مرحبا", language: "Arabic", flag: "🇸🇦" },
	{ text: "Olá", language: "Portuguese", flag: "🇵🇹" },
	{ text: "Hallo", language: "German", flag: "🇩🇪" },
	{ text: "Sawubona", language: "Zulu", flag: "🇿🇦" },
	{ text: "שלום", language: "Hebrew", flag: "🇮🇱" },
	{ text: "Γεια σου", language: "Greek", flag: "🇬🇷" },
];

interface LoadingScreenProps {
	onLoadingComplete?: () => void;
	duration?: number;
}

export function LoadingScreen({
	onLoadingComplete,
	duration = 4000,
}: LoadingScreenProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Change greeting every 250ms
		const greetingInterval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % greetings.length);
		}, 500);

		// Hide loading screen after duration
		const timer = setTimeout(() => {
			setIsVisible(false);
			clearInterval(greetingInterval);

			// Call callback after exit animation
			setTimeout(() => {
				onLoadingComplete?.();
			}, 500);
		}, duration);

		return () => {
			clearTimeout(timer);
			clearInterval(greetingInterval);
		};
	}, [duration, onLoadingComplete]);
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
				>
					{/* Animated Background */}
					<div className="absolute inset-0">
						{/* Gradient mesh */}
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-background to-red-500/10" />

						{/* Animated orbs */}
						<motion.div
							className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
							animate={{
								x: [0, 100, 0],
								y: [0, -50, 0],
							}}
							transition={{
								duration: 8,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
							animate={{
								x: [0, -100, 0],
								y: [0, 50, 0],
							}}
							transition={{
								duration: 10,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>

						{/* Grid pattern */}
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:50px_50px]" />
					</div>

					{/* Main Content */}
					<div className="relative z-10 flex flex-col items-center justify-center">
						{/* Greeting Display */}
						<div className="relative h-32 flex items-center justify-center mb-8">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentIndex}
									initial={{ opacity: 0, y: 20, scale: 0.8 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -20, scale: 0.8 }}
									transition={{ duration: 0.2 }}
									className="text-center"
								>
									{/* Greeting Text */}
									<h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
										{greetings[currentIndex].text}
									</h1>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					{/* Decorative Elements */}
					<div className="absolute bottom-10 left-10">
						<motion.div
							animate={{
								rotate: 360,
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
							}}
							className="w-20 h-20 border-2 border-purple-500/20 rounded-full"
						/>
					</div>

					<div className="absolute top-10 right-10">
						<motion.div
							animate={{
								rotate: -360,
							}}
							transition={{
								duration: 15,
								repeat: Infinity,
								ease: "linear",
							}}
							className="w-16 h-16 border-2 border-red-500/20 rounded-lg"
						/>
					</div>

					{/* Floating dots */}
					{[...Array(5)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-primary/30 rounded-full"
							style={{
								left: `${20 + i * 15}%`,
								top: `${30 + i * 10}%`,
							}}
							animate={{
								y: [0, -20, 0],
								opacity: [0.3, 1, 0.3],
							}}
							transition={{
								duration: 2 + i * 0.5,
								repeat: Infinity,
								delay: i * 0.2,
							}}
						/>
					))}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
