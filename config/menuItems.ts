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
    label: "Credit allocation",
    icon: CreditCard,
    subItems: [
      {
        label: "Hour Allocation Management",
        subItems: [
          { href: "/credit-allocation/create", label: "Create Allocation" },
          { href: "/credit-allocation/internal-reservations", label: "Internal Reservations" },
        ],
      },
      {
        label: "Entity Management",
        subItems: [
          { href: "/credit-allocation/entity-directory", label: "Entity Directory" },
          { href: "/credit-allocation/my-recipients", label: "My Recipients" },
        ],
      },
      {
        label: "Reports & Analytics",
        subItems: [
          { href: "/credit-allocation/allocation-summary", label: "Allocation Summary" },
          { href: "/credit-allocation/usage-analytics", label: "Usage Analytics", hidden: true },
          { href: "/credit-allocation/distribution-reports", label: "Distribution Reports", hidden: true },
          { href: "/credit-allocation/forecasting", label: "Forecasting", hidden: true },
        ],
      },
      {
        label: "Audit & History",
        subItems: [
          { href: "/credit-allocation/allocation-timeline", label: "Allocation Timeline" },
          { href: "/credit-allocation/change-history", label: "Change History", hidden: true },
          { href: "/credit-allocation/export-reporting", label: "Export & Reporting", hidden: true },
        ],
      },
    ],
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

