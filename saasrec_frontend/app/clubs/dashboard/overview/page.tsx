"use client"

import ClubDashboardLayout from "@/components/club-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Calendar, TrendingUp, ArrowRight, UserPlus, Bell } from "lucide-react"

export default function ClubOverviewPage() {
  return (
    <ClubDashboardLayout>
      <div className="p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Club Dashboard</h1>
            <p className="text-purple-600 mt-2">Overview of your club's performance and activities.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Members
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total Members</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">142</div>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">$4,250</div>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">8</div>
              <p className="text-xs text-purple-500 mt-1">3 events this week</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Pending Requests</CardTitle>
              <UserPlus className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">5</div>
              <p className="text-xs text-orange-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-purple-900">Recent Registrations</CardTitle>
                  <CardDescription className="text-purple-600">Latest members joining your club</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-100">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-purple-100">
                {[
                  { name: "Sarah Johnson", plan: "Gold Membership", date: "Today, 10:23 AM", status: "Active", amount: "$120" },
                  { name: "Michael Chen", plan: "Monthly Pass", date: "Yesterday, 4:15 PM", status: "Active", amount: "$45" },
                  { name: "Emma Wilson", plan: "Drop-in Class", date: "Yesterday, 2:30 PM", status: "Completed", amount: "$15" },
                  { name: "James Rodriguez", plan: "Silver Membership", date: "Dec 12, 2023", status: "Pending", amount: "$80" },
                  { name: "Lisa Thompson", plan: "Gold Membership", date: "Dec 11, 2023", status: "Active", amount: "$120" },
                ].map((reg, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-purple-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                        {reg.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">{reg.name}</p>
                        <p className="text-xs text-purple-500">{reg.plan} • {reg.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-purple-900">{reg.amount}</p>
                      <Badge variant="outline" className={`text-xs ${
                        reg.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 
                        reg.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {reg.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-purple-900">Quick Actions</CardTitle>
              <CardDescription className="text-purple-600">Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 h-auto py-3">
                <Calendar className="mr-3 h-5 w-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Create Event</div>
                  <div className="text-xs text-purple-400">Schedule a new activity</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 h-auto py-3">
                <Users className="mr-3 h-5 w-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Manage Members</div>
                  <div className="text-xs text-purple-400">View and edit roster</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 h-auto py-3">
                <DollarSign className="mr-3 h-5 w-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Record Payment</div>
                  <div className="text-xs text-purple-400">Log offline transaction</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50 h-auto py-3">
                <Bell className="mr-3 h-5 w-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Send Announcement</div>
                  <div className="text-xs text-purple-400">Notify all members</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClubDashboardLayout>
  )
}
