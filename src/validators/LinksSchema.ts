import { z } from "zod";

export const createLinksSchema = z.object({
  body: z.object({
    image: z.string().url(),
    link: z.string().url(),
    name: z.string().min(5).max(10),
    description: z.string().min(5).max(10),
  }),
});

export const updateLinksSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    image: z.string().url(),
    link: z.string().url(),
    name: z.string().min(5).max(10),
    description: z.string().min(5).max(10),
  }),
});