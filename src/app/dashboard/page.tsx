import { getBooksByUserId } from "@/data-access/book-access";

import { AddBookDialog } from "@/components/dashboard/add-book-dialog";
import { getUserId } from "@/lib/actions";


export default async function DashboardPage() {
  // Get user ID to display their books
  const currentUserId = await getUserId();

  // Fetch books for the current user

  const books = currentUserId ? await getBooksByUserId(currentUserId) : [];


  return (
    <div className="min-h-screen bg-muted">
      <h1 className="text-3xl font-bold text-center mt-10">Dashboard</h1>

      {/* Display books in the user's library */}
      <div className="max-w-2xl mx-auto mt-8">
        {books.length > 0 ? (
          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-xl font-medium text-black">{book.title}</h3>
                <p className="text-gray-600">Author: {book.author}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no books in your library.</p>
        )}
      </div>

      {/* Button to add book */}
      <div className="max-w-2xl mx-auto mt-8">
        <AddBookDialog />
      </div>
    </div>
  );
}