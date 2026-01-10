"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Home } from "lucide-react"
// Navigation handled with window.location
import { Button } from "@/components/ui/button"
import { apiService, type Organization } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function ClubSignUpPage() {
  const [formData, setFormData] = useState({
    clubName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
    agreedToContract: false,
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdOrg, setCreatedOrg] = useState<Organization | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // Create organization using the API
      const response = await apiService.createOrganization({
        name: formData.clubName
      })
      
      if (response.error) {
        setError(`Failed to create organization: ${response.error}`)
        return
      }
      
      if (response.data) {
        setCreatedOrg(response.data)
        // Navigate to dashboard after successful creation
        setTimeout(() => {
          window.location.href = "/clubs/dashboard/overview"
        }, 2000)
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

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
            <CardTitle className="text-2xl font-bold text-primary">Club Registration</CardTitle>
            <CardDescription className="text-primary">Create an account to manage your club</CardDescription>
          </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}
            
            {/* Success Display */}
            {createdOrg && (
              <div className="bg-secondary/20 border border-green-300 text-primary p-3 rounded-lg text-sm font-medium">
                ✅ Organization "{createdOrg.name}" created successfully! (ID: {createdOrg.id})
                <br />Redirecting to dashboard...
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="clubName" className="text-primary font-medium">Club Name</Label>
              <Input
                id="clubName"
                type="text"
                placeholder="Enter club name"
                value={formData.clubName}
                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                required
                className="bg-white/50 border-primary/20 focus:border-primary/20 focus:ring-purple-400"
              />
            </div>
            
            {/* Single Admin Email Field - As per spec: only one admin email */}
            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-primary font-medium">
                Admin Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="admin@club.com"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                required
                className="bg-white/50 border-primary/20 focus:border-primary/20 focus:ring-purple-400"
              />
              <p className="text-xs text-primary">This email will have full admin rights</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-white/50 border-primary/20 focus:border-primary/20 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-white/50 border-primary/20 focus:border-primary/20 focus:ring-purple-400"
              />
            </div>
            
            {/* Contract Agreement - As per spec */}
            <div className="border border-primary/20 rounded-lg p-4 bg-accent/50 space-y-3">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="contract"
                  checked={formData.agreedToContract}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreedToContract: checked as boolean })}
                  required
                  className="border-primary/20 data-[state=checked]:bg-primary mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="contract" className="text-sm font-semibold cursor-pointer text-primary">
                    I agree to the Club Service Agreement <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-primary mt-1">
                    By checking this box, you agree to our service agreement and payment terms
                  </p>
                  <button 
                    type="button"
                    className="text-xs text-primary hover:text-primary underline mt-1"
                    onClick={() => window.open('/temp-contract.pdf', '_blank')}
                  >
                    View Contract (Temporary File)
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                required
                className="border-primary/20 data-[state=checked]:bg-primary"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer text-primary">
                I agree to the terms and conditions
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-11 shadow-lg" 
              disabled={isLoading || !!createdOrg || !formData.agreedToContract}
            >
              {isLoading ? "Creating Account..." : createdOrg ? "Account Created!" : "Create Account"}
            </Button>
            <div className="text-sm text-center text-primary">
              Already have an account?{" "}
              <a href="/clubs/signin" className="text-primary hover:underline font-semibold">
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
