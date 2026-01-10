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
            <h1 className="text-3xl font-bold text-primary">Club Dashboard</h1>
            <p className="text-primary mt-2">Overview of your club's performance and activities.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-accent">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Members
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Total Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">142</div>
              <p className="text-xs text-primary mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$4,250</div>
              <p className="text-xs text-primary mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8</div>
              <p className="text-xs text-primary mt-1">3 events this week</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Pending Requests</CardTitle>
              <UserPlus className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">5</div>
              <p className="text-xs text-orange-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary">Recent Registrations</CardTitle>
                  <CardDescription className="text-primary">Latest members joining your club</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-accent">
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
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                        {reg.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{reg.name}</p>
                        <p className="text-xs text-primary">{reg.plan} • {reg.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{reg.amount}</p>
                      <Badge variant="outline" className={`text-xs ${
                        reg.status === 'Active' ? 'bg-secondary/20 text-primary border-green-200' : 
                        reg.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                        'bg-background text-slate-700 border-slate-200'
                      }`}>
                        {reg.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-primary/20">
              <CardTitle className="text-primary">Quick Actions</CardTitle>
              <CardDescription className="text-primary">Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-accent h-auto py-3">
                <Calendar className="mr-3 h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Create Event</div>
                  <div className="text-xs text-primary">Schedule a new activity</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-accent h-auto py-3">
                <Users className="mr-3 h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Manage Members</div>
                  <div className="text-xs text-primary">View and edit roster</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-accent h-auto py-3">
                <DollarSign className="mr-3 h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Record Payment</div>
                  <div className="text-xs text-primary">Log offline transaction</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-accent h-auto py-3">
                <Bell className="mr-3 h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Send Announcement</div>
                  <div className="text-xs text-primary">Notify all members</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClubDashboardLayout>
  )
}
