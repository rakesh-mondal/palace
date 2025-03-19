"use client"

import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Home,
  Settings,
  Users,
  ChevronDown,
  Menu,
  UserCog,
  Building2,
  Briefcase,
  HardHat,
  Dumbbell,
  CreditCard,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "usehooks-ts"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { isHiddenMenuItem } from "../config/hiddenMenuItems"

interface SidebarProps {
  className?: string
}

const AppSidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUsersOpen, setIsUsersOpen] = useState(false)
  const [isCreditOpen, setIsCreditOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    console.log("AppSidebar rendered")
    setIsUsersOpen(pathname.startsWith("/users"))
    setIsCreditOpen(pathname.startsWith("/credit-allocation"))
  }, [pathname])

  // Define menu items directly in the component
  const mainMenuItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/space",
      label: "Space Management",
      icon: Home,
    },
  ]

  const renderMainMenuItem = (item: { href: string; label: string; icon: any }) => {
    console.log(`Rendering menu item: ${item.label}`)
    if (isHiddenMenuItem(item.href)) return null
    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          asChild
          data-active={pathname === item.href}
          className={cn(
            "flex items-center w-full cursor-pointer",
            isCollapsed
              ? "p-0 h-10 justify-center data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white"
              : "h-10 px-4",
            "hover:bg-[#77866E]/50 hover:text-white transition-colors",
            "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
            "rounded-none",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "whitespace-normal",
          )}
        >
          <Link href={item.href} className="flex items-center gap-3 w-full">
            {isCollapsed ? (
              <div className="flex items-center justify-center w-10 h-10">
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="sr-only">{item.label}</span>
              </div>
            ) : (
              <>
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-xs sm:text-sm font-medium break-words">{item.label}</span>
              </>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  const sidebarContent = (
    <SidebarContent className="flex flex-col flex-grow p-0 space-y-2 overflow-x-hidden">
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        {isCollapsed ? (
          <div className="flex items-center justify-center w-full h-full py-5 px-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Symbol-bhzrCcP7QlhqNAYVnLpR7UGQypucCv.png"
              alt="Palace Studios Logo Symbol"
              width={32}
              height={32}
              className="w-auto h-auto"
              priority
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full px-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-light-AyVQzBroTgzyzEPxkAY9bOzAyMaz6E.png"
              alt="Palace Studios Logo"
              width={160}
              height={32}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <SidebarMenu>
        {console.log("Rendering main menu items")}
        {/* Render main menu items */}
        {mainMenuItems.map(renderMainMenuItem)}

        {/* Credit Allocation Menu */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            data-active={pathname.startsWith("/credit-allocation")}
            className={cn(
              "flex items-center w-full cursor-pointer",
              isCollapsed
                ? "p-0 h-10 justify-center data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white"
                : "h-10 px-4",
              "hover:bg-[#77866E]/50 hover:text-white transition-colors",
              "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
              "rounded-none",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "whitespace-normal",
            )}
          >
            <Link href="/credit-allocation" className="flex items-center gap-3 w-full">
              {isCollapsed ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="sr-only">Credit Allocation</span>
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-xs sm:text-sm font-medium break-words">Credit Allocation</span>
                </>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Users Menu */}
        <SidebarMenuItem>
          <Collapsible open={isUsersOpen} onOpenChange={setIsUsersOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "flex items-center w-full cursor-pointer",
                  isCollapsed
                    ? "p-0 h-10 justify-center data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white"
                    : "py-2 px-3 sm:px-4",
                  "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                  "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
                  "rounded-none",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  "whitespace-normal",
                )}
              >
                {isCollapsed ? (
                  <div className="flex items-center justify-center w-10 h-10">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="sr-only">User Management</span>
                  </div>
                ) : (
                  <>
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-xs sm:text-sm font-medium break-words flex-grow text-left">
                      User Management
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isUsersOpen ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </>
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {!isCollapsed && (
                <>
                  {/* Internal Users Section */}
                  <div className="py-2">
                    <div className="px-4 py-1.5">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Internal</span>
                    </div>
                    <div className="space-y-1">
                      {/* Internal Users Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/internal")) return null
                        return (
                          <Link
                            href="/users/internal"
                            className={cn(
                              "flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname.startsWith("/users/internal") && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <UserCog className="w-4 h-4 mr-2" />
                            Internal Users
                          </Link>
                        )
                      })()}

                      {/* Trainers Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/trainers")) return null
                        return (
                          <Link
                            href="/users/trainers"
                            className={cn(
                              "flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname.startsWith("/users/trainers") && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <Dumbbell className="w-4 h-4 mr-2" />
                            Trainers
                          </Link>
                        )
                      })()}
                    </div>
                  </div>

                  {/* End Users Section */}
                  <div className="py-2 mt-2 border-t border-gray-700">
                    <div className="px-4 py-1.5">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">End Users</span>
                    </div>
                    <div className="space-y-1">
                      {/* End Users Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/end-users")) return null
                        return (
                          <Link
                            href="/users/end-users"
                            className={cn(
                              "flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname === "/users/end-users" && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            End Users
                          </Link>
                        )
                      })()}

                      {/* Corporate Employees Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/end-users/corporate")) return null
                        return (
                          <Link
                            href="/users/end-users/corporate"
                            className={cn(
                              "flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname === "/users/end-users/corporate" && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <Building2 className="w-4 h-4 mr-2" />
                            Corporate Employees
                          </Link>
                        )
                      })()}
                    </div>
                  </div>

                  {/* External Users Section */}
                  <div className="py-2 mt-2 border-t border-gray-700">
                    <div className="px-4 py-1.5">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">External</span>
                    </div>
                    <div className="space-y-1">
                      {/* Developers Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/external/developers")) return null
                        return (
                          <Link
                            href="/users/external/developers"
                            className={cn(
                              "group flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname.startsWith("/users/external/developers") && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <Building2 className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white" />
                            Developers
                          </Link>
                        )
                      })()}

                      {/* Operators Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/external/operators")) return null
                        return (
                          <Link
                            href="/users/external/operators"
                            className={cn(
                              "group flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname.startsWith("/users/external/operators") && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <HardHat className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white" />
                            Operators
                          </Link>
                        )
                      })()}

                      {/* Corporates Link */}
                      {(() => {
                        if (isHiddenMenuItem("/users/external/corporates")) return null
                        return (
                          <Link
                            href="/users/external/corporates"
                            className={cn(
                              "group flex items-center py-2 px-8 text-sm hover:bg-[#77866E]/50 hover:text-white transition-colors",
                              pathname.startsWith("/users/external/corporates") && "bg-[#77866E]/50 text-white",
                            )}
                          >
                            <Briefcase className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white" />
                            Corporates
                          </Link>
                        )
                      })()}
                    </div>
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      </SidebarMenu>
      <div className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              data-active={pathname === "/settings"}
              className={cn(
                "flex items-center w-full cursor-pointer",
                isCollapsed
                  ? "p-0 h-10 justify-center data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white"
                  : "py-2 px-3 sm:px-4",
                "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
                "rounded-none",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "whitespace-normal",
              )}
            >
              <Link href="/settings" className="flex items-center gap-2 sm:gap-3 w-full">
                {isCollapsed ? (
                  <div className="flex items-center justify-center w-10 h-10">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="sr-only">Settings</span>
                  </div>
                ) : (
                  <>
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-xs sm:text-sm font-medium break-words">Settings</span>
                  </>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </SidebarContent>
  )

  // Mobile navigation items
  const bottomNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Home, label: "Space", href: "/space" },
    { icon: CreditCard, label: "Credit", href: "/credit-allocation" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Menu, label: "More", onClick: () => setIsMobileMenuOpen(true) },
  ]

  const mobileBottomNav = (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex justify-around items-center h-16">
        {bottomNavItems.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <Link
                href={item.href}
                className="flex flex-col items-center p-2"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <item.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                className="flex flex-col items-center p-2"
                aria-label={`Open ${item.label} menu`}
              >
                <item.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )

  if (isMobile) {
    return (
      <>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 bg-[#242A34] text-white w-64 min-w-16">
            {sidebarContent}
          </SheetContent>
        </Sheet>
        {mobileBottomNav}
      </>
    )
  }

  return (
    <Sidebar
      aria-label="Main navigation"
      collapsible="icon"
      className={cn(
        "border-r bg-[#242A34] flex-shrink-0 text-white hidden md:flex overflow-x-hidden",
        isCollapsed ? "w-16 min-w-16" : "w-64",
        "transition-all duration-300 ease-in-out",
        className,
      )}
    >
      {sidebarContent}
      <SidebarFooter className="h-12 sm:h-16 flex items-center justify-center border-t border-t-white/20">
        <SidebarTrigger
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
        </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

