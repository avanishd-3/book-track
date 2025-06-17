import { Button } from "@/components/ui/button";
import { Logo } from "../navbar/logo";
import { DashboardNavMenu } from "./dashboard-nav-menu"
import { NavigationSheet } from "../navbar/navigation-sheet";
import { ModeToggle } from "../theme/mode-toggle";

// TODO -> Add user profile circle that allows users to access their profile settings, logout, etc.
// TODO -> Add a search bar for quick access to books, authors, etc.
const DashboardNav = () => {
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          {/* Desktop Menu */}
          <DashboardNavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
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
