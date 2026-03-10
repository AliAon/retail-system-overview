import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import Profile from "./profile";
export default function Navbar() {
  return (
    <div className="h-17.5 md:h-18 relative shadow-md shadow-[#0000000D] flex items-center justify-between  py-8 px-4  ">
      {/* Left Side: Title */}
      <div className="flex items-center gap-4  ">
        {" "}
        <SidebarTrigger className={"absolute lg:top-0  lg:-left-3 z-50"} />
        {/* add left margin to avoid overlapping arrow */}
      </div>

      {/* Right Side: Language + Profile */}
      <Profile />
    </div>
  );
}
