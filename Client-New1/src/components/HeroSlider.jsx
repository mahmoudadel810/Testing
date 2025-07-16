import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);

	const slides = [
		{
			id: 1,
			image: '/src/assets/hero1.jpg',
			title: "Latest Smartphones",
			subtitle: "Discover the newest mobile technology",
			description: "Get the latest smartphones with cutting-edge features and amazing performance.",
			cta: "Shop Now",
			link: "/shop"
		},
		{
			id: 2,
			image: '/src/assets/hero2.jpg',
			title: "Gaming Laptops",
			subtitle: "Ultimate gaming experience",
			description: "High-performance gaming laptops for the ultimate gaming experience.",
			cta: "Explore Gaming",
			link: "/shop"
		},
		{
			id: 3,
			image: '/src/assets/hero3.jpg',
			title: "Smart Home Devices",
			subtitle: "Automate your life",
			description: "Transform your home with smart devices and IoT technology.",
			cta: "Smart Home",
			link: "/shop"
		},
		{
			id: 4,
			image: '/src/assets/hero4.webp',
			title: "Audio Equipment",
			subtitle: "Premium sound quality",
			description: "Experience crystal clear audio with our premium sound equipment.",
			cta: "Listen Now",
			link: "/shop"
		},
		{
			id: 5,
			image: '/src/assets/hero5.jpg',
			title: "Accessories & More",
			subtitle: "Complete your setup",
			description: "Find the perfect accessories to complement your devices.",
			cta: "Shop Accessories",
			link: "/shop"
		}
	];

	useEffect(() => {
		let interval;
		if (isPlaying) {
			interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % slides.length);
			}, 5000);
		}
		return () => clearInterval(interval);
	}, [isPlaying, slides.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<section className="relative w-full h-screen overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0, scale: 1.1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					className="absolute inset-0"
				>
					{/* Background Image */}
					<div className="absolute inset-0">
						<img
							src={slides[currentSlide].image}
							alt={slides[currentSlide].title}
							className="w-full h-full object-cover"
						/>
						{/* Overlay */}
						<div className="absolute inset-0 bg-black/40" />
					</div>

					{/* Content */}
					<div className="relative z-10 flex items-center justify-center h-full">
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-4xl mx-auto text-center text-white">
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
								>
									<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
										{slides[currentSlide].title}
									</h1>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.4 }}
								>
									<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-blue-200">
										{slides[currentSlide].subtitle}
									</h2>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.6 }}
								>
									<p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
										{slides[currentSlide].description}
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.8 }}
								>
									<Link
										to={slides[currentSlide].link}
										className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
									>
										{slides[currentSlide].cta}
									</Link>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
			>
				<ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
			</button>

			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
			>
				<ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
			</button>

			{/* Play/Pause Button */}
			<button
				onClick={togglePlayPause}
				className="absolute top-4 right-4 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
			>
				{isPlaying ? (
					<Pause size={20} className="text-white" />
				) : (
					<Play size={20} className="text-white" />
				)}
			</button>

			{/* Dots Indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentSlide
								? 'bg-white scale-125'
								: 'bg-white/50 hover:bg-white/75'
						}`}
					/>
				))}
			</div>

			{/* Progress Bar */}
			<div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
				<motion.div
					className="h-full bg-gradient-to-r from-primary to-accent"
					initial={{ width: 0 }}
					animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
					transition={{ duration: 0.3 }}
				/>
			</div>
		</section>
	);
};

export default HeroSlider;

