"use client"; // Must be a client component because it is part of book search command, which is a client component
// Cannot put a server component inside a client component

import { useEffect, useState, useTransition } from "react";
import BookSuggestionsList from "./book-suggestions-list";
import { getBookSuggestionsAction } from "@/lib/actions";

import { BookResult } from "@/lib/zod-schemas";

export default function BookSuggestions({query}: {query: string}) {

    // Use server action to fetch book suggestions
    const [books, setBooks] = useState<BookResult[]>([]);

    // useTransition marks async update as non-blocking
    // This allows client component to remain responsive while fetching data
    // Which means async server action can be used in client component
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!query) {
            setBooks([]);
            return;
            }
        startTransition(() => {
            getBookSuggestionsAction(query).then((results) => {
                setBooks(results || []);
            });
        });
    }, [query]);
    

    // If the action is pending, show a loading state
    if (isPending) {
        return <div>Loading...</div>;
    }

    // If no books found, display a message
    if (!books || books.length === 0) {
        return; // Book Search Command component displays "No results found" when there are no valid command items
        // There will be no command items if no books are found
    }

    // If books are found, display them
    return <BookSuggestionsList books={books} />;
}