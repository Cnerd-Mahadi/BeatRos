import { render } from "@react-email/render";
import { LineItem, OrderConfirmation } from "./templates/orderConfirmation";

export const orderConfirmation = (
	orderId: string,
	lineItems: LineItem[],
	total: number
) => render(OrderConfirmation({ orderId, lineItems, total }));
