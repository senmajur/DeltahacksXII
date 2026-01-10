"use client"

import React, { useState, useEffect, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Settings, Calendar, Users, FileText, Menu, X, Home, ShoppingBag, Megaphone, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ClubDashboardLayoutProps {
  children: ReactNode
}

export default function ClubDashboardLayout({ children }: ClubDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [clubName, setClubName] = useState("My Club")
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    // Get club name from localStorage
    const storedClubName = localStorage.getItem("clubName")
    if (storedClubName) {
      setClubName(storedClubName)
    }
  }, [])

  const navigation = [
    {
      name: "Overview",
      href: "/clubs/dashboard/overview",
      icon: Home,
    },
    {
      name: "Membership",
      href: "/clubs/dashboard/membership",
      icon: Users,
      subItems: [
        { name: "Members List", href: "/clubs/dashboard/membership" },
        { name: "Summary", href: "/clubs/dashboard/membership?tab=summary" },
        { name: "Import/Export", href: "/clubs/dashboard/membership?tab=import-export" },
        { name: "Configuration", href: "/clubs/dashboard/membership?tab=configuration" },
      ]
    },
    {
      name: "Activities",
      href: "/clubs/dashboard/activities",
      icon: Calendar,
      subItems: [
        { name: "Calendar", href: "/clubs/dashboard/activities" },
        { name: "Create Activity", href: "/clubs/dashboard/activities?tab=create" },
        { name: "Teams", href: "/clubs/dashboard/activities?tab=teams" },
        { name: "Announcements", href: "/clubs/dashboard/activities?tab=announcements" },
        { name: "Shop", href: "/clubs/dashboard/activities?tab=shop" },
      ]
    },
    {
      name: "Reports",
      href: "/clubs/dashboard/reports",
      icon: FileText,
      subItems: [
        { name: "Financials", href: "/clubs/dashboard/reports" },
        { name: "Assessments", href: "/clubs/dashboard/reports?tab=assessments" },
      ]
    },
    {
      name: "Settings",
      href: "/clubs/dashboard/settings",
      icon: Settings,
      subItems: [
        { name: "Club Profile", href: "/clubs/dashboard/settings" },
        { name: "Staff & Permissions", href: "/clubs/dashboard/settings?tab=staff" },
        { name: "Billing & Subscription", href: "/clubs/dashboard/settings?tab=billing" },
        { name: "Legal & Compliance", href: "/clubs/dashboard/settings?tab=legal" },
      ]
    },
  ]

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-xl">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Club Info Header */}
            <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
              <div>
                <h2 className="text-xl font-bold text-sidebar-foreground">{clubName}</h2>
                <p className="text-sm text-sidebar-accent-foreground/70">Club Dashboard</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        active && !item.subItems
                          ? "bg-primary text-white shadow-md"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                    {item.subItems && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                              location.search.includes(subItem.href.split('?')[1] || '') && subItem.href.includes('?')
                                ? "text-white font-medium bg-slate-800"
                                : isActive(subItem.href) && !subItem.href.includes('?') && !location.search
                                ? "text-white font-medium bg-slate-800"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Back to Home Button */}
            <div className="p-4 border-t border-slate-800">
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 w-64 bg-[var(--sidebar)] text-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-white">{clubName}</h2>
                    <p className="text-xs text-slate-400">Club Dashboard</p>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-800"
                  >
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <div key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => !item.subItems && setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            active && !item.subItems
                              ? "bg-primary text-white shadow-md"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                        {item.subItems && (
                          <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-4">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                                  location.search.includes(subItem.href.split('?')[1] || '') && subItem.href.includes('?')
                                    ? "text-white font-medium bg-slate-800"
                                    : isActive(subItem.href) && !subItem.href.includes('?') && !location.search
                                    ? "text-white font-medium bg-slate-800"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </nav>

                {/* Mobile Back to Home */}
                <div className="p-4 border-t border-slate-800">
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="w-full border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden bg-background">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu className="h-6 w-6 text-slate-700" />
            </button>
            <h1 className="text-lg font-bold text-slate-900">{clubName}</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
