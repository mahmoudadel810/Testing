import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import MainSlider from "./MainSlider";
import SaidePage from "./SaidePage";
import { useUserStore } from "../stores/useUserStore"

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
	{ href: "/phones", name: "Phones", imageUrl: "/phones.jpeg" },
	{ href: "/shishas", name: "Shishas", imageUrl: "/shisha.jpeg" },
	{ href: "/pc", name: "PC", imageUrl: "/pc.jpeg" },
	{ href: "/laptops", name: "Laptops", imageUrl: "/laptop.jpeg" },
	{ href: "/screens", name: "Screens", imageUrl: "/screens.jpeg" },
	{ href: "/tabacco", name: "Tabacco", imageUrl: "/tabacco.jpeg" },
	{ href: "/vibes", name: "Vibes", imageUrl: "/vibe.jpeg" },
	{ href: "/iqoss", name: "Iqoss", imageUrl: "/iqos.jpeg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	 const { user } = useUserStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>

{/* ========================================================================== */}

 
<MainSlider/>
{
	user?<div className="flex lg:hidden ">
 <SaidePage/>
</div>:""
}


{/* ========================================================================== */}


			<div className='relative z-10 max-w-7xl w-100 mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Categores 
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover The Joy Of Shopping With Pionner
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
