"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/sign-out";
import Link from "next/link";

const SignOutButton = () => {
  return (
    // Make white like sign up button by not having it as outline variant
    <Button className="hidden sm:inline-flex" onClick={signOutAction} variant="default">
        {/* Trigger redirect to home page when signing out -> may change to some other page in the future */}
        <Link href={"/"}>Sign Out</Link>
    </Button>
  );
}

export default SignOutButton;