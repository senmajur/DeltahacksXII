"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Calendar, Activity, User, LogOut, Menu, X, MapPin, Users, Star, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import publicApi from '../../../../src/api/public'
import protectedApi from '../../../../src/api/protected'

interface Club {
  id: number
  name: string
  description: string
  category: string
  location: string
  email: string
  phone: string
  website: string
  founded_date: string
  member_count: number
  is_active: boolean
  average_rating: number
  review_count: number
  created_at: string
  updated_at: string
}

export default function BrowseClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [memberClubs, setMemberClubs] = useState<Set<number>>(new Set())
  const [joiningClub, setJoiningClub] = useState<number | null>(null)
  const [currentUser, setCurrentUser] = useState({
    name: "User",
    email: "user@example.com",
    initials: "U",
    id: 1
  })

  // Fetch clubs from API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true)
        const data = await publicApi.getClubs()
        setClubs(data as unknown as Club[])
        setFilteredClubs(data as unknown as Club[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load clubs")
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [])

  // Filter clubs based on search and category
  useEffect(() => {
    let filtered = clubs

    if (searchTerm) {
      filtered = filtered.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(club => club.category?.toLowerCase() === selectedCategory.toLowerCase())
    }

    setFilteredClubs(filtered)
  }, [searchTerm, selectedCategory, clubs])

  React.useEffect(() => {
    // Get user info from localStorage
    const storedName = localStorage.getItem("userName")
    const storedEmail = localStorage.getItem("userEmail")
    const storedId = localStorage.getItem("userId")
    
    if (storedName || storedEmail) {
      const name = storedName || "User"
      const email = storedEmail || "user@example.com"
      const id = storedId ? parseInt(storedId) : 1
      const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
      
      setCurrentUser({ name, email, initials, id })
      
      // Check which clubs the user is a member of
      checkUserMemberships(id)
    }
  }, [])

  const checkUserMemberships = async (userId: number) => {
    try {
      // Use Vite's `import.meta.env` in the browser; avoid referencing `process`.
      const base = (import.meta as any)?.env?.VITE_API_URL || '';
      const url = `${base.replace(/\/$/, '')}/users/${userId}/clubs`;
      const resp = await fetch(url, { credentials: 'include' });
      if (resp.ok) {
        const userClubs = await resp.json();
        const clubIds = new Set<number>(userClubs.map((club: Club) => club.id));
        setMemberClubs(clubIds);
        return;
      }
      // If the legacy endpoint isn't present, try to fetch via protected API patterns
      try {
        // No standard method exposed in src/api for listing user clubs; attempt common variants
        const resp2 = await fetch(`${base.replace(/\/$/, '')}/api/v1/users/${userId}/clubs`, { credentials: 'include' });
        if (resp2.ok) {
          const userClubs = await resp2.json();
          const clubIds = new Set<number>(userClubs.map((club: Club) => club.id));
          setMemberClubs(clubIds);
          return;
        }
      } catch (e) {
        // ignore
      }
    } catch (err) {
      console.error("Failed to fetch memberships:", err)
    }
  }

  const handleJoinClub = async (clubId: number) => {
    if (memberClubs.has(clubId)) {
      alert("You're already a member of this club!")
      return
    }

    setJoiningClub(clubId)
    try {
      await protectedApi.joinClub(currentUser.id, clubId)
      setMemberClubs(new Set([...memberClubs, clubId]))
      alert("Successfully joined the club!")
    } catch (err) {
      console.error("joinClub error:", err)
      alert("Error joining club: " + (err instanceof Error ? err.message : "Unknown error"))
    } finally {
      setJoiningClub(null)
    }
  }

  // Get unique categories
  const categories = ["all", ...new Set(clubs.map(club => club.category).filter(Boolean))]

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Sports: "bg-blue-100 text-blue-800",
      Hobby: "bg-purple-100 text-purple-800",
      Community: "bg-green-100 text-green-800",
      Education: "bg-yellow-100 text-yellow-800",
      Arts: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <UserDashboardLayout title="Browse Clubs" activePage="clubs">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Browse Clubs</h1>
          <p className="text-slate-500 mt-2">Discover and join clubs in your area</p>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-slate-900">Search Clubs</CardTitle>
            <CardDescription className="text-slate-500">Filter clubs by category and location</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search clubs by name or description..." 
                    className="pl-9 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-80 bg-slate-100 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600 font-medium">Error loading clubs: {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Clubs Grid */}
        {!loading && !error && (
          <>
            <div className="text-sm text-slate-500 font-medium">
              Found {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''}
            </div>
            
            {filteredClubs.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
                <p className="text-slate-500 font-medium">No clubs match your search</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <Card key={club.id} className="border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-slate-900 line-clamp-2">{club.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`${getCategoryColor(club.category)}`}>
                              {club.category}
                            </Badge>
                            {memberClubs.has(club.id) && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1 inline" />
                                Member
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      {/* Rating Display */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(club.average_rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">
                          {club.average_rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({club.review_count} reviews)
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-2">{club.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{club.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="h-4 w-4 text-slate-400" />
                          <span>{club.member_count} members</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2 text-xs">
                          {club.email && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded border border-blue-100">
                              {club.email}
                            </span>
                          )}
                          {club.phone && (
                            <span className="px-2 py-1 bg-green-50 text-green-600 rounded border border-green-100">
                              {club.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleJoinClub(club.id)}
                        disabled={joiningClub === club.id || memberClubs.has(club.id)}
                        className={`w-full mt-4 ${
                          memberClubs.has(club.id)
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        {joiningClub === club.id 
                          ? 'Joining...'
                          : memberClubs.has(club.id)
                          ? '✓ Member'
                          : 'Join Club'
                        }
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </UserDashboardLayout>
  )
}
