"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Calendar, Activity, User, LogOut, Menu, X, FileText, Search, CreditCard } from "lucide-react"

interface UserDashboardLayoutProps {
  children: ReactNode
  title: string
  activePage: string
  userName?: string
  userEmail?: string
}

export function UserDashboardLayout({ children, title, activePage, userName, userEmail }: UserDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: userName || "Member",
    email: userEmail || "member@example.com",
    initials: "M"
  })
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    // Get user info from localStorage or props
    const storedName = localStorage.getItem("userName")
    const storedEmail = localStorage.getItem("userEmail")
    
    if (storedName || storedEmail || userName || userEmail) {
      const name = userName || storedName || "User"
      const email = userEmail || storedEmail || "user@example.com"
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      
      setCurrentUser({ name, email, initials })
    }
  }, [userName, userEmail])

  const menuItems = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: Home, 
      path: "/users/dashboard/overview" 
    },
    { 
      id: "profile", 
      label: "Profile", 
      icon: User, 
      path: "/users/dashboard/profile",
      subItems: [
          { label: "My Profile", path: "/users/dashboard/profile" },
          { label: "Family", path: "/users/dashboard/profile?tab=family" }
      ]
    },
    { 
      id: "clubs", 
      label: "Clubs", 
      icon: Search, 
      path: "/users/dashboard/clubs",
      subItems: [
          { label: "Browse Clubs", path: "/users/dashboard/clubs" },
          { label: "My Memberships", path: "/users/dashboard/clubs?tab=my-memberships" }
      ]
    },
    { 
      id: "calendar", 
      label: "Calendar", 
      icon: Calendar, 
      path: "/users/dashboard/calendar",
      subItems: [
          { label: "My Schedule", path: "/users/dashboard/calendar" }
      ]
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: FileText, 
      path: "/users/dashboard/reports",
      subItems: [
          { label: "Progress", path: "/users/dashboard/reports" },
          { label: "Receipts", path: "/users/dashboard/reports?tab=receipts" }
      ]
    },
    { 
      id: "subscription", 
      label: "Subscription", 
      icon: CreditCard, 
      path: "/users/dashboard/subscription",
      subItems: [
          { label: "My Plan", path: "/users/dashboard/subscription" }
      ]
    },
  ]

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--sidebar)] text-white transition-transform duration-300 ease-in-out shadow-2xl border-r border-slate-800`}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold text-white">CLUB CONNECT</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* User Info Section */}
          <div className="p-6 border-b border-slate-800">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Welcome back</p>
              <h2 className="text-lg font-semibold text-white">{currentUser.name}</h2>
              <p className="text-xs text-slate-500 mt-1 truncate">{currentUser.email}</p>
            </div>
          </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-250px)]">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path) || (item.subItems && item.subItems.some(sub => isActive(sub.path)))
            return (
              <div key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => !item.subItems && setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active && !item.subItems
                      ? "bg-primary text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
                {item.subItems && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                          location.search.includes(subItem.path.split('?')[1] || '') && subItem.path.includes('?')
                            ? "text-white font-medium bg-slate-800"
                            : isActive(subItem.path) && !subItem.path.includes('?') && !location.search
                            ? "text-white font-medium bg-slate-800"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-[var(--sidebar)]">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="h-6 w-6 text-slate-700" />
            </button>
            
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold shadow-md shadow-blue-600/20">
                  {currentUser.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">Free Plan</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
