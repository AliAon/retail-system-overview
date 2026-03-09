import Navbar from "@/common/nav-bar";
import { AppSidebar } from "@/common/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
