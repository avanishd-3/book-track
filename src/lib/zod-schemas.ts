import { z } from 'zod';

// Throws away dewey_decimal, binding, dimensions, msrp, reviews, prices, related, other_isbns

// This assumes ISBNdb API response structure, but that API is not free.
export const BookResultSchema = z.object({
    title: z.string(),
    title_long: z.string(),
    isbn: z.string(),
    isbn13: z.string(),
    publisher: z.string(),
    language: z.string(),
    date_published: z.string(),
    edition: z.string(),
    pages: z.number(),
    overview: z.string(),
    image: z.string().url(),
    image_original: z.string().url(),
    excerpt: z.string(),
    synopsis: z.string(),
    authors: z.array(z.string()),
    subjects: z.array(z.string()),
})

export const MultipleBookSuggestionsSchema = z.object({
    books: z.array(BookResultSchema),
});

// Export types for use in components and actions
export type BookResult = z.infer<typeof BookResultSchema>;
export type MultipleBookSuggestions = z.infer<typeof MultipleBookSuggestionsSchema>;