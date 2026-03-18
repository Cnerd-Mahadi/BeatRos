import { ProductSchema } from "@/types/product";
import { motion } from "framer-motion";
import Link from "next/link";

type ProductCardProps = ProductSchema;

const ProductCard = ({
	id,
	title,
	priceInCents,
	imageUrl,
	description,
}: ProductCardProps) => {
	return (
		<Link href={`/product/${id}`}>
			<motion.div
				className="group cursor-pointer"
				whileHover={{ y: -3 }}
				transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
				<div className="bg-muted/50 rounded-xl w-full aspect-square overflow-hidden">
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
					/>
				</div>
				<div className="mt-4 space-y-1">
					<h3 className="font-semibold text-foreground text-[15px] leading-snug tracking-tight group-hover:text-primary transition-colors">
						{title}
					</h3>
					{description && (
						<p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
							{description}
						</p>
					)}
					<p className="font-bold text-foreground text-[15px] pt-1">
						${(priceInCents / 100).toFixed(2)}
					</p>
				</div>
			</motion.div>
		</Link>
	);
};

export default ProductCard;
