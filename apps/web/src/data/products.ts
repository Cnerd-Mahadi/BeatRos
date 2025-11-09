export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	images?: string[];
	category: string;
	rating: number;
	reviews: number;
	features?: string[];
}

export const products: Product[] = [
	{
		id: "1",
		name: "Wireless Earbuds",
		price: 99.99,
		description: "Experience true wireless freedom with our latest earbuds.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuA4zhsEQuKCWar3fFIgZl4LI53t10GqQyBj7Q3R0FneG_44wyUAOCPfpBzb1X0XxnYL-_CzX7EvNRHpX-uuo4SVB086s4d6xThTAnpdghRscvUxnCaoW2I3YodcIcO4EPv7XM8MBjDeufUX0LHH4kOH0KQc5p0k-pC5PkZPl-0-CmNQZXMfGvwc4XS29-DfeqMmH6uBpzHwwQMqcpbVcz8JKIwqszruPC797dOg3W-IkgCMoqi14UuQMLG9QEoQE3SjQ4GvnT4rs_o",
		images: [
			"https://lh3.googleusercontent.com/aida-public/AB6AXuA4zhsEQuKCWar3fFIgZl4LI53t10GqQyBj7Q3R0FneG_44wyUAOCPfpBzb1X0XxnYL-_CzX7EvNRHpX-uuo4SVB086s4d6xThTAnpdghRscvUxnCaoW2I3YodcIcO4EPv7XM8MBjDeufUX0LHH4kOH0KQc5p0k-pC5PkZPl-0-CmNQZXMfGvwc4XS29-DfeqMmH6uBpzHwwQMqcpbVcz8JKIwqszruPC797dOg3W-IkgCMoqi14UuQMLG9QEoQE3SjQ4GvnT4rs_o",
			"https://lh3.googleusercontent.com/aida-public/AB6AXuBXttWGMUdiN3REIMZ4aC9A4KmAvTZGPDdhLRwele36C3wR_ZMphBT1xkukDpVE4EKwQnyYxpmcPZXTZfI_HUh-QJtRJKNgRiKwK42MvFASQQT7DN-7FVq3mkuK5zSDVVq-3V2oN7GSBm9NfBW9apGgpaT83xBgxSXEVO3cVulj00h8qwu26AYd16px3ZZeLkry26CJDh4F4JzZtgvkOlwz8aK8xcgVVbDjZY4e_6_NYKS2XfpectX9Sfv5tZ3p9owPydGeOTTUHv8",
		],
		category: "Earbuds",
		rating: 4.5,
		reviews: 128,
		features: [
			"Active Noise Cancellation",
			"30-hour battery life",
			"IPX4 Water Resistant",
			"Premium sound quality",
		],
	},
	{
		id: "2",
		name: "Over-Ear Headphones",
		price: 199.99,
		description:
			"Enjoy premium sound quality and comfort with our over-ear headphones.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCS8KMWkk1RonwRaBiXTa05buXpiD8plWir_K93P5WvOvhyVRlQOgCtq933e9DDZlFa5acvxDLBkQaBTLDUK50Rs86yQ01QlqtWLQdgf6R1Q6t_f7Ubfk0ltszU2FP1aJoJngSXw6qChENrJBto3dhsqCIv92RXXPHOHfq184FU0P0pg1ipuQ3nUFtna72l_kVvPAWgG75UJlKjpKsymggGVLvE2OqALwhgKWhxv2MJwpHEiUxJ0l1D0l8B6mL9Mp0Sdqw1Dwj_PhI",
		images: [
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCS8KMWkk1RonwRaBiXTa05buXpiD8plWir_K93P5WvOvhyVRlQOgCtq933e9DDZlFa5acvxDLBkQaBTLDUK50Rs86yQ01QlqtWLQdgf6R1Q6t_f7Ubfk0ltszU2FP1aJoJngSXw6qChENrJBto3dhsqCIv92RXXPHOHfq184FU0P0pg1ipuQ3nUFtna72l_kVvPAWgG75UJlKjpKsymggGVLvE2OqALwhgKWhxv2MJwpHEiUxJ0l1D0l8B6mL9Mp0Sdqw1Dwj_PhI",
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDS-AaLb_zTEOWBnrh8Yn4WgotmUrH0Y48Tu2pzV7s053frI1tVV032nyL9PVphFOzBhx4FZMiQKZ2fCPQ94Wo1g3nD62MC6tfE5QMVRH5QeGmpr-onEoSJIuxsOUQ_ulC4fvk6ViFq8u33UmI-dhcLTDEaAqpiCdPCdR0DzHuU3psxe0VcQZzsYEDzB3HtEa0GXWTVopboV3Qph2MCF9BO0LgVSCoiRyqDNJ0HSbFSjIIrcc14k0eskzjWjNS8rDi69IFvEHScUpA",
		],
		category: "Headphones",
		rating: 4.8,
		reviews: 256,
		features: [
			"Premium drivers",
			"Wireless connectivity",
			"Plush memory foam",
			"40-hour battery",
		],
	},
	{
		id: "3",
		name: "Noise-Cancelling Headphones",
		price: 249.99,
		description:
			"Block out distractions and focus on your music with our noise-cancelling headphones.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuC84CEqo_GxzqHnnpdn5_03FK9M9haoXbcl9GDcCX28fqGx7aSuGJYIVgeooNb-gak_N_eA8S1tHeChqZrslJE9CkH6vJEXtu2gylKUcpKzkDQORwb3-8oQXrqf9I8Dp4mrN9jr992TEHbIZWSNWmQWFKCPpxBhqzQZ5KaGOxIYISvrUXjX2O3l6-T7ynh3Ey6hryis7le_iGWo6_BryfAfRU2h82zP9dx8DvXD2ofJYYbGoMvGEe-ZynJDrEXCULgvwjamOOdigWc",
		images: [
			"https://lh3.googleusercontent.com/aida-public/AB6AXuC84CEqo_GxzqHnnpdn5_03FK9M9haoXbcl9GDcCX28fqGx7aSuGJYIVgeooNb-gak_N_eA8S1tHeChqZrslJE9CkH6vJEXtu2gylKUcpKzkDQORwb3-8oQXrqf9I8Dp4mrN9jr992TEHbIZWSNWmQWFKCPpxBhqzQZ5KaGOxIYISvrUXjX2O3l6-T7ynh3Ey6hryis7le_iGWo6_BryfAfRU2h82zP9dx8DvXD2ofJYYbGoMvGEe-ZynJDrEXCULgvwjamOOdigWc",
			"https://lh3.googleusercontent.com/aida-public/AB6AXuAbxowdiKYZkxllMQDQrzSyxNZUMxbB_DL8E4uqrNTRqb1EM6uVJkN9EYeFAlojSqAABC6u7CdM3hM52fUWwHlFwAc6BvZBw7OXzVOAf3VZLsR9HFiipOUcxdsuF4lnuzQHCvLU9Lzb9tUFmP85tjpAld7SQUh6_uOrAT1CHjQHqzfl-Cdk5_kefeWokemID_IIEi0Mds3VMb2YAKJmy7FfDAPOpAd24XH8MHLWQh16m5Xofs_grYGyHTXotshehB7yoR8Im7LosD0",
		],
		category: "Headphones",
		rating: 4.7,
		reviews: 189,
		features: [
			"Advanced ANC",
			"Premium audio",
			"All-day comfort",
			"Touch controls",
		],
	},
	{
		id: "4",
		name: "Sports Headphones",
		price: 79.99,
		description:
			"Durable and comfortable headphones designed for your active lifestyle.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuB7Zv5XlivDSMQ_i7zUQWEbsOcV9BlHIv4C9GkKH-266KKgLCH-tIGhBF3cIGwGhOwsOQ-rjMkBhBgC9ryxSjUFo10E-Me8zIa_VsWIMj9mQBryimUk9VmnSwGBHRheXWYtNYZKDeO34jhUQ5Y9cv3qQ8U4-lkhC8MoTEozcoE00cxGTq-wCRFjkoIO8m7c3XX1s79s9J1m2OBzsnaV7A5hrCNfM42dYypxWYGmcQg5_5qAjWXuwU40hRKiPeIwYSVMNdAVe6W4Gjc",
		category: "Earbuds",
		rating: 4.3,
		reviews: 94,
		features: [
			"Sweat resistant",
			"Secure fit",
			"12-hour battery",
			"Quick charge",
		],
	},
	{
		id: "5",
		name: "Wireless Pro Headphones",
		price: 299.99,
		description: "Professional-grade wireless headphones for audiophiles.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCk6i272XpGma6UtS0RY7C3zuoJlWlbjhr0XXAB--t69x3ytf5wS798mqAQIG-5zWj0lZfT91Sn4spKgznC5jcz4YwP_Llp2VavZw22it7mF5aszZAx6wQBiThR5htwt2s_bcOg1lIeCbqRsIDvFeT_pPSZtSx2Tx3clvEWYJeSCW2Fs78gD0vqnQqyC-hB3_B-G4DUa6FChdVCFzRRyhlfH4ZHM26v3V8KWiAoUK_blprQ9DTz9e-urvfJtnbAm63YlRc3xSfSdbI",
		images: [
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCk6i272XpGma6UtS0RY7C3zuoJlWlbjhr0XXAB--t69x3ytf5wS798mqAQIG-5zWj0lZfT91Sn4spKgznC5jcz4YwP_Llp2VavZw22it7mF5aszZAx6wQBiThR5htwt2s_bcOg1lIeCbqRsIDvFeT_pPSZtSx2Tx3clvEWYJeSCW2Fs78gD0vqnQqyC-hB3_B-G4DUa6FChdVCFzRRyhlfH4ZHM26v3V8KWiAoUK_blprQ9DTz9e-urvfJtnbAm63YlRc3xSfSdbI",
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDkRGx2bz3YXpYE9Ak09piJL2FVMizSHo8S2i8ds_5FjHcV3EicW_pfLwSOlqQm71mmWYimDSl4HH0ZzKm9JiDRz5ZhipbvLeZsTkMcGOtoPmtFcpCYa_7PyAzFyQJ-yQGfgL73Q_L7XhovFztif9v5cLf40jid8RtQMaW7cD_gM7LMdmFegJNvSjtmyDAk8tiQHtYiopKnU2zmqz_hRCc8vSdFmJJ4XSpPMvW3YOPahwgiK_avsbB6gG8cStgCoqlyZkW6K5Mz37E",
		],
		category: "Headphones",
		rating: 4.9,
		reviews: 412,
		features: [
			"Hi-Res audio",
			"Studio quality",
			"Premium materials",
			"50-hour battery",
		],
	},
	{
		id: "6",
		name: "True Wireless Earbuds",
		price: 129.99,
		description: "Crystal clear sound in a compact, wireless design.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuBLc4pfIt_IOacWwti9ihVpxVBHXYuC_EgVJKE1og9D8-oge89O3OVX37o41H7qhALtqpPXPHE1stPcJW6LcY2gs9moZ7aCdGFeMjJ5qkunYqxtScLye8Dg5LlHNg20JNhJAimBPT2Sj0jA5sEoC9m0ViYgOmG__RmwKXpUjBm4q3nG8F0yRkHbBvXMFwzuw5qgq8yb0pi_uBreTElcLzVX8PbDZKP5Wa4drQub7Tk-t7VkBdjtOYqq9cmdmotfzUy32bAh2t-l5KM",
		category: "Earbuds",
		rating: 4.6,
		reviews: 203,
		features: [
			"True wireless",
			"Touch controls",
			"20-hour case",
			"Premium sound",
		],
	},
];
