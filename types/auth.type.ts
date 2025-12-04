import { authSchema, createPasswordSchema } from "@/schema/auth.schema";
import { z } from "zod";

export type AuthType = z.infer<typeof authSchema>;
export type CreatePasswordType = z.infer<typeof createPasswordSchema>;
