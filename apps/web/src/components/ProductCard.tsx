import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	image: string;
	description?: string;
}

const ProductCard = ({
	id,
	name,
	price,
	image,
	description,
}: ProductCardProps) => {
	return (
		<Link href={`/product/${id}`}>
			<div className="group cursor-pointer">
				<motion.div
					whileHover={{ y: -6 }}
					transition={{
						duration: 0.3,
						ease: [0.25, 0.1, 0.25, 1],
					}}
					className="bg-white shadow-sm group-hover:shadow-md ring-border/60 group-hover:ring-border rounded-lg ring-1 w-full aspect-square overflow-hidden transition-all duration-300 ease-smooth">
					<motion.img
						whileHover={{ scale: 1.015 }}
						transition={{
							duration: 0.3,
							ease: [0.25, 0.1, 0.25, 1],
						}}
						src={image}
						alt={name}
						className="w-full h-full object-center object-cover"
					/>
				</motion.div>
				<div className="mt-3">
					<h3 className="font-semibold group-hover:text-primary text-base tracking-tight transition-colors duration-200">
						{name}
					</h3>
					{description && (
						<p className="mt-1 text-[13px] text-muted-foreground leading-5">
							{description}
						</p>
					)}
					<p className="mt-2 font-semibold text-primary text-base">
						${price.toFixed(2)}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
