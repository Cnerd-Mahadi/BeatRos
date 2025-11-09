import {
	Body,
	Container,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

export interface LineItem {
	title: string;
	quantity: number;
	price: number;
}

export interface OrderConfirmationProps {
	orderId: string;
	lineItems: LineItem[];
	total: number;
}

export const OrderConfirmation = ({
	orderId,
	lineItems,
	total,
}: OrderConfirmationProps) => {
	return (
		<Html>
			<Preview>Order #{orderId} confirmed!</Preview>
			<Tailwind>
				<Body className="bg-gray-100 font-sans">
					<Container className="mx-auto px-4 py-8 max-w-xl">
						<Section className="bg-white p-8 rounded-lg">
							{/* Header */}
							<Heading className="mb-2 font-bold text-green-600 text-2xl text-center">
								Order Confirmed
							</Heading>
							<Text className="mb-6 text-gray-600 text-center">#{orderId}</Text>

							<Hr className="my-6 border-gray-200" />

							{/* Order Summary */}
							<Heading className="mb-4 font-semibold text-lg">
								Order Summary
							</Heading>

							{/* Items */}
							<table className="mb-6 w-full">
								<thead>
									<tr className="border-b">
										<th className="py-2 text-gray-600 text-sm text-left">
											Item
										</th>
										<th className="py-2 text-gray-600 text-sm text-center">
											Qty
										</th>
										<th className="py-2 text-gray-600 text-sm text-right">
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									{lineItems.map((item, i) => (
										<tr key={i} className="border-b">
											<td className="py-3 text-gray-800">{item.title}</td>
											<td className="py-3 text-gray-700 text-center">
												{item.quantity}
											</td>
											<td className="py-3 text-gray-700 text-right">
												${(item.quantity * item.price).toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>

							{/* Total */}
							<div className="pt-4 border-t text-right">
								<Text className="font-bold text-gray-900 text-xl">
									Total: ${total.toFixed(2)}
								</Text>
							</div>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};
