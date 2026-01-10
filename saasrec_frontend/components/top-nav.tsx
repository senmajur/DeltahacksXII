"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopNavProps {
  role?: "admin" | "operation" | "accounting" | "user"
  clubName?: string
}

export function TopNav({ role, clubName }: TopNavProps) {
  const [pathname, setPathname] = useState("")
  
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const getNavItems = () => {
    if (!role) return []

    if (role === "admin") {
      return [
        { label: "Overview", href: "/clubs/dashboard/overview" },
        { label: "Membership", href: "/clubs/dashboard/membership" },
        { label: "Activities", href: "/clubs/dashboard/activities" },
        { label: "Reports", href: "/clubs/dashboard/reports" },
        { label: "Settings", href: "/clubs/dashboard/settings" },
      ]
    }

    if (role === "operation") {
      return [
        { label: "Membership", href: "/clubs/dashboard/membership" },
        { label: "Activities", href: "/clubs/dashboard/activities" },
      ]
    }

    if (role === "accounting") {
      return [{ label: "Reports", href: "/clubs/dashboard/reports" }]
    }

    if (role === "user") {
      return [
        { label: "Overview", href: "/users/dashboard/overview" },
        { label: "Clubs", href: "/users/dashboard/clubs" },
        { label: "Calendar", href: "/users/dashboard/calendar" },
        { label: "Reports", href: "/users/dashboard/reports" },
        { label: "Profile", href: "/users/dashboard/profile" },
      ]
    }

    return []
  }

  const navItems = getNavItems()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-semibold text-foreground">
              ClubConnect
            </a>
            {clubName && <span className="text-sm text-muted-foreground">{clubName}</span>}
          </div>

          {navItems.length > 0 && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn("text-sm", pathname === item.href && "font-semibold")}
                  >
                    {item.label}
                  </Button>
                </a>
              ))}
            </nav>
          )}

          <Button variant="ghost" size="sm" asChild>
            <a href="/">Sign Out</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
