"use client"

import { useSearchParams, useNavigate } from "react-router-dom"
import ClubDashboardLayout from "@/components/club-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, TrendingUp, Users, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for recent reports
const RECENT_REPORTS = [
  { id: 1, name: "Monthly Revenue - November 2023", type: "Revenue", date: "2023-12-01", status: "Ready", size: "1.2 MB" },
  { id: 2, name: "Membership Growth Q3", type: "Membership", date: "2023-10-05", status: "Ready", size: "850 KB" },
  { id: 3, name: "Activity Attendance - Fall Session", type: "Attendance", date: "2023-11-20", status: "Ready", size: "2.4 MB" },
  { id: 4, name: "Annual Financial Summary 2022", type: "Financial", date: "2023-01-15", status: "Archived", size: "5.1 MB" },
]

export default function ReportsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentTab = searchParams.get("tab") || "financials"

  const handleTabChange = (value: string) => {
    if (value === "financials") {
      navigate("/clubs/dashboard/reports")
    } else {
      navigate(`/clubs/dashboard/reports?tab=${value}`)
    }
  }

  return (
    <ClubDashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Reports</h1>
            <p className="text-purple-600 mt-2">View and export financial and activity reports</p>
          </div>

          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-100/50 p-1 mb-6">
              <TabsTrigger value="financials" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Financials</TabsTrigger>
              <TabsTrigger value="assessments" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Assessments</TabsTrigger>
            </TabsList>

            <TabsContent value="financials" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-purple-200 shadow-lg">
                  <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-900">$12,450.00</div>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <span className="font-bold mr-1">+15%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 shadow-lg">
                  <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
                      <Users className="h-4 w-4" /> Active Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-900">142</div>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <span className="font-bold mr-1">+8</span> new this week
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 shadow-lg">
                  <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Total Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-900">24</div>
                    <p className="text-xs text-purple-500 mt-1">Scheduled for this month</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                  <CardTitle className="text-purple-900">Generate Reports</CardTitle>
                  <CardDescription className="text-purple-600">Select a report type and date range to generate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-900">Report Type</label>
                      <Select>
                        <SelectTrigger className="border-purple-200 focus:border-purple-400 focus:ring-purple-400">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue Report</SelectItem>
                          <SelectItem value="membership">Membership Report</SelectItem>
                          <SelectItem value="activity">Activity Report</SelectItem>
                          <SelectItem value="attendance">Attendance Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-900">Date Range</label>
                      <Select>
                        <SelectTrigger className="border-purple-200 focus:border-purple-400 focus:ring-purple-400">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Last 7 Days</SelectItem>
                          <SelectItem value="month">Last 30 Days</SelectItem>
                          <SelectItem value="quarter">Last Quarter</SelectItem>
                          <SelectItem value="year">Last Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Download className="mr-2 h-4 w-4" />
                    Generate & Export Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                  <CardTitle className="text-purple-900">Recent Reports</CardTitle>
                  <CardDescription className="text-purple-600">Previously generated reports</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-purple-50/50">
                        <TableHead className="text-purple-900">Report Name</TableHead>
                        <TableHead className="text-purple-900">Type</TableHead>
                        <TableHead className="text-purple-900">Date Generated</TableHead>
                        <TableHead className="text-purple-900">Size</TableHead>
                        <TableHead className="text-purple-900">Status</TableHead>
                        <TableHead className="text-right text-purple-900">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {RECENT_REPORTS.map((report) => (
                        <TableRow key={report.id} className="hover:bg-purple-50/30">
                          <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-purple-500" />
                            {report.name}
                          </TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.size}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments">
              <Card className="border-purple-200 shadow-lg p-6">
                <div className="text-center text-purple-600">Assessments Reports Placeholder</div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ClubDashboardLayout>
  )
}
