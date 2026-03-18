import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<main className="flex flex-1 justify-center px-6 sm:px-8 lg:px-12 py-10">
				<div className="w-full max-w-6xl">
					<div className="flex items-center gap-2 mb-8">
						<Skeleton className="w-10 h-4" />
						<Skeleton className="rounded-full w-3 h-3" />
						<Skeleton className="w-10 h-4" />
						<Skeleton className="rounded-full w-3 h-3" />
						<Skeleton className="w-28 h-4" />
					</div>

					<div className="gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-2">
						<Skeleton className="rounded-2xl aspect-square" />

						<div className="flex flex-col space-y-6">
							<Skeleton className="w-20 h-3" />
							<Skeleton className="w-3/4 h-9" />

							<div className="flex items-center gap-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton
										key={i}
										className="rounded w-4 h-4"
									/>
								))}
								<Skeleton className="w-8 h-4 ml-2" />
							</div>

							<Skeleton className="w-28 h-8" />

							<div className="space-y-2">
								<Skeleton className="w-full h-4" />
								<Skeleton className="w-full h-4" />
								<Skeleton className="w-4/5 h-4" />
							</div>

							<div className="space-y-3 mt-4">
								<Skeleton className="w-24 h-5" />
								{Array.from({ length: 4 }).map((_, idx) => (
									<div
										key={idx}
										className="flex items-center gap-2.5">
										<Skeleton className="rounded-full w-4 h-4" />
										<Skeleton className="flex-1 h-4" />
									</div>
								))}
							</div>

							<div className="flex gap-3 mt-6">
								<Skeleton className="flex-1 rounded-lg h-12" />
								<Skeleton className="flex-1 rounded-lg h-12" />
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ProductDetailSkeleton;
