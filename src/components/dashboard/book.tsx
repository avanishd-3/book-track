"use client";

import { removeBookAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

import Image from "next/image";
import { Card,
         CardContent,
        } from "@/components/ui/card";


export default function Book({ book }: { book: 
    { id: string;
      title: string;
      author: string
      coverImage: string} }) {
    
    return (
    <Card
     key={book.id}
     className="group bg-white rounded-lg shadow transition-transform duration-200 hover:-translate-y-2 hover:scale-103 flex flex-col items-center p-2"
     style={{ width: 180, minHeight: 275 }}>
    <CardContent>
      {/* Book cover image */}
      <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
        <Image
            src={book.coverImage}
            alt={book.title}
            width={150}
            height={250}
            className="object-cover w-full h-full"
        />
      </div>

      {/* Book Title And Author */}
      <div className="w-full text-center flex-1 flex flex-col justify-end mt-1">
        {/* Do not truncate title or author, so text fits well */}
        <h3 className="text-base font-semibold text-black">{book.title}</h3>
        <p className="text-sm text-gray-600">by {book.author}</p>
      </div>

      {/* Remove book button */}
      {/* This is a trash icon that will remove the book when clicked */}
      <div className="w-full flex justify-center mt-2">
        <Trash2
        onClick={() => {removeBookAction(book.id)}}
        tabIndex={0} // Make icon focusable for accessibility
        onKeyDown={() => {removeBookAction(book.id)}} // Allow keyboard interaction for accessibility
        role="button" // So icon shows as being a button (for screen readers)
        aria-label="Remove Book"
        className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700 transition-colors"
        />
      </div>
    </CardContent>
    </Card>
  )
};