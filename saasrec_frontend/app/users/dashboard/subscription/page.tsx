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
            <Card className="border-primary/20 shadow-lg bg-white relative">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-primary">Free Member</CardTitle>
                    <CardDescription className="text-primary mt-2">Perfect for getting started</CardDescription>
                  </div>
                  <Star className="h-10 w-10 text-primary" />
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">$0</span>
                  <span className="text-primary">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary mb-4">Basic Functions:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Register for Activities</p>
                        <p className="text-sm text-primary">Sign up for club events and activities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">View Club Calendar</p>
                        <p className="text-sm text-primary">See all upcoming club events</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Registration Status</p>
                        <p className="text-sm text-primary">Track your registrations with receipt function</p>
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
            <Card className="border-primary/20 shadow-2xl bg-white relative border-2">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 border-b border-primary/20 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                      Premium Member
                      <Crown className="h-6 w-6 text-yellow-600" />
                    </CardTitle>
                    <CardDescription className="text-primary mt-2 font-medium">Get the full experience</CardDescription>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">$10</span>
                  <span className="text-primary">/month</span>
                  <div className="text-sm text-primary">Or <span className="font-bold">$100</span>/year</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-accent rounded-lg p-3 border border-primary/20">
                    <p className="text-sm font-semibold text-primary">✨ Everything in Free, plus:</p>
                  </div>
                  
                  <h3 className="font-semibold text-primary mb-4">Premium Functions:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Email Reminders for Activities</p>
                        <p className="text-sm text-primary">Never miss an event with automatic reminders</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Report Cards for Activities</p>
                        <p className="text-sm text-primary">Get detailed progress reports and feedback</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-primary">Personal Activity Calendar</p>
                        <p className="text-sm text-primary">View all your enrolled activities in one place</p>
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
