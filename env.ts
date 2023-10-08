import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_APP_URL: z.string(),
    PORT: z.string(),
});
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error(
        `Missing or invalid environment variable${parsed.error.errors.length > 1 ? "s" : ""}:
${parsed.error.errors.map((error) => `  ${error.path}: ${error.message}`).join("\n")}
`
    );
    process.exit(1);
}

export const env = Object.freeze(parsed.data);
