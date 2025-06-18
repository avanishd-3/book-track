import fs from 'fs'
import path from 'path'

import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'
]

export const dynamic = 'force-dynamic' // Disable static generation for this route

// Remove unsafe characters from filename and append timestamp
function sanitizeFilename(filename: string): string {
    const name = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const ext = path.extname(name);
    const base = path.basename(name, ext);
    return `${base}_${Date.now()}${ext}`;
}

export async function POST(req: Request) {

    const uploadDir = path.join(process.cwd(), 'public', 'uploads') // Ensure that /public/uploads exists

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Cannot use formidable b/c Next.js app router receives Web API requests
    // Probably need an adapter for formidable to work with Next.js app router

    // But this is easier
    const form = await req.formData();
    const file = form.get('image') as File;

    if (!file || !ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type or no file uploaded' }, { status: 400 });
    }

    // Convert File to Buffer so it can be saved to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename and save the file to the upload directory
    const sanitizedFilename = sanitizeFilename(file.name);
    const filePath = path.join(uploadDir, sanitizedFilename);
    fs.writeFileSync(filePath, buffer);

    // Return the file path or URL as needed
    return NextResponse.json({
        message: 'File uploaded successfully',
        filePath: `/uploads/${sanitizedFilename}`
    }, { status: 200 });
}