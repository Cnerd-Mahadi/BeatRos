export const getRatings = (count: number) => {
	const rateArray: number[] = count > 0 ? Array.from(Array(count).keys()) : [];
	return rateArray;
};

export const CATEGORIES = {
	ALL: "All",
	HEADPHONES: "Headphones",
	EARBUDS: "Earbuds",
	EARPHONES: "Earphones",
	NECKBANDS: "Neckbands",
};

export const BRANDS = {
	JBL: "JBL",
	BOAT: "boAt",
	SONY: "Sony",
};

export const SORTS = {
	TOP_PRODUCTS: "Top Products",
	FEATURED: "Featured",
	LOW_TO_HIGH: "Low to High",
	HIGH_TO_LOW: "High to Low",
	PRICE_RANGE: "Price Range",
};

export const filterBrands = [
	{ id: 1, name: BRANDS.JBL, checked: false },
	{ id: 2, name: BRANDS.BOAT, checked: false },
	{ id: 3, name: BRANDS.SONY, checked: false },
];
export const filterCategories = [
	{ id: 1, name: CATEGORIES.HEADPHONES, checked: false },
	{ id: 2, name: CATEGORIES.EARBUDS, checked: false },
	{ id: 3, name: CATEGORIES.EARPHONES, checked: false },
	{ id: 4, name: CATEGORIES.NECKBANDS, checked: false },
];

export const BREAKPOINTS = {
	LARGEST: 87 * 16,
	LARGE: 70 * 16,
	MEDIUM: 60 * 16,
	SMALL: 40 * 16,
	SMALLEST: 31 * 16,
};
