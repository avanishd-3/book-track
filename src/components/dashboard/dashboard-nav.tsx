// Home nav but use sign out instead of sign in and sign up

import { Button } from "@/components/ui/button";
import { Logo } from "../navbar/logo";
import { NavMenu } from "../navbar/nav-menu";
import { NavigationSheet } from "../navbar/navigation-sheet";
import { ModeToggle } from "../theme/mode-toggle";

import Link from "next/link";
import SignOutButton from "../sign-out-button";

const DashboardNav = () => {
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <SignOutButton /> {/* Sign Out Button */}
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

export default DashboardNav;
