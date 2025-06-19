import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { BasicNavItems } from "./basic-nav-items";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogTitle } from "@radix-ui/react-dialog";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        {/* So screen readers can announce dialog purpose */}
        <VisuallyHidden>
          <DialogTitle>Navigation</DialogTitle>
        </VisuallyHidden>
        <Logo />
        <BasicNavItems orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};
