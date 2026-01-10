"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { isValidPassword, passwordRequirements } from "@/lib/validators"

export default function UserSignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  })
  const [touched, setTouched] = useState({ password: false, confirmPassword: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // prevent submit if invalid password or mismatched
    if (!isValidPassword(formData.password)) return
    if (formData.password !== formData.confirmPassword) return

    // Save user data to localStorage
    localStorage.setItem("userFirstName", formData.firstName)
    localStorage.setItem("userLastName", formData.lastName)
    localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`.trim())
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userPhone", formData.phone)

    // persist chosen plan if present in query string
    try {
      const params = new URLSearchParams(window.location.search)
      const plan = params.get('plan') || 'free'
      localStorage.setItem('selectedPlan', plan)
    } catch (err) {
      // ignore
    }

    // After registration, go to members dashboard
    window.location.href = "/users/dashboard/clubs"
  }

  const pwReq = passwordRequirements(formData.password)

  const passwordValid = isValidPassword(formData.password)
  const passwordsMatch = formData.password === formData.confirmPassword

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_left,#e675b8_0%,#7a4dd1_50%,#0f0820_100%)] text-white">
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
            onClick={() => window.location.href = "/"}
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-purple-900">Member Registration</CardTitle>
            <CardDescription className="text-purple-600">Create a free account to join clubs and activities</CardDescription>
          </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-purple-900 font-medium">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="bg-white/50 border-purple-200 text-purple-900 placeholder:text-purple-500 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-purple-900 font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="bg-white/50 border-purple-200 text-purple-900 placeholder:text-purple-500 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-900 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white/50 border-purple-200 text-purple-900 placeholder:text-purple-500 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-purple-900 font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-white/50 border-purple-200 text-purple-900 placeholder:text-purple-500 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-900 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onBlur={() => setTouched({ ...touched, password: true })}
                required
                className="bg-white/50 border-purple-200 text-purple-900 placeholder:text-purple-500 focus:border-purple-400 focus:ring-purple-400"
              />
              {touched.password && !passwordValid && (
                <div className="text-sm text-red-600 mt-1">
                  <div>Password must meet the following:</div>
                  <ul className="list-disc ml-5">
                    <li className={pwReq.length ? 'text-green-700' : 'text-red-600'}>At least 8 characters</li>
                    <li className={pwReq.uppercase ? 'text-green-700' : 'text-red-600'}>One uppercase letter</li>
                    <li className={pwReq.lowercase ? 'text-green-700' : 'text-red-600'}>One lowercase letter</li>
                    <li className={pwReq.digit ? 'text-green-700' : 'text-red-600'}>One digit</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-purple-900 font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                required
                className="bg-white/50 border-purple-200 text-purple-900 placeholder:text-purple-500 focus:border-purple-400 focus:ring-purple-400"
              />
              {touched.confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                required
                className="border-purple-300 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer text-purple-800">
                I agree to the terms and conditions and privacy policy
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              disabled={!passwordValid || !passwordsMatch}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-11 shadow-lg disabled:opacity-50"
            >
              Create Account
            </Button>
            <div className="text-sm text-center text-purple-700">
              Already have an account?{" "}
              <a href="/users/signin" className="text-purple-900 hover:underline font-semibold">
                Sign In
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
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
