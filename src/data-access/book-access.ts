import "server-only"; // DB stuff should only run on the server

// CRUD operations for books
import { db } from "@/index";
import { book } from "@/db/schema/books";
import { eq } from "drizzle-orm";

export async function getBooksByUserId(userId: string) {
  return await db.select().from(book).where(eq(book.userId, userId));
}

export async function addBook(bookData: { id: string, title: string; author: string; userId: string }) {
  return await db.insert(book).values({
    ...bookData,
    createdAt: new Date(),
  });
}

export async function updateBook(bookId: string, bookData: { title?: string; author?: string }) {
  return await db.update(book).set(bookData).where(eq(book.id, bookId));
}

export async function deleteBook(bookId: string) {
  return await db.delete(book).where(eq(book.id, bookId));
}