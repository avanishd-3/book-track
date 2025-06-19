"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/sign-out";

const SignOutButton = () => {

  const handleSignOut = async () => {
    await signOutAction();

    // Redirect to home page after sign out

    // Full reload that busts cache
    // Becaude navbar is async server component that still thinks user is signed in
    // and doesn't update until the page is reloaded
    window.location.href = "/"; // Full reload that busts the cache
  }


  return (
    // Make white like sign up button by not having it as outline variant
    <Button className="sm:inline-flex" onClick={handleSignOut} variant="default">
        Sign Out
    </Button>
  );
}

export default SignOutButton;