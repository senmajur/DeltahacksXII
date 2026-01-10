"use client"

import React, { useState, useEffect } from "react"
import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Plus, Users } from "lucide-react"
import { apiService, Child, validateChildAge } from "@/lib/api"
import { ChildCard } from "@/components/child-card"

export default function UserProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  // Child Management State
  const [children, setChildren] = useState<Child[]>([])
  const [isChildrenExpanded, setIsChildrenExpanded] = useState(false)
  const [isAddingChild, setIsAddingChild] = useState(false)
  const [loadingChildren, setLoadingChildren] = useState(false)
  const [userId, setUserId] = useState<string>("")

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedFirstName = localStorage.getItem("userFirstName") || ""
    const storedLastName = localStorage.getItem("userLastName") || ""
    const storedEmail = localStorage.getItem("userEmail") || ""
    const storedPhone = localStorage.getItem("userPhone") || ""
    const storedUserId = localStorage.getItem("userId") || ""

    setProfile({
      firstName: storedFirstName,
      lastName: storedLastName,
      email: storedEmail,
      phone: storedPhone,
    })

    setUserId(storedUserId)

    if (!storedUserId) {
      console.warn("No user ID found. Child management features may not work.")
    }
  }, [])

  // Fetch children when userId is available
  useEffect(() => {
    if (userId) {
      fetchChildren()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const fetchChildren = async () => {
    if (!userId) {
      console.warn("Cannot fetch children without user ID")
      return
    }

    setLoadingChildren(true)
    try {
      const response = await apiService.getChildren(userId)
      if (response.data) {
        setChildren(response.data)
      } else if (response.error) {
        console.error("Failed to fetch children:", response.error)
      }
    } catch (error) {
      console.error("Failed to fetch children", error)
    } finally {
      setLoadingChildren(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to localStorage
    localStorage.setItem("userFirstName", profile.firstName)
    localStorage.setItem("userLastName", profile.lastName)
    localStorage.setItem("userName", `${profile.firstName} ${profile.lastName}`.trim())
    localStorage.setItem("userEmail", profile.email)
    localStorage.setItem("userPhone", profile.phone)

    // Show success message (you could use a toast notification)
    alert("Profile updated successfully!")

    // Reload to update sidebar
    window.location.reload()
  }

  const handleAddChild = async (data: any) => {
    if (!userId) {
      alert("User ID not found. Please log in again.")
      return
    }

    try {
      // Validate age before sending to API
      const ageValidation = validateChildAge(data.birthdate)
      if (!ageValidation.valid) {
        alert(ageValidation.message)
        return
      }

      // Prepare data for API
      const childData = {
        first_name: data.first_name,
        last_name: data.last_name,
        birthdate: data.birthdate,
        gender: data.gender,
        notes: data.notes,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_email: data.emergency_contact_email,
        emergency_contact_phone: data.emergency_contact_phone,
        is_participant: data.is_participant,
      }

      const response = await apiService.createChild(userId, childData)
      if (response.data) {
        setChildren([...children, response.data])
        setIsAddingChild(false)
      } else if (response.error) {
        alert(`Failed to add child: ${response.error}`)
      }
    } catch (error) {
      console.error("Error adding child:", error)
      alert("Failed to add child. Please try again.")
    }
  }

  const handleUpdateChild = async (id: number, data: any) => {
    try {
      // Validate age before sending to API
      const ageValidation = validateChildAge(data.birthdate)
      if (!ageValidation.valid) {
        alert(ageValidation.message)
        return
      }

      // Prepare data for API
      const childData = {
        first_name: data.first_name,
        last_name: data.last_name,
        birthdate: data.birthdate,
        gender: data.gender,
        notes: data.notes,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_email: data.emergency_contact_email,
        emergency_contact_phone: data.emergency_contact_phone,
        is_participant: data.is_participant,
      }

      const response = await apiService.updateChild(id, childData)
      if (response.data) {
        setChildren(children.map(c => c.id === id ? response.data! : c))
      } else if (response.error) {
        alert(`Failed to update child: ${response.error}`)
      }
    } catch (error) {
      console.error("Error updating child:", error)
      alert("Failed to update child.")
    }
  }

  const handleDeleteChild = async (id: number) => {
    try {
      const response = await apiService.deleteChild(id)
      if (response.data || !response.error) {
        setChildren(children.filter(c => c.id !== id))
      } else if (response.error) {
        alert(`Failed to delete child: ${response.error}`)
      }
    } catch (error) {
      console.error("Error deleting child:", error)
      alert("Failed to delete child. Please try again.")
    }
  }

  return (
    <UserDashboardLayout title="Profile" activePage="profile">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <p className="text-purple-600 mt-2">Manage your account information</p>
        </div>

        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-purple-900">Account Information</CardTitle>
                <CardDescription className="text-purple-600">Update your personal details</CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Free Plan</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-purple-900">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-purple-900">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-900">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-purple-900">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        {/* Children Section */}
        <Collapsible
          open={isChildrenExpanded}
          onOpenChange={setIsChildrenExpanded}
          className="border border-purple-200 rounded-lg shadow-lg bg-white"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900">Children</h3>
                <p className="text-sm text-purple-600">
                  {children.length} {children.length === 1 ? "child" : "children"} added
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsChildrenExpanded(true)
                  setIsAddingChild(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  {isChildrenExpanded ? (
                    <ChevronUp className="h-4 w-4 text-purple-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-purple-500" />
                  )}
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="p-6 space-y-4">
            {children.length === 0 && !isAddingChild && (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <p>No children added yet.</p>
                <Button
                  variant="link"
                  className="text-purple-600"
                  onClick={() => setIsAddingChild(true)}
                >
                  Add your first child
                </Button>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {children.map((child) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  onSave={(data) => handleUpdateChild(child.id, data)}
                  onDelete={() => handleDeleteChild(child.id)}
                />
              ))}
            </div>

            {isAddingChild && (
              <div className="mt-4">
                <ChildCard
                  isNew
                  onSave={handleAddChild}
                  onCancel={() => setIsAddingChild(false)}
                />
              </div>
            )}

            {children.length > 0 && !isAddingChild && (
              <Button
                variant="outline"
                className="w-full border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 mt-4"
                onClick={() => setIsAddingChild(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Child
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <CardTitle className="text-purple-900">Premium Features</CardTitle>
            <CardDescription className="text-purple-600">Upgrade to unlock additional features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-purple-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                Email reminders for activities
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                Report cards for completed activities
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                Priority registration for events
              </li>
            </ul>
            <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </UserDashboardLayout>
  )
}
