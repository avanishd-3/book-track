"use client"; // So can add book to library when selected

// Also client component because it is part of book search command, which is a client component

import { BookResult} from "@/lib/zod-schemas";
import { CommandItem } from "@/components/ui/command";

export default function BookSuggestionsList({ books }: { books: BookResult[] }) {
    // Display the first 3 book suggestions
    return (
        <>
        {books.map((book) => (
            <CommandItem
                key={book.isbn13}
                onSelect={() => {
                    // Handle book selection (e.g., add to library)
                    console.log('Selected book:', book);
                }}
            >
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-10 h-10 mr-2 rounded"
                />
                <span>{book.title}</span>
            </CommandItem>
        ))}
        </>
    )
}