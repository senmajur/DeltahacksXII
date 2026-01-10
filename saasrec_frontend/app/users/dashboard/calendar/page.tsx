"use client"

import { useState } from "react"
import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

// Mock data for upcoming activities
const UPCOMING_ACTIVITIES = [
  { id: 1, title: "Soccer Practice", date: new Date(2023, 11, 15), time: "18:00 - 19:30", location: "Field A", type: "Practice" },
  { id: 2, title: "Swimming Lesson", date: new Date(2023, 11, 16), time: "16:00 - 17:00", location: "Main Pool", type: "Lesson" },
  { id: 3, title: "Basketball Game", date: new Date(2023, 11, 18), time: "14:00 - 16:00", location: "Gymnasium 1", type: "Game" },
]

export default function UserCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <UserDashboardLayout title="My Calendar" activePage="calendar">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-purple-600 mt-2">View your enrolled activities schedule</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <CardTitle className="text-purple-900">Upcoming Activities</CardTitle>
                <CardDescription className="text-purple-600">Your scheduled activities</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {UPCOMING_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="flex items-start p-4 rounded-lg border border-purple-100 bg-white hover:bg-purple-50 transition-colors">
                      <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-md flex flex-col items-center justify-center text-purple-700 mr-4">
                        <span className="text-xs font-bold uppercase">{activity.date.toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-xl font-bold">{activity.date.getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-purple-900">{activity.title}</h3>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{activity.type}</Badge>
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-purple-500" />
                            {activity.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-purple-500" />
                            {activity.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <CardTitle className="text-purple-900">Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-purple-200" />
              </CardContent>
            </Card>
          </div>
        </div>
      </UserDashboardLayout>
    )
  }

