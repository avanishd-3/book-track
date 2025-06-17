"use server";

import { addBook } from "@/data-access/book-access";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserId() {
    const session = await auth.api.getSession({
        headers: await headers(),
      })
    
    const currentUserId = session?.user?.id;

    return currentUserId;
}

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