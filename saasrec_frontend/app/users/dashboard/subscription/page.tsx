"use client"

import { UserDashboardLayout } from "@/components/user-dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown, Star } from "lucide-react"

export default function UserSubscriptionPage() {
  return (
    <UserDashboardLayout title="Subscription" activePage="subscription">
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold text-slate-900">My Subscription</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* FREE Plan */}
            <Card className="border-purple-200 shadow-lg bg-white relative">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-purple-900">Free Member</CardTitle>
                    <CardDescription className="text-purple-600 mt-2">Perfect for getting started</CardDescription>
                  </div>
                  <Star className="h-10 w-10 text-purple-500" />
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-purple-900">$0</span>
                  <span className="text-purple-600">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-purple-900 mb-4">Basic Functions:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-purple-900">Register for Activities</p>
                        <p className="text-sm text-purple-600">Sign up for club events and activities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-purple-900">View Club Calendar</p>
                        <p className="text-sm text-purple-600">See all upcoming club events</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-purple-900">Registration Status</p>
                        <p className="text-sm text-purple-600">Track your registrations with receipt function</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12"
                  disabled
                >
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            {/* PREMIUM Plan */}
            <Card className="border-purple-300 shadow-2xl bg-white relative border-2">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-200 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-purple-900 flex items-center gap-2">
                      Premium Member
                      <Crown className="h-6 w-6 text-yellow-600" />
                    </CardTitle>
                    <CardDescription className="text-purple-700 mt-2 font-medium">Get the full experience</CardDescription>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-purple-900">$10</span>
                  <span className="text-purple-700">/month</span>
                  <div className="text-sm text-purple-600">Or <span className="font-bold">$100</span>/year</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <p className="text-sm font-semibold text-purple-900">✨ Everything in Free, plus:</p>
                  </div>
                  
                  <h3 className="font-semibold text-purple-900 mb-4">Premium Functions:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-purple-900">Email Reminders for Activities</p>
                        <p className="text-sm text-purple-600">Never miss an event with automatic reminders</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-purple-900">Report Cards for Activities</p>
                        <p className="text-sm text-purple-600">Get detailed progress reports and feedback</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-purple-900">Personal Activity Calendar</p>
                        <p className="text-sm text-purple-600">View all your enrolled activities in one place</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12 shadow-lg"
                  onClick={() => window.location.href = "/users/signup?plan=premium"}
                >
                  Upgrade to Premium
                </Button>
              </CardFooter>
            </Card>
          </div>
      </div>
    </UserDashboardLayout>
  )
}
