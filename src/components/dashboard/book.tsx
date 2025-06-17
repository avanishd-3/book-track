"use client";

import { removeBookAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export default function Book({ book }: { book: { id: string; title: string; author: string } }) {
    return (
        <li key={book.id} className="p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between mb-2">
                {/* Book title and author */}
                <div className="flex-1">
                    <h3 className="text-xl font-medium text-black">{book.title}</h3>
                    <p className="text-gray-600">Author: {book.author}</p>
                </div>

                {/* Remove book section */}
                <Trash2
                onClick={() => {removeBookAction(book.id)}}
                 className='w-6 h-6 text-red-500 cursor-pointer hover:text-red-700 transition-colors'
                 />
            
            </div>

        </li>
    )
};