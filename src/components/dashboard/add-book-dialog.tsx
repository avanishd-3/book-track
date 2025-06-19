"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addBookAction } from "@/lib/actions"

import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

// TODO -> Use Zod for validation of form data (might not be necessary, since form will be replaced with
// search bar add that will have all the fields prefilled and will only require user to click on the book they want to add)
export function AddBookDialog() {
// I don't know why shadcn docs put the form component on top, but it doesn't work
// I also don't know why they don't use their own Form component or the Next.js Form component
// Shadcn and Next.js also have 2 different Form components, even though they are both made by Vercel
  

  const [coverImageUrl, setCoverImageUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    
    if (!file) {
      setCoverImageUrl(""); // Reset cover image URL if no file is selected
      return;
    }

    // Create a FormData object to send the file to the server
    const formData = new FormData();
    formData.append("image", file);

    // Send the file to the server using fetch
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Failed to upload image");
      toast.error("Failed to upload image");
      return;
    }

    if (!response.body) {
      console.error("No response body");
      toast.error("Unable to upload image");
      return;
    }

    const data = await response.json();

    if (data.filePath) {
      setCoverImageUrl(data.filePath);
    }
    else {
      console.error("Invalid response format");
      toast.error("Unable to upload image");
      setCoverImageUrl(""); // Reset cover image URL if the response is invalid
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const bookTitle = (formData.get("title") as string)?.trim();
    const author = (formData.get("author") as string)?.trim();

    if (!bookTitle) {
      toast.error("Please enter a book title.");
      return;
    }
    if (!author) {
      toast.error("Please enter an author name.");
      return;
    }

    // Check latest state of coverImageUrl
    if (!coverImageUrl) {
      toast.error("Please add a cover image.");
      return;
    }

    // Submit the form data to the server
    formData.set("coverImageUrl", coverImageUrl);

    // Server action to add book
    await addBookAction(formData);

    // Reset the form and cover image URL
    formRef.current?.reset();
    setCoverImageUrl("");

    // Do not close the dialog automatically, so the user can continue adding books
    
    // Show success message
    toast.success(`${bookTitle} added successfully!`);
  }

  return (
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Book</Button>
          </DialogTrigger>
          <DialogContent
           className="sm:max-w-[425px]"
           onClose={() => setCoverImageUrl("")} // Reset image URL when dialog is closed
           >
            <DialogHeader>
              <DialogTitle>New book</DialogTitle>
              <DialogDescription>
                Enter new book details here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {/* Form put here because of: https://medium.com/@enayetflweb/building-interactive-overlays-with-dialog-and-popover-in-shadcn-ui-98d188c9afa4 */}
            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Title</Label>
                    <Input id="title-1" name="title" defaultValue="Pride and Prejudice" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Author</Label>
                    <Input id="author-1" name="author" defaultValue="Jane Austen" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="image-1">Add Image</Label>
                    <Input id="image-1" name="image" type="file" onChange={handleImageChange}/>

                    {/* Hidden input to store uploaded image URL */}
                    <Input type="hidden" name="coverImageUrl" value={coverImageUrl}/>
                  </div>
              </div>
              <DialogFooter>
                  <DialogClose asChild>
                  {/* Reset image URL so it is actually blank when cancel is pressed */}
                  <Button variant="outline" onClick={() => setCoverImageUrl("")}>Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
            
          </DialogContent>
      </Dialog>
    )
}
