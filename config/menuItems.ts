import { LayoutDashboard, Home, Settings, Users, CreditCard } from "lucide-react"

export const menuItems = [
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
  {
    href: "/credit-allocation",
    label: "Credit Allocation",
    icon: CreditCard,
    subItems: [
      {
        href: "/credit-allocation/create",
        label: "Create Allocation",
        icon: "Plus",
      }
    ]
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
]

export const userManagementItem = {
  href: "/users",
  label: "User Management",
  icon: Users,
  subItems: [
    {
      href: "/users/internal",
      label: "Internal Users",
      icon: "UserCog",
    },
    {
      href: "/users/end-users",
      label: "End Users",
      icon: "Users",
    },
    {
      href: "/users/external/developers",
      label: "Developers",
      icon: "Code",
    },
    {
      href: "/users/external/operators",
      label: "Operators",
      icon: "Briefcase",
    },
    {
      href: "/users/external/corporates",
      label: "Corporates",
      icon: "Building",
    },
  ],
}

export const iconMap = {
  LayoutDashboard,
  Home,
  Settings,
  Users,
  CreditCard,
}

