import { authClient } from "@/lib/auth-client";

export async function signIn() {

//    alert("Redirecting to Google sign-in...");

    // Use the authClient to initiate a social sign-in with Google
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
    })
    .catch((error) => {
        console.error("Sign-in error:", error);
        throw new Error("Failed to sign in");
    });
}