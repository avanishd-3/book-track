"use server";

import { addBook, deleteBook } from "@/data-access/book-access";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Zod schemas
import { MultipleBookSuggestionsSchema } from "./zod-schemas";

/* Authentication Actions */

export async function getUserId() {
    const session = await auth.api.getSession({
        headers: await headers(),
      })
    
    const currentUserId = session?.user?.id;

    return currentUserId;
}

/* Database Actions (wrapper over data-access layer) */

export async function addBookAction(formData: FormData) {

    console.log("Adding book with form data:");

    // Extract book details from form data
    const bookId = crypto.randomUUID(); // Generate a unique ID for the book
    const title = formData.get("title")?.toString();
    const author = formData.get("author")?.toString();
    const userId = await getUserId();
    
    // Validate input
    if (!title || !author || !userId) { // Fields entered by user or current user ID
        throw new Error("All fields are required");
    }
    
    await addBook({
        id: bookId,
        title: title,
        author: author,
        userId: userId,
    })
    
    // Redirect to the dashboard after adding the book
    revalidatePath("/dashboard"); // Clear cache for the dashboard page
    redirect("/dashboard");
}

export async function removeBookAction(bookId: string) {
    const userId = await getUserId();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    await deleteBook(userId, bookId);

    // Redirect to the dashboard after adding the book
    revalidatePath("/dashboard"); // Clear cache for the dashboard page
    redirect("/dashboard");
}

/* Search Actions */

export async function getBookSuggestionsAction(query: string) {
    if (!query) {
        // I don't think this will happen, but just in case
        return null;
    }

    // Fetch book suggestions from ISBNDB API
    // Limit to 3 results for suggestions
    // Use shouldMatchAll=0 to allow partial matches
    const params = new URLSearchParams({
        page: '1',
        pageSize: '3',
        shouldMatchAll: "0"
    });

    // Must encode query to safely include user input in URL
    const url = `https://api2.isbndb.com/books/${encodeURIComponent(query)}?${params.toString()}`;

    const res = await fetch(url, {
        headers: {
            'Authorization': process.env.ISBNDB_API_KEY || '',
            'Content-Type': 'application/json', // I don't think ISBNdb API needs this, but just in case
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
    });

    // Cannot console log errors in server components, so handle errors (somewhat) gracefully

    if (!res.ok) {
        return null;
    }

    const suggestions = await res.json();

    const parsedBooks = MultipleBookSuggestionsSchema.safeParse(suggestions);

    if (!parsedBooks.success) {
        return null;
    }

    const books = parsedBooks.data.books;

    return books;
}