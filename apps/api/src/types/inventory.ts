enum InventoryStatus {
	ACTIVE,
	INACTIVE,
	OUT_OF_STOCK,
}

export interface InventoryType {
	id: string;
	total_quantity: number;
	reserved_quantity: number;
	status: InventoryStatus;
	createdAt: Date;
	updatedAt: Date;
}
