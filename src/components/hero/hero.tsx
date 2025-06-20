import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Manage Your Book Inventory with Ease
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
            Book Track is a powerful tool designed to help you keep track of your
            books, whether you&apos;re a casual reader or a serious collector. With
            features like inventory management, reading lists, and more, you&apos;ll
            never lose track of your books again.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
           size="lg"
           className="rounded-full text-base"
           asChild>

           <Link 
            href="/login">Get Started <ArrowUpRight className="!h-5 !w-5" />
           </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
