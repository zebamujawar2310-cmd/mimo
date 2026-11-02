"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu";

export interface NavigationSection {
  title: string;
  href: string;
  isActive?: boolean;
}

interface HeaderProps {
  navigationData: NavigationSection[];
}

export default function Header({ navigationData }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Agency</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList className="hidden lg:flex gap-1">
              {navigationData.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger asChild>
                    <NavigationMenuLink className={item.isActive ? "bg-gray-100" : ""}>
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger asChild>
                  <NavigationMenuLink className="px-4 py-2">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuContent>
              <NavigationMenuIndicator />
              {navigationData.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink className={item.isActive ? "bg-gray-100" : ""}>
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4 py-2">Contact</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuContent>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900">
              Get started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
