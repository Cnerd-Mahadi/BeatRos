import Stripe from "stripe";
import { _env } from "../env";

export const stripe = new Stripe(_env.STRIPE_SECRET_KEY);
