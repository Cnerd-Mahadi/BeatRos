import { _env } from "./env";
import { stripe } from "./lib/stripe";
import { LineItem } from "./type";

export const createCheckoutSession = async (
	lineItems: LineItem[],
	email: string,
	cartId: string,
	messageId: string,
	orderId: string
) => {
	const stripeLineItems = lineItems.map((li) => ({
		price: li.price.toString(),
		quantity: li.quantity,
		price_data: {
			currency: "USD",
			product_data: {
				name: li.title,
				image: li.image,
			},
		},
	}));
	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: stripeLineItems,
		metadata: {
			orderId,
			messageId,
			cartId,
		},
		mode: "payment",
		success_url: `${_env.CHECKOUT_SUCCESS_URL}?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `${_env.CHECKOUT_FAILURE_URL}?sessionId={CHECKOUT_SESSION_ID}`,
		customer_email: email,
		customer_creation: "always",
	});

	return checkoutSession;
};
