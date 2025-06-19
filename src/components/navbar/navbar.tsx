import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { BasicNavItems } from "./basic-nav-items";
import { NavigationSheet } from "./navigation-sheet";
import { ModeToggle } from "../theme/mode-toggle";

import Link from "next/link";
import { getUserId } from "@/lib/actions";
import SignOutButton from "../sign-out-button";

const NavBar = async () => {
  const userId = await getUserId();
  
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          {/* Desktop Menu */}
          <BasicNavItems className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {/* userId will be undefined if user is not logged in */}

          {userId !== undefined ? (
            // If user is signed in, show sign out button

            <SignOutButton /> // Sign Out Button 
          ) : (
            // If user is signed out, show sign in and sign up buttons
            <>
              {/* If user is signed out, show sign in and sign up buttons */}
              <Button variant="outline" className="sm:inline-flex" asChild>
                <Link href="/login">Sign In</Link>
              </Button><Button asChild>
                <Link href="/login">Sign Up</Link>
              </Button>
            </>
          )}
          
          <ModeToggle /> {/* Theme Toggle Button */}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
