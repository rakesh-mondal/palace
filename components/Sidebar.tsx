"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Menu,
  Users,
  ChevronDown,
  Building2,
  Briefcase,
  HardHat,
  UserCog,
  LayoutDashboard,
  CreditCard,
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
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "usehooks-ts"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const SidebarIcon = ({ icon, label }: { icon: any; label: string }) => {
  return (
    <>
      {icon}
      <span className="sr-only">{label}</span>
    </>
  )
}

interface SidebarProps {
  className?: string
}

export function AppSidebar({ className }: SidebarProps) {
  const [isUsersOpen, setIsUsersOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Added state for mobile menu
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsUsersOpen(pathname.startsWith("/users"))
  }, [pathname])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const bottomNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Home, label: "Space", href: "/space" },
    { icon: CreditCard, label: "Credit", href: "/credit-allocation" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Menu, label: "More", onClick: () => setIsMobileMenuOpen(true) },
  ]

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
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            data-active={pathname === "/"}
            aria-current={pathname === "/" ? "page" : undefined}
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
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              {isCollapsed ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <SidebarIcon icon={<LayoutDashboard className="w-5 h-5 text-gray-400" />} label="Dashboard" />
                </div>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-xs sm:text-sm font-medium break-words">Dashboard</span>
                </>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            data-active={pathname === "/space"}
            aria-current={pathname === "/space" ? "page" : undefined}
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
            <Link
              href="/space"
              className="flex items-center gap-2 sm:gap-3"
              aria-current={pathname === "/space" ? "page" : undefined}
            >
              {isCollapsed ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <SidebarIcon icon={<Home className="w-5 h-5 text-gray-400" />} label="Space" />
                </div>
              ) : (
                <>
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-xs sm:text-sm font-medium break-words">Space</span>
                </>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            data-active={pathname.startsWith("/credit-allocation")}
            aria-current={pathname.startsWith("/credit-allocation") ? "page" : undefined}
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
            <Link
              href="/credit-allocation"
              className="flex items-center gap-2 sm:gap-3"
              aria-current={pathname.startsWith("/credit-allocation") ? "page" : undefined}
            >
              {isCollapsed ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <SidebarIcon icon={<CreditCard className="w-5 h-5 text-gray-400" />} label="Credit Allocation" />
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

        {/* Users Section */}
        <SidebarMenuItem className={cn("relative", isCollapsed ? "my-0.5" : "my-1")}>
          <Collapsible open={isUsersOpen} onOpenChange={setIsUsersOpen}>
            <CollapsibleTrigger
              className={cn(
                "flex items-center justify-between w-full cursor-pointer",
                isCollapsed
                  ? "p-0 h-10 justify-center data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white"
                  : "py-2 px-3 sm:px-4",
                "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                isUsersOpen && "bg-[#77866E]/50 text-white",
                "rounded-none",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              )}
              aria-expanded={isUsersOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setIsUsersOpen(!isUsersOpen)
                }
              }}
            >
              {isCollapsed ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <SidebarIcon icon={<Users className="w-5 h-5 text-gray-400" />} label="Users" />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-xs sm:text-sm font-medium break-words">Users</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform",
                      isUsersOpen && "rotate-180",
                    )}
                  />
                </>
              )}
            </CollapsibleTrigger>

            <CollapsibleContent>
              {/* Internal Users Section */}
              <div className={cn("py-1 sm:py-2", isCollapsed ? "pl-0" : "pl-2 sm:pl-4")}>
                <Link href="/users/internal" passHref legacyBehavior>
                  <SidebarMenuButton asChild>
                    <a
                      className={cn(
                        "flex items-center gap-2 sm:gap-3 py-1 sm:py-2 px-3 sm:px-4 w-full cursor-pointer",
                        "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                        "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
                        "rounded-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "whitespace-normal",
                      )}
                      data-active={pathname.startsWith("/users/internal")}
                      aria-current={pathname.startsWith("/users/internal") ? "page" : undefined}
                    >
                      {isCollapsed ? (
                        <SidebarIcon icon={<UserCog className="w-5 h-5 text-gray-400" />} label="Internal Users" />
                      ) : (
                        <>
                          <UserCog className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm font-medium break-words">Internal Users</span>
                        </>
                      )}
                    </a>
                  </SidebarMenuButton>
                </Link>

                {!isCollapsed && <Separator className="my-1 sm:my-2 mx-3 sm:mx-4 bg-gray-700" />}

                {/* External Users Section */}
                {!isCollapsed && (
                  <div className="py-1 sm:py-2 pl-2 sm:pl-4">
                    <div className="px-3 sm:px-4 py-1">
                      <span className="text-2xs sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
                        External
                      </span>
                    </div>
                  </div>
                )}
                <Link
                  href="/users/external/developers"
                  passHref
                  legacyBehavior
                  aria-current={pathname === "/users/external/developers" ? "page" : undefined}
                >
                  <SidebarMenuButton asChild>
                    <a
                      className={cn(
                        "flex items-center gap-2 sm:gap-3 py-1 sm:py-2 px-3 sm:px-4 w-full cursor-pointer",
                        "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                        "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
                        "rounded-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "whitespace-normal",
                      )}
                      data-active={pathname === "/users/external/developers"}
                      aria-current={pathname === "/users/external/developers" ? "page" : undefined}
                    >
                      {isCollapsed ? (
                        <SidebarIcon icon={<Building2 className="w-5 h-5 text-gray-400" />} label="Developers" />
                      ) : (
                        <>
                          <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm break-words">Developers</span>
                        </>
                      )}
                    </a>
                  </SidebarMenuButton>
                </Link>
                <Link
                  href="/users/external/operators"
                  passHref
                  legacyBehavior
                  aria-current={pathname === "/users/external/operators" ? "page" : undefined}
                >
                  <SidebarMenuButton asChild>
                    <a
                      className={cn(
                        "flex items-center gap-2 sm:gap-3 py-1 sm:py-2 px-3 sm:px-4 w-full cursor-pointer",
                        "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                        "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
                        "rounded-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "whitespace-normal",
                      )}
                      data-active={pathname === "/users/external/operators"}
                      aria-current={pathname === "/users/external/operators" ? "page" : undefined}
                    >
                      {isCollapsed ? (
                        <SidebarIcon icon={<HardHat className="w-5 h-5 text-gray-400" />} label="Operators" />
                      ) : (
                        <>
                          <HardHat className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm break-words">Operators</span>
                        </>
                      )}
                    </a>
                  </SidebarMenuButton>
                </Link>
                <Link
                  href="/users/external/corporates"
                  passHref
                  legacyBehavior
                  aria-current={pathname === "/users/external/corporates" ? "page" : undefined}
                >
                  <SidebarMenuButton asChild>
                    <a
                      className={cn(
                        "flex items-center gap-2 sm:gap-3 py-1 sm:py-2 px-3 sm:px-4 w-full cursor-pointer",
                        "hover:bg-[#77866E]/50 hover:text-white transition-colors",
                        "data-[active=true]:bg-[#77866E]/50 data-[active=true]:text-white",
                        "rounded-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "whitespace-normal",
                      )}
                      data-active={pathname === "/users/external/corporates"}
                      aria-current={pathname === "/users/external/corporates" ? "page" : undefined}
                    >
                      {isCollapsed ? (
                        <SidebarIcon icon={<Briefcase className="w-5 h-5 text-gray-400" />} label="Corporates" />
                      ) : (
                        <>
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm break-words">Corporates</span>
                        </>
                      )}
                    </a>
                  </SidebarMenuButton>
                </Link>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  )

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
            {" "}
            {/* Added min-w-16 */}
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
      collapsed={isCollapsed ? "true" : undefined}
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
          onClick={toggleCollapse}
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

