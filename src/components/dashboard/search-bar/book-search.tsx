"use client";

import { useState, useRef} from "react";

import { Button } from "@/components/ui/button";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import BookSuggestions from "./book-suggestions";

export default function BookSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  function handleSearchChange(value: string) {
    if (debounceRef.current) {
        clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setQuery(value);
      }, 1000); // 1 second debounce because ISBNdb API has a rate limit of 1 request per second
    }


  return (
    <>
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setOpen((open) => !open)}
      >
        Add Book (in progress)
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
         placeholder="Search for book to add"
         onValueChange={handleSearchChange}/>
        <CommandList>
          {/* If search lead to no results */}
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Display top 3 suggestions for now -> may change later */}
          <CommandGroup>
            {/* Dynamically render suggestions */}
            <BookSuggestions query={query} />
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
