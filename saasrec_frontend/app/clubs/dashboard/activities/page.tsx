"use client"

import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import ClubDashboardLayout from "@/components/club-dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Users, Megaphone, ShoppingBag, Clock, MapPin, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClubActivitiesPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentTab = searchParams.get("tab") || "calendar"
  
  const handleTabChange = (value: string) => {
    if (value === "calendar") {
      navigate("/clubs/dashboard/activities")
    } else {
      navigate(`/clubs/dashboard/activities?tab=${value}`)
    }
  }
  
  // Calendar State
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  })

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend - form submission would happen here
    setIsDialogOpen(false)
    setEventForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
    })
  }

  return (
    <ClubDashboardLayout>
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold text-slate-900">Activities</h1>
        
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-purple-100/50 p-1">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Calendar</TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Create</TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Teams</TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Announcements</TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Shop</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6 mt-6">
             <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-purple-900">Calendar & Events</h2>
                  <p className="text-purple-600 mt-2">Create and manage club activities</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-purple-900">Create New Event</DialogTitle>
                      <DialogDescription className="text-purple-600">Add a new activity to your club calendar</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateEvent}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-purple-900">Event Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter event title"
                            value={eventForm.title}
                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                            required
                            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-purple-900">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter event description"
                            value={eventForm.description}
                            onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                            rows={3}
                            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date" className="text-purple-900">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={eventForm.date}
                              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                              required
                              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time" className="text-purple-900">Time</Label>
                            <Input
                              id="time"
                              type="time"
                              value={eventForm.time}
                              onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                              required
                              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-purple-900">Location</Label>
                          <Input
                            id="location"
                            placeholder="Enter location"
                            value={eventForm.location}
                            onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                            required
                            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity" className="text-purple-900">Capacity</Label>
                          <Input
                            id="capacity"
                            type="number"
                            placeholder="Maximum participants"
                            value={eventForm.capacity}
                            onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                            required
                            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-purple-300 text-purple-700 hover:bg-purple-50">
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Create Event</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-purple-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                    <CardTitle className="text-purple-900">Upcoming Events</CardTitle>
                    <CardDescription className="text-purple-600">All scheduled activities for your club</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-purple-100">
                      {[
                        { 
                          title: "Summer Tournament Finals", 
                          date: "Sat, Dec 16", 
                          time: "10:00 AM - 4:00 PM", 
                          location: "Main Court", 
                          attendees: 42, 
                          max: 50,
                          type: "Tournament"
                        },
                        { 
                          title: "Beginner Workshop", 
                          date: "Sun, Dec 17", 
                          time: "2:00 PM - 3:30 PM", 
                          location: "Training Room B", 
                          attendees: 12, 
                          max: 15,
                          type: "Workshop"
                        },
                        { 
                          title: "Club Social Mixer", 
                          date: "Fri, Dec 22", 
                          time: "6:00 PM - 9:00 PM", 
                          location: "Club Lounge", 
                          attendees: 28, 
                          max: 60,
                          type: "Social"
                        },
                      ].map((event, i) => (
                        <div key={i} className="p-6 hover:bg-purple-50/30 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                                {event.type}
                              </Badge>
                              <h3 className="font-bold text-purple-900 text-lg">{event.title}</h3>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-400 hover:text-purple-700">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid sm:grid-cols-3 gap-4 mt-3 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-purple-500" />
                              {event.date}, {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-purple-500" />
                              {event.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-purple-500" />
                              <span className="font-medium text-purple-900 mr-1">{event.attendees}</span>
                              / {event.max} registered
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 shadow-lg h-fit">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                    <CardTitle className="text-purple-900">Calendar</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center p-4">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-purple-200" />
                  </CardContent>
                </Card>
              </div>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <CardTitle className="text-purple-900">Create New Activity</CardTitle>
                <CardDescription className="text-purple-600">Set up a new event, class, or tournament</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-purple-900">Activity Type</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700">Class</Button>
                        <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700">Event</Button>
                        <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700">Tournament</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-title" className="text-purple-900">Title</Label>
                      <Input id="create-title" placeholder="e.g. Summer Championship" className="border-purple-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-desc" className="text-purple-900">Description</Label>
                      <Textarea id="create-desc" placeholder="Describe the activity..." className="border-purple-200" rows={4} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-purple-900">Start Date</Label>
                        <Input type="date" className="border-purple-200" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-purple-900">Start Time</Label>
                        <Input type="time" className="border-purple-200" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-purple-900">Location</Label>
                      <Input placeholder="e.g. Court 1" className="border-purple-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-purple-900">Max Participants</Label>
                      <Input type="number" placeholder="0" className="border-purple-200" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-4">
                      Publish Activity
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="mt-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-purple-900">Teams Management</CardTitle>
                    <CardDescription className="text-purple-600">Manage your club teams and rosters</CardDescription>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" /> New Team
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Varsity Eagles", members: 12, coach: "Coach Mike", nextMatch: "vs. Tigers (Dec 15)" },
                    { name: "Junior Hawks", members: 15, coach: "Sarah J.", nextMatch: "vs. Lions (Dec 18)" },
                    { name: "Recreational A", members: 20, coach: "Tom B.", nextMatch: "Practice (Dec 14)" },
                  ].map((team, i) => (
                    <Card key={i} className="border-purple-100 hover:border-purple-300 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-purple-900">{team.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Members:</span>
                          <span className="font-medium">{team.members}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Coach:</span>
                          <span className="font-medium">{team.coach}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Next:</span>
                          <span className="font-medium text-purple-600">{team.nextMatch}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50">
                          Manage Roster
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="mt-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-purple-900">Announcements</CardTitle>
                    <CardDescription className="text-purple-600">Broadcast messages to all members</CardDescription>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Megaphone className="mr-2 h-4 w-4" /> New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-purple-100">
                  {[
                    { title: "Holiday Schedule Changes", date: "2 hours ago", author: "Admin", preview: "Please note that the club will be closed on Dec 25th and Jan 1st..." },
                    { title: "New Equipment Arrived", date: "Yesterday", author: "Coach Mike", preview: "We're excited to announce that the new training equipment has arrived..." },
                    { title: "Tournament Registration Open", date: "3 days ago", author: "Admin", preview: "Registration for the Winter Tournament is now open for all members..." },
                  ].map((post, i) => (
                    <div key={i} className="p-6 hover:bg-purple-50/30 transition-colors">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-purple-900">{post.title}</h3>
                        <span className="text-xs text-slate-500">{post.date}</span>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{post.preview}</p>
                      <div className="flex items-center text-xs text-purple-500 font-medium">
                        Posted by {post.author}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="mt-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-purple-900">Club Shop</CardTitle>
                    <CardDescription className="text-purple-600">Manage merchandise and inventory</CardDescription>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { name: "Club T-Shirt", price: "$25.00", stock: 45, sales: 120 },
                    { name: "Water Bottle", price: "$15.00", stock: 30, sales: 85 },
                    { name: "Training Kit", price: "$85.00", stock: 12, sales: 40 },
                    { name: "Cap", price: "$20.00", stock: 50, sales: 65 },
                  ].map((item, i) => (
                    <Card key={i} className="border-purple-100 overflow-hidden">
                      <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-400">
                        Image Placeholder
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-purple-900">{item.name}</h3>
                        <p className="text-purple-600 font-medium">{item.price}</p>
                        <div className="mt-3 text-xs space-y-1 text-slate-600">
                          <div className="flex justify-between">
                            <span>Stock:</span>
                            <span className={item.stock < 20 ? "text-red-500 font-bold" : "text-green-600"}>{item.stock}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Sales:</span>
                            <span>{item.sales}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubDashboardLayout>
  )
}
