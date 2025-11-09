import z from "zod";

export const productIdsSchema = z.array(z.string().min(1));
