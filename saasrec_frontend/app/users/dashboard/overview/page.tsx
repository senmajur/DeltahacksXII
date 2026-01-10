"use client"

import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, Users, ArrowRight, Clock, MapPin } from "lucide-react"

export default function UserOverviewPage() {
  return (
    <UserDashboardLayout title="Overview" activePage="overview">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, User!</h1>
            <p className="text-slate-500 mt-2">Here's what's happening with your clubs and activities.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Find New Activities</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Upcoming Activities</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">3</div>
              <p className="text-xs text-slate-500 mt-1">Next: Soccer Practice (Tomorrow)</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Memberships</CardTitle>
              <CreditCard className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">2</div>
              <p className="text-xs text-slate-500 mt-1">1 expiring soon</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Clubs Joined</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">4</div>
              <p className="text-xs text-slate-500 mt-1">Across 3 categories</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Registered for Summer Camp", time: "2 hours ago", type: "Registration" },
                  { title: "Payment Successful: Monthly Dues", time: "Yesterday", type: "Payment" },
                  { title: "New Event Added: Team Lunch", time: "2 days ago", type: "Event" },
                  { title: "Profile Updated", time: "1 week ago", type: "Account" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal bg-slate-50">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Next Up</CardTitle>
              <CardDescription>Your schedule for the next few days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-blue-900">Soccer Practice</h3>
                    <Badge className="bg-blue-200 text-blue-800 hover:bg-blue-300 border-0">Tomorrow</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>18:00 - 19:30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>City Sports Field A</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-purple-900">Swimming Lesson</h3>
                    <Badge className="bg-purple-200 text-purple-800 hover:bg-purple-300 border-0">Wed, Dec 20</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>16:00 - 17:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Community Pool Lane 3</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                View Full Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserDashboardLayout>
  )
}
