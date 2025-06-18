import "server-only"; // DB stuff should only run on the server

// CRUD operations for books
import { db } from "@/index";
import { book } from "@/db/schema/books";
import { eq } from "drizzle-orm";

export async function getBooksByUserId(userId: string) {
  /* Fetches all books for a specific user by their user ID. */
  return await db.select().from(book).where(eq(book.userId, userId));
}

export async function getCoverImagebyBookId(bookId: string, userId: string) {
  /* Fetches a specific book cover image by its ID for a specific user. */
  return await db.select({coverImage: book.coverImage}).from(book).where(eq(book.id, bookId) && eq(book.userId, userId));
}

export async function addBook(bookData: { id: string, title: string; author: string; userId: string, coverImage: string }) {
  /* Add book for a specific user. */
  return await db.insert(book).values({
    ...bookData,
    createdAt: new Date(),
  });
}

export async function updateBook(bookId: string, bookData: { title?: string; author?: string }) {
  return await db.update(book).set(bookData).where(eq(book.id, bookId));
}

export async function deleteBook(userId: string, bookId: string) {
  /* Delete book for a specific user by book ID. */
  return await db.delete(book).where(eq(book.userId, userId) && eq(book.id, bookId));
}