"use client"

import type React from "react"

import { useState } from "react"
import ClubDashboardLayout from "@/components/club-dashboard-layout"
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
import { Plus } from "lucide-react"

export default function CalendarPage() {
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
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Calendar & Events</h1>
              <p className="text-primary mt-2">Create and manage club activities</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-primary">Create New Event</DialogTitle>
                  <DialogDescription className="text-primary">Add a new activity to your club calendar</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateEvent}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-primary">Event Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter event title"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        required
                        className="border-primary/20 focus:border-primary/20 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-primary">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter event description"
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        rows={3}
                        className="border-primary/20 focus:border-primary/20 focus:ring-purple-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-primary">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          required
                          className="border-primary/20 focus:border-primary/20 focus:ring-purple-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-primary">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          required
                          className="border-primary/20 focus:border-primary/20 focus:ring-purple-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-primary">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter location"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        required
                        className="border-primary/20 focus:border-primary/20 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="text-primary">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="Maximum participants"
                        value={eventForm.capacity}
                        onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                        required
                        className="border-primary/20 focus:border-primary/20 focus:ring-purple-400"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-primary/20 text-primary hover:bg-accent">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Create Event</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-primary/20">
                <CardTitle className="text-primary">Upcoming Events</CardTitle>
                <CardDescription className="text-primary">All scheduled activities for your club</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-purple-100">
                  {[
                    { id: 1, title: "Summer Soccer Camp", date: "2023-07-15", time: "09:00 AM", location: "Main Field", capacity: "30/50" },
                    { id: 2, title: "Swimming Gala", date: "2023-07-20", time: "02:00 PM", location: "Aquatic Center", capacity: "45/100" },
                    { id: 3, title: "Basketball Tournament", date: "2023-08-05", time: "10:00 AM", location: "Indoor Gym", capacity: "12/20 Teams" },
                  ].map((event) => (
                    <div key={event.id} className="p-4 hover:bg-accent/50 transition-colors flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-accent text-primary rounded-lg p-2 text-center min-w-[60px]">
                          <div className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                          <div className="text-xl font-bold">{new Date(event.date).getDate()}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{event.title}</h3>
                          <div className="text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                            <span>{event.time}</span>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">{event.capacity}</div>
                        <div className="text-xs text-primary">Registered</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-primary/20">
                <CardTitle className="text-primary">Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-primary/20" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClubDashboardLayout>
  )
}
