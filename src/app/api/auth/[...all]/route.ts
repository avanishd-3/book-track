// For Better Auth Next.js integration
// Allows using middleware to protect routes

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
 
export const { GET, POST } = toNextJsHandler(auth.handler);