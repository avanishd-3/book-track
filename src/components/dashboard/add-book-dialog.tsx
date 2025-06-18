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

import { useState } from "react";
import { set } from "zod";

// TODO -> Use Zod for validation of form data (might not be necessary, since form will be replaced with
// search bar add that will have all the fields prefilled and will only require user to click on the book they want to add)
export function AddBookDialog() {
// I don't know why shadcn docs put the form component on top, but it doesn't work
// I also don't know why they don't use their own Form component or the Next.js Form component
// Shadcn and Next.js also have 2 different Form components, even though they are both made by Vercel
  

  const [coverImageUrl, setCoverImageUrl] = useState("");

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    
    if (!file) {
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
      return;
    }

    if (!response.body) {
      console.error("No response body");
      return;
    }

    const data = await response.json();

    if (data.filePath) {
      setCoverImageUrl(data.filePath);
    }
  }

  return (
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Book</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New book</DialogTitle>
              <DialogDescription>
                Enter new book details here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {/* Form put here because of: https://medium.com/@enayetflweb/building-interactive-overlays-with-dialog-and-popover-in-shadcn-ui-98d188c9afa4 */}
            <form action={addBookAction} className="grid gap-4">
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
                  <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
            
          </DialogContent>
      </Dialog>
    )
}
