export type filterObjectType = {
	id: number;
	name: string;
	checked: boolean;
};

export type filtersType = {
	categories: filterObjectType[];
	brands: filterObjectType[];
};
