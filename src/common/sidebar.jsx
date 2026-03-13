import {
  Box,
  Calendar,
  ChevronDown,
  ChevronRight,
  Home,
  Inbox,
  ListOrdered,
  MoreHorizontal,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./nav-bar/profile";

// Menu items.
const items = [
  //   {
  //     title: "Dashboard",
  //     url: "#",
  //     icon: Home,
  //     // submenu: [
  //     //   {
  //     //     title: "Dashboard",
  //     //     url: "#",
  //     //   },
  //     //   {
  //     //     title: "Analytics",
  //     //     url: "#",
  //     //   },
  //     // ],
  //   },
  {
    title: "Products",
    url: "/products",
    icon: Box,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ListOrdered,
  },
];

export function AppSidebar() {
  const { setOpen } = useSidebar();
  const pathname = useLocation().pathname;
  console.log("pathname", pathname);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1300) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div>
          <img src="/logo-srs.svg" className="w-20 mx-auto py-5" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible key={item.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={pathname === item.url}>
                        <Link to={item.url} className="flex items-center">
                          {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                          {item.title && (
                            <span className="text-md font-poppins ">
                              {item.title}
                            </span>
                          )}
                        </Link>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item?.submenu &&
                        item?.submenu?.map((subitem) => (
                          <SidebarMenuSub
                            key={subitem.title}
                            className="pl-4 font-poppins "
                          >
                            <SidebarMenuSubButton asChild>
                              <Link to={subitem.url}>
                                {subitem.title && (
                                  <span className="font-poppins">
                                    {subitem.title}
                                  </span>
                                )}
                              </Link>
                            </SidebarMenuSubButton>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <SidebarMenuAction>
                                  <MoreHorizontal />
                                </SidebarMenuAction>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" align="start">
                                <DropdownMenuItem>
                                  <span>Add</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>{" "}
                          </SidebarMenuSub>
                        ))}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarContent>
          <Profile />
        </SidebarContent> */}
      </SidebarFooter>
    </Sidebar>
  );
}
