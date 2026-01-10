"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CreditCard, Users, Award, Clock, MapPin, Mail, Phone } from "lucide-react"

// Mock data for user memberships
const mockMemberships = [
  {
    id: 1,
    clubName: "Soccer Stars FC",
    category: "Sports",
    status: "active",
    joinedDate: "Jan 15, 2025",
    expiryDate: "Jan 15, 2026",
    membershipType: "Annual",
    price: "$120/year",
    events: 8,
    nextEvent: "Soccer Practice - Nov 2, 2025",
    contactEmail: "info@soccerstars.com",
    contactPhone: "(555) 123-4567",
    location: "123 Sport Ave, Toronto, ON"
  },
  {
    id: 2,
    clubName: "Art & Design Collective",
    category: "Arts",
    status: "active",
    joinedDate: "Feb 20, 2025",
    expiryDate: "Feb 20, 2026",
    membershipType: "Annual",
    price: "$80/year",
    events: 12,
    nextEvent: "Painting Workshop - Oct 30, 2025",
    contactEmail: "hello@artcollective.com",
    contactPhone: "(555) 987-6543",
    location: "456 Creative Blvd, Toronto, ON"
  },
  {
    id: 3,
    clubName: "Swimming Academy",
    category: "Sports",
    status: "expiring",
    joinedDate: "Mar 10, 2024",
    expiryDate: "Nov 10, 2025",
    membershipType: "Annual",
    price: "$200/year",
    events: 24,
    nextEvent: "Advanced Swimming - Nov 1, 2025",
    contactEmail: "swim@academy.com",
    contactPhone: "(555) 456-7890",
    location: "789 Pool Lane, Toronto, ON"
  }
]

export default function UserMembershipPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentTab = searchParams.get("tab") || "all"

  const handleTabChange = (value: string) => {
    navigate(`?tab=${value}`)
  }

  const activeMemberships = mockMemberships.filter(m => m.status === "active")
  const expiringMemberships = mockMemberships.filter(m => m.status === "expiring")

  return (
    <UserDashboardLayout title="My Memberships" activePage="membership">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <p className="text-primary mt-1">Manage your club memberships and subscriptions</p>
        </div>

        {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary font-medium">Active Memberships</p>
                    <p className="text-3xl font-bold text-primary mt-2">{activeMemberships.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary font-medium">Upcoming Events</p>
                    <p className="text-3xl font-bold text-primary mt-2">
                      {mockMemberships.reduce((sum, m) => sum + m.events, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-lg bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary font-medium">Expiring Soon</p>
                    <p className="text-3xl font-bold text-primary mt-2">{expiringMemberships.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-white border border-primary/20 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                All Memberships ({mockMemberships.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                Active ({activeMemberships.length})
              </TabsTrigger>
              <TabsTrigger value="expiring" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                Expiring Soon ({expiringMemberships.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {mockMemberships.map((membership) => (
                <MembershipCard key={membership.id} membership={membership} />
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4 mt-6">
              {activeMemberships.map((membership) => (
                <MembershipCard key={membership.id} membership={membership} />
              ))}
            </TabsContent>

            <TabsContent value="expiring" className="space-y-4 mt-6">
              {expiringMemberships.map((membership) => (
                <MembershipCard key={membership.id} membership={membership} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </UserDashboardLayout>
    )
  }

function MembershipCard({ membership }: { membership: typeof mockMemberships[0] }) {
  return (
    <Card className="border-primary/20 shadow-lg bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-primary/20 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-primary">{membership.clubName}</h3>
              <Badge 
                variant={membership.status === "active" ? "default" : "destructive"}
                className={membership.status === "active" 
                  ? "bg-secondary/200 hover:bg-secondary" 
                  : "bg-orange-500 hover:bg-orange-600"
                }
              >
                {membership.status === "active" ? "Active" : "Expiring Soon"}
              </Badge>
              <Badge variant="outline" className="border-primary/20 text-primary">
                {membership.category}
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-primary">
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                {membership.membershipType}
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {membership.price}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {membership.joinedDate}
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/20 text-primary hover:bg-accent"
          >
            Manage
          </Button>
        </div>
      </div>

      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-primary mb-3">Membership Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary">Member Since:</span>
                  <span className="font-medium text-primary">{membership.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary">Expiry Date:</span>
                  <span className="font-medium text-primary">{membership.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary">Upcoming Events:</span>
                  <span className="font-medium text-primary">{membership.events} events</span>
                </div>
              </div>
            </div>

            <div className="bg-accent rounded-lg p-3 border border-primary/20">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-primary font-medium">Next Event</p>
                  <p className="text-sm text-primary font-semibold">{membership.nextEvent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-primary mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="h-4 w-4" />
                  <span>{membership.location}</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${membership.contactEmail}`} className="hover:underline">
                    {membership.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${membership.contactPhone}`} className="hover:underline">
                    {membership.contactPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              >
                View Details
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-primary/20 text-primary hover:bg-accent"
              >
                Renew
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
