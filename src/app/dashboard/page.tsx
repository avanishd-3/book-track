import { getBooksByUserId } from "@/data-access/book-access";

import { AddBookDialog } from "@/components/dashboard/add-book-dialog";
import { getUserId } from "@/lib/actions";
import Book from "@/components/dashboard/book";
import { Toaster } from "sonner";

export default async function DashboardPage() {
  // Get user ID to display their books
  const currentUserId = await getUserId();

  // Fetch books for the current user

  const books = currentUserId ? await getBooksByUserId(currentUserId) : [];


  return (
    <>
      {/* Display books in the user's library */}
      <div className="max-w-2xl mx-auto mt-8">
        {/* Display books in the user's library */}
        {books.length > 0 ? (
            <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
                {books.map((book) => (
                    <Book key={book.id} book={book} />
                ))}
            </div>
        ) : (
        <p className="text-gray-500">You have no books in your library.</p>
        )}
      </div>

      {/* Button to add book */}
      <div className="max-w-2xl mx-auto mt-8"> 
        <AddBookDialog />
      </div>

      {/* Toaster to indicate when books have been added and removed from library */}
      <Toaster position="bottom-right" richColors/>
    </>
  );
}