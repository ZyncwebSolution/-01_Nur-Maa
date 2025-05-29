import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import logo from '@/assets/images/ban1.jpg';  // Import your logo here

const slides = [
	{
		id: 1,
		title: "Nurtured by Nature",
		description:
			"Discover ethically sourced, handcrafted products rooted in tradition and crafted with care.",
		image: logo, // Use the imported logo variable directly
	},
	{
		id: 2,
		title: "Pure, Simple, Organic",
		description:
			"We bring you nature’s best—no chemicals, no compromises. Just purity in every drop.",
		image: "https://i.pinimg.com/736x/cf/e9/6a/cfe96aca38b049ddbfde022d92fbeec8.jpg",
	},
	{
		id: 3,
		title: "Crafted with Purpose",
		description:
			"Every product tells a story—of farmers, artisans, and traditions passed through generations.",
		image: "https://i.pinimg.com/736x/23/1a/2d/231a2d0b342a080fd6f6ebcf55bdcf6a.jpg",
	},
];

const Hero = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideInterval = useRef(null);
	const touchStartX = useRef(null);

	useEffect(() => {
		startSlideTimer();
		return () => stopSlideTimer();
	}, [currentSlide]);

	const startSlideTimer = () => {
		stopSlideTimer();
		slideInterval.current = setInterval(() => {
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
	};

	const handleTouchEnd = (e) => {
		if (touchStartX.current !== null) {
			const diffX = e.changedTouches[0].clientX - touchStartX.current;
			if (Math.abs(diffX) > 50) {
				if (diffX > 0) {
					setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
				} else {
					setCurrentSlide((prev) => (prev + 1) % slides.length);
				}
			}
		}
		touchStartX.current = null;
	};

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};

	const goToPrevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToNextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	return (
		<div
			className="w-full h-screen overflow-hidden relative bg-pink-100"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div className="absolute inset-0 z-0">
				{slides.map((slide, index) => (
					<img
						key={slide.id}
						src={slide.image}
						alt="Slide Background"
						className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
							currentSlide === index ? "opacity-100" : "opacity-0"
						}`}
						style={{
							filter:
								currentSlide === index
									? "brightness(0.7) sepia(0.2) hue-rotate(-20deg) saturate(1.5)"
									: "",
						}}
      
					/>
				))}

				 <div/>
			</div> 

			<div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
				<button
					onClick={goToPrevSlide}
					className="bg-pink-500 bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full text-white shadow-lg"
				>
					<ChevronLeft size={28} />
				</button>
			</div>
			<div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
				<button
					onClick={goToNextSlide}
					className="bg-pink-500 bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full text-white shadow-lg"
				>
					<ChevronRight size={28} />
				</button>
			</div>

			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
				{slides.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition-opacity duration-300 ${
							currentSlide === index
								? "bg-pink-500 opacity-100 scale-110"
								: "bg-pink-200 opacity-50"
						}`}
						onClick={() => goToSlide(index)}
					/>
				))}
			</div>

			<div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-20 text-pink-900">
				<motion.h1
					key={slides[currentSlide].title}
					className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-xl"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{slides[currentSlide].title}
				</motion.h1>

				<motion.p
					key={slides[currentSlide].description}
					className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-lg"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{slides[currentSlide].description}
				</motion.p>

				<motion.div
					key={`buttons-${currentSlide}`}
					className="flex gap-4"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<Button
						className="bg-pink-500 text-white hover:bg-pink-600 px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
						onClick={scrollToSection}
					>
						Explore Now <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="border-pink-500 text-pink-700 hover:bg-pink-100 hover:text-pink-900 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300"
					>
						Learn More
					</Button>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
