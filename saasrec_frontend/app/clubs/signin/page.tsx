"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ClubSignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - redirect to dashboard
    navigate("/clubs/dashboard/overview")
  }

  return (
    <div className="min-h-screen flex flex-col text-white" style={{ background: 'radial-gradient(ellipse at top left, #e675b8 0%, #7a4dd1 50%, #0f0820 100%)' }}>
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ClubConnect</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg p-8">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-purple-900">Club Sign In</h1>
            <p className="text-purple-600">Enter your credentials to access your club dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-purple-900 font-medium text-sm">Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@club.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/50 border border-purple-200 rounded-lg text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-purple-900 font-medium text-sm">Password</label>
                <a 
                  href="#" 
                  className="text-sm text-purple-600 hover:text-purple-800 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/50 border border-purple-200 rounded-lg text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-11 shadow-lg"
            >
              Sign In
            </Button>
            <div className="text-sm text-center text-purple-700">
              Don't have an account?{" "}
              <a href="/clubs/signup" className="text-purple-900 hover:underline font-semibold">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-white/70">
          <p>&copy; 2025 ClubConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}