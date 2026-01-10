"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileUpload from "@/components/ui/file_upload"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Users } from "lucide-react"
import ClubDashboardLayout from "@/components/club-dashboard-layout"

const CATEGORIES = [
  "Baseball",
  "Soccer",
  "Hockey",
  "Skates",
  "Swimming",
  "Basketball",
  "Ringuette",
  "Tennis",
  "Golf",
  "University",
  "College",
  "CASA",
  "Smodges",
]

export default function AdminSetupPage() {
  const [registrationEnabled, setRegistrationEnabled] = useState(true)
  const [companyProfile, setCompanyProfile] = useState({
    companyName: "",
    contactName: "",
    address: "",
    email: "",
    phone: "",
    category: "",
    logo: null as File | null,
  })

  const handleLogoChange = (file: File | null) => {
    setCompanyProfile({ ...companyProfile, logo: file })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission would happen here
  }

  return (
    <ClubDashboardLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Club Setup</h1>
            <p className="text-purple-600">Configure your club's profile and settings</p>
          </div>

          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              <p className="text-green-800 font-medium">Success! Your club is set up and ready to go.</p>
            </div>
          </div>

            {/* Company Profile Section */}
            <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-purple-900">Company Profile</CardTitle>
              <CardDescription className="text-purple-600">Set up your club's basic information</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-purple-900 font-medium">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter company name"
                    value={companyProfile.companyName}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, companyName: e.target.value })}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-purple-900 font-medium">
                    Main Contact Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    type="text"
                    placeholder="Enter contact name"
                    value={companyProfile.contactName}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, contactName: e.target.value })}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-purple-900 font-medium">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter club address"
                    value={companyProfile.address}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, address: e.target.value })}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-900 font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@club.com"
                      value={companyProfile.email}
                      onChange={(e) => setCompanyProfile({ ...companyProfile, email: e.target.value })}
                      required
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-purple-900 font-medium">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={companyProfile.phone}
                      onChange={(e) => setCompanyProfile({ ...companyProfile, phone: e.target.value })}
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-purple-900 font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={companyProfile.category}
                    onValueChange={(value) => setCompanyProfile({ ...companyProfile, category: value })}
                  >
                    <SelectTrigger id="category" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-purple-900 font-medium">Company Logo (Optional)</Label>
                  <FileUpload accept="image/*" maxSizeMB={2} onFileSelected={handleLogoChange} label="Upload Logo" />
                  {companyProfile.logo && (
                    <p className="text-sm text-purple-600">Selected: {companyProfile.logo.name}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
                >
                  Save Company Profile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* User Management Section */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-purple-900">Member Account Management</CardTitle>
              <CardDescription className="text-purple-600">Add members with specific roles and permissions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-purple-900">Add New Member</h3>
                <form className="space-y-4 p-4 border border-purple-200 rounded-lg bg-purple-50/30">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="userEmail" className="text-purple-900 font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="userEmail"
                        type="email"
                        placeholder="user@club.com"
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="userRole" className="text-purple-900 font-medium">
                        Role <span className="text-red-500">*</span>
                      </Label>
                      <Select required>
                        <SelectTrigger id="userRole" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400">
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operation">
                            <div className="flex flex-col">
                              <span className="font-medium">Operation</span>
                              <span className="text-xs text-purple-600">Access: Membership, Calendar, Events, FAQ</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="accounting">
                            <div className="flex flex-col">
                              <span className="font-medium">Accounting</span>
                              <span className="text-xs text-purple-600">Access: Reports only</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Add User
                  </Button>
                </form>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-purple-900">Current Members</h3>
                <div className="rounded-lg border-2 border-dashed border-purple-200 bg-purple-50/30 p-8 text-center">
                  <Users className="h-12 w-12 text-purple-300 mx-auto mb-3" />
                  <p className="text-purple-600">No additional users added yet</p>
                  <p className="text-xs text-purple-500 mt-2">Members you add will appear here with their assigned roles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Toggle */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-purple-900">Registration Settings</CardTitle>
              <CardDescription className="text-purple-600">Control whether new users can register for activities</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="registration-toggle" className="text-base font-medium text-purple-900">
                    User Registration
                  </Label>
                  <p className="text-sm text-purple-600">
                    {registrationEnabled ? "Registration is currently enabled" : "Registration is currently disabled"}
                  </p>
                </div>
                <Switch
                  id="registration-toggle"
                  checked={registrationEnabled}
                  onCheckedChange={setRegistrationEnabled}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClubDashboardLayout>
  )
}
