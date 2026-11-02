"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: { label: string; href?: string }[];
}

export function DashboardLayout({ children, breadcrumbItems }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={cn("flex-1 flex flex-col relative overflow-hidden", mobileSidebar ? "blur-md" : "")}>
        <div className="fixed inset-0 z-49 bg-black/40 hidden md:hidden" onClick={() => setMobileSidebar(false)} />
        <TopNav toggleSidebar={() => setMobileSidebar((p) => !p)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {breadcrumbItems && (
            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
