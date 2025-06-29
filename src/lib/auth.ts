import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/index"

import { user, session, account, verification } from "@/db/schema/auth-schema";

export const auth = betterAuth({
     database: drizzleAdapter(db, {
         provider: "pg",
         schema: {
            user,
            session,
            account,
            verification,
         },
     }),
    
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }

});