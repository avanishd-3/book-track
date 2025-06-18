import { authSchema } from "@/db/schema/auth-schema";
import { text, timestamp, pgSchema} from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const bookSchema = pgSchema("book");

// TODO -> Update to use zod schema for book (so it can match ISBNdb API response)
// Remember to run generate and migrate after updating this schema
export const book = bookSchema.table("book", {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
});
