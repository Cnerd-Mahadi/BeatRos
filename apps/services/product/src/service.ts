import type { Request } from "express";
import { HttpError, STATUS } from "shared";
import { Prisma } from "../generated/prisma/index";
import { productFilterSchema, SortFilter } from "./type";

export const filterProducts = (req: Request) => {
	const { brand, category, sort_by, price_range, max_price, min_price, ids } =
		req.query;
	const filterQueryOptions = {
		brand: brand,
		category: category,
		sort_by: sort_by,
		price_range:
			price_range === "true"
				? {
						low: max_price,
						high: min_price,
					}
				: undefined,
		ids: ids ? String(ids).split(",") : undefined,
	};
	const parsedQuery = productFilterSchema.safeParse(filterQueryOptions);
	if (!parsedQuery.success) {
		throw new HttpError(STATUS.BAD_REQUEST, parsedQuery.error.message);
	}

	const filterQuery = parsedQuery.data;
	function processSortBy(): Prisma.ProductOrderByWithRelationInput {
		switch (filterQuery?.sort_by) {
			case SortFilter.NEWEST:
				return { createdAt: "desc" as const };
			case SortFilter.OLDEST:
				return { createdAt: "asc" as const };
			case SortFilter.PRICE_HL:
				return { priceInCents: "desc" as const };
			case SortFilter.PRICE_LH:
				return { priceInCents: "asc" as const };
			default:
				return {};
		}
	}
	const where: Prisma.ProductWhereInput = {};
	if (filterQuery.brand) {
		where.brandId = filterQuery.brand;
	}
	if (filterQuery.category) {
		where.productCategories = {
			some: {
				categoryID: filterQuery.category,
			},
		};
	}
	if (filterQuery.price_range) {
		where.priceInCents = {
			gte: filterQuery.price_range.high,
			lte: filterQuery.price_range.low,
		};
	}
	const orderBy = processSortBy();

	console.log("FILTER: ", req.url, req.query, parsedQuery.data, where, orderBy);

	return { orderBy, where };
};
