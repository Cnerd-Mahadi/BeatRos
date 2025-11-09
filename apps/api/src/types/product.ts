import { InventoryType } from "./inventory";

export interface ProductType {
	id: string;
	title: string;
	sku: string;
	description: string | null;
	priceInCents: number;
	slug: string;
	imageUrl: string | null;
	isActive: boolean;
	brandId: string | null;
	inventoryId: string;
	inventory: InventoryType;
}
