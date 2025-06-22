import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";

import logo from '@/assets/images/ban1.jpg';

const slides = [
	{
		id: 1,
		title: "Nurtured by Nature",
		description: "Discover ethically sourced, handcrafted products rooted in tradition and crafted with care.",
		image: logo,
		color: "#67246A",
		buttonVariant: "default"
	},
	{
		id: 2,
		title: "Pure, Simple, Organic",
		description: "We bring you nature's best—no chemicals, no compromises. Just purity in every drop.",
		image: "https://i.pinimg.com/736x/cf/e9/6a/cfe96aca38b049ddbfde022d92fbeec8.jpg",
		color: "#121769",
		buttonVariant: "secondary"
	},
	{
		id: 3,
		title: "Crafted with Purpose",
		description: "Every product tells a story—of farmers, artisans, and traditions passed through generations.",
		image: "https://i.pinimg.com/736x/23/1a/2d/231a2d0b342a080fd6f6ebcf55bdcf6a.jpg",
		color: "#FE49AF",
		buttonVariant: "destructive"
	},
];

const Hero = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState(1);
	const [isHovering, setIsHovering] = useState(false);
	const slideInterval = useRef(null);
	const touchStartX = useRef(null);

	useEffect(() => {
		if (!isHovering) {
			startSlideTimer();
		}
		return () => stopSlideTimer();
	}, [currentSlide, isHovering]);

	const startSlideTimer = () => {
		stopSlideTimer();
		slideInterval.current = setInterval(() => {
			setDirection(1);
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 6000);
	};

	const stopSlideTimer = () => {
		if (slideInterval.current) clearInterval(slideInterval.current);
	};

	const scrollToSection = () => {
		const section = document.getElementById("scroll-target");
		if (section) section.scrollIntoView({ behavior: "smooth" });
	};

	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
		stopSlideTimer();
	};

	const handleTouchEnd = (e) => {
		if (touchStartX.current !== null) {
			const diffX = e.changedTouches[0].clientX - touchStartX.current;
			if (Math.abs(diffX) > 50) {
				if (diffX > 0) {
					setDirection(-1);
					setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
				} else {
					setDirection(1);
					setCurrentSlide((prev) => (prev + 1) % slides.length);
				}
			}
		}
		touchStartX.current = null;
		startSlideTimer();
	};

	const goToSlide = (index) => {
		setDirection(index > currentSlide ? 1 : -1);
		setCurrentSlide(index);
	};

	const goToPrevSlide = () => {
		setDirection(-1);
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToNextSlide = () => {
		setDirection(1);
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const slideVariants = {
		enter: (direction) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0
		}),
		center: {
			x: 0,
			opacity: 1
		},
		exit: (direction) => ({
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0
		})
	};

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" }
		}
	};

	return (
		<div 
			className="w-full h-screen overflow-hidden relative"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<AnimatePresence custom={direction} initial={false}>
				<motion.div
					key={slides[currentSlide].id}
					custom={direction}
					variants={slideVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
					className="absolute inset-0 z-0"
				>
					<img
						src={slides[currentSlide].image}
						alt="Slide Background"
						className="absolute inset-0 w-full h-full object-cover"
						style={{
							filter: "brightness(0.7) contrast(1.1)",
							mixBlendMode: "multiply"
						}}
					/>
					<div 
						className="absolute inset-0"
						style={{ 
							backgroundColor: slides[currentSlide].color,
							opacity: 0.3,
							mixBlendMode: "overlay"
						}}
					/>
				</motion.div>
			</AnimatePresence>

			{/* Hide arrow buttons on mobile, show only on sm and up */}
			<div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 hidden sm:block">
				<motion.button
					onClick={goToPrevSlide}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="bg-[#EBEBD3] bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg"
					style={{ color: slides[currentSlide].color }}
				>
					<ChevronLeft size={28} strokeWidth={2.5} />
				</motion.button>
			</div>
			<div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 hidden sm:block">
				<motion.button
					onClick={goToNextSlide}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="bg-[#EBEBD3] bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg"
					style={{ color: slides[currentSlide].color }}
				>
					<ChevronRight size={28} strokeWidth={2.5} />
				</motion.button>
			</div>

			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
				{slides.map((_, index) => (
					<motion.button
						key={index}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							currentSlide === index ? "bg-[#EBEBD3] opacity-100" : "bg-[#EBEBD3] opacity-50"
						}`}
						style={{
							width: currentSlide === index ? "1.5rem" : "0.75rem",
							backgroundColor: currentSlide === index ? slides[currentSlide].color : "#EBEBD3"
						}}
						onClick={() => goToSlide(index)}
					/>
				))}
			</div>

			<div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-20 lg:px-32">
				<AnimatePresence mode="wait">
					<motion.div
						key={`content-${currentSlide}`}
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={{
							visible: {
								transition: { staggerChildren: 0.1 }
							}
						}}
						className="max-w-2xl"
					>
						<motion.h1
							variants={textVariants}
							className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
							style={{ color: "#EBEBD3", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
						>
							{slides[currentSlide].title}
						</motion.h1>

						<motion.p
							variants={textVariants}
							className="text-xl md:text-2xl mb-8 font-medium"
							style={{ color: "#EBEBD3", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
						>
							{slides[currentSlide].description}
						</motion.p>

						<motion.div
							variants={textVariants}
							className="flex gap-4 flex-wrap"
						>
							<motion.div whileHover={{ y: -2 }}>
								<Button
									variant={slides[currentSlide].buttonVariant as "default" | "secondary" | "destructive" | "link" | "outline" | "ghost"}
									className="px-8 py-6 rounded-full shadow-lg font-semibold text-lg flex items-center gap-2"
									onClick={scrollToSection}
								>
									<ShoppingBag className="h-5 w-5" />
									Shop Now
								</Button>
							</motion.div>
							<motion.div whileHover={{ y: -2 }}>
								<Button
									variant="outline"
									className="px-8 py-6 rounded-full border-2 font-semibold text-lg flex items-center gap-2"
									style={{ 
										borderColor: "#EBEBD3",
										color: "#EBEBD3",
										backgroundColor: "rgba(235, 235, 211, 0.1)"
									}}
								>
									<Heart className="h-5 w-5" />
									Learn More
								</Button>
							</motion.div>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="absolute bottom-4 right-4 z-20">
				<motion.div
					animate={{ 
						y: [0, -10, 0],
						transition: { 
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut"
						}
					}}
					className="text-[#EBEBD3] text-sm font-medium flex items-center gap-1"
				>
					<span>Scroll Down</span>
					<motion.div
						animate={{ 
							y: [0, 5, 0],
							transition: { 
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut"
							}
						}}
					>
						<ChevronRight className="rotate-90" />
					</motion.div>
				</motion.div>
			</div>

			<style>{`
				@media (max-width: 640px) {
					.h-screen {
						height: 55vh !important;
						min-height: 320px;
						max-height: 420px;
					}
					.text-4xl {
						font-size: 1.5rem;
					}
					.text-xl {
						font-size: 1rem;
					}
					.md\\:text-6xl {
						font-size: 2rem;
					}
					.md\\:text-2xl {
						font-size: 1.1rem;
					}
					.px-8 {
						padding-left: 1.1rem;
						padding-right: 1.1rem;
					}
					.py-6 {
						padding-top: 0.7rem;
						padding-bottom: 0.7rem;
					}
					.rounded-full {
						border-radius: 9999px;
					}
					.gap-4 {
						gap: 0.7rem;
					}
					.mb-8 {
						margin-bottom: 1.1rem;
					}
					.mb-4 {
						margin-bottom: 0.6rem;
					}
					.shadow-lg {
						box-shadow: 0 2px 8px rgba(0,0,0,0.10);
					}
					.flex.items-center.gap-2 {
						gap: 0.4rem;
					}
					.px-6 {
						padding-left: 0.7rem;
						padding-right: 0.7rem;
					}
					.py-4 {
						padding-top: 0.5rem;
						padding-bottom: 0.5rem;
					}
					.text-lg {
						font-size: 0.98rem;
					}
					.font-semibold {
						font-weight: 600;
					}
					.max-w-2xl {
						max-width: 95vw;
					}
				}
			`}</style>
		</div>
	);
};

export default Hero;