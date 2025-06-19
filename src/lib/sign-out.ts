import { authClient } from "./auth-client";

const signOutAction = async () => {
    // This doesn't do redirect because redirect requires router.push
    // router.push needs useRouter, which is only in client components
    // I don't know how to nicely (no useEffect) await signOut but also router.push as in Better Auth docs: 
    // https://www.better-auth.com/docs/basic-usage#signout

    // Client components cannot await, so useEffect would be needed

    // The current approach is using this function to sign out
    // and then redirecting to the home page in the sign out button, which calls this action

    // The sign out button is in a client component
    // so it can call this action directly


    // Auth Client is needed, so this cannot be done on the server

    // To check if this works, POST /api/auth/sign-out should return 200
    // and going to /dashboard from the home page should redirect to the login (middleware will do that if user is not signed in)

    await authClient.signOut();
}

export { signOutAction };