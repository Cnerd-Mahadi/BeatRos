import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
	return (
		<div className="w-full">
			<Skeleton className="rounded-xl w-full aspect-square" />
			<div className="space-y-2 mt-4">
				<Skeleton className="w-3/4 h-4" />
				<Skeleton className="w-full h-3" />
				<Skeleton className="mt-1 w-16 h-4" />
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
