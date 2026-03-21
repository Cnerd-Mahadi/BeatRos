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
		quantity: li.quantity,
		price_data: {
			unit_amount: li.price,
			currency: "USD",
			product_data: {
				name: li.title,
				images: [li.image],
			},
		},
	}));
	const appBaseUrl = new URL(_env.CHECKOUT_SUCCESS_URL).origin;

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
		cancel_url: `${appBaseUrl}/checkout`,
		customer_email: email,
		customer_creation: "always",
		custom_text: {
			submit: {
				message:
					"TEST MODE: Use card 4242 4242 4242 4242 · Any future expiry · Any 3-digit CVC",
			},
		},
	});

	return checkoutSession;
};
