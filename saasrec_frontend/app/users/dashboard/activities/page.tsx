"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

// Mock data for available activities
const AVAILABLE_ACTIVITIES = [
  { id: 1, title: "Summer Soccer League", club: "City Sports Club", age: "8-12 yrs", schedule: "Mon/Wed 18:00", spots: 5, price: "$150" },
  { id: 2, title: "Advanced Swimming", club: "Aqua Center", age: "10-15 yrs", schedule: "Tue/Thu 16:00", spots: 2, price: "$200" },
  { id: 3, title: "Youth Basketball", club: "Community Gym", age: "12-16 yrs", schedule: "Sat 10:00", spots: 12, price: "$120" },
]

export default function MyActivitiesPage() {
  return (
    <UserDashboardLayout title="My Activities" activePage="activities">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Activities</h1>
          <p className="text-slate-500 mt-2">View your registered activities and status</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-900">Registered Activities</CardTitle>
                <Badge className="bg-blue-600 text-white">0</Badge>
              </div>
              <CardDescription className="text-slate-500">Activities you've signed up for</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-slate-500">No registered activities yet</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-900">Completed Activities</CardTitle>
                <Badge className="bg-blue-600 text-white">0</Badge>
              </div>
              <CardDescription className="text-slate-500">Activities you've completed</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-slate-500">No completed activities yet</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Available Activities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {AVAILABLE_ACTIVITIES.map((activity) => (
              <Card key={activity.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 mb-2">{activity.club}</Badge>
                    <span className="font-bold text-slate-900">{activity.price}</span>
                  </div>
                  <CardTitle className="text-lg text-slate-900">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>Age: {activity.age}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {activity.spots} spots left
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t border-slate-100">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Register Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  )
}
