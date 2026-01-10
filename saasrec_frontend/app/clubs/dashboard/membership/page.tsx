"use client"

import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import ClubDashboardLayout from "@/components/club-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for members
const MOCK_MEMBERS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-0101", status: "Active", joinDate: "2023-09-15", plan: "Gold" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "555-0102", status: "Active", joinDate: "2023-10-01", plan: "Silver" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "555-0103", status: "Inactive", joinDate: "2023-08-20", plan: "Bronze" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", phone: "555-0104", status: "Active", joinDate: "2023-11-10", plan: "Gold" },
  { id: 5, name: "Evan Wright", email: "evan@example.com", phone: "555-0105", status: "Pending", joinDate: "2023-12-05", plan: "Silver" },
]

export default function MembershipPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentTab = searchParams.get("tab") || "members-list"

  const handleTabChange = (value: string) => {
    if (value === "members-list") {
      navigate("/clubs/dashboard/membership")
    } else {
      navigate(`/clubs/dashboard/membership?tab=${value}`)
    }
  }

  const filteredMembers = MOCK_MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ClubDashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-purple-900">Membership Management</h1>
              <p className="text-purple-600 mt-2">View and manage club members</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Add New Member</Button>
          </div>

          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-purple-100/50 p-1 mb-6">
              <TabsTrigger value="members-list" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Members List</TabsTrigger>
              <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Summary</TabsTrigger>
              <TabsTrigger value="import-export" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Import/Export</TabsTrigger>
              <TabsTrigger value="configuration" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="members-list">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-purple-900">Members Directory</CardTitle>
                      <CardDescription className="text-purple-600">Total Members: {MOCK_MEMBERS.length}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-500" />
                        <Input 
                          placeholder="Search members..." 
                          className="pl-9 w-[250px] border-purple-200 focus-visible:ring-purple-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon" className="border-purple-200 text-purple-700">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-purple-50/50">
                        <TableHead className="text-purple-900">Name</TableHead>
                        <TableHead className="text-purple-900">Contact</TableHead>
                        <TableHead className="text-purple-900">Status</TableHead>
                        <TableHead className="text-purple-900">Plan</TableHead>
                        <TableHead className="text-purple-900">Joined</TableHead>
                        <TableHead className="text-right text-purple-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <TableRow key={member.id} className="hover:bg-purple-50/30">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                                  {member.name.charAt(0)}
                                </div>
                                {member.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm">
                                <span className="flex items-center gap-1 text-slate-600"><Mail className="h-3 w-3" /> {member.email}</span>
                                <span className="flex items-center gap-1 text-slate-500"><Phone className="h-3 w-3" /> {member.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={member.status === 'Active' ? 'default' : member.status === 'Inactive' ? 'secondary' : 'outline'} 
                                className={
                                  member.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 
                                  member.status === 'Inactive' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200' : 
                                  'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200'
                                }>
                                {member.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{member.plan}</TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                            No members found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="summary">
              <Card className="border-purple-200 shadow-lg p-6">
                <div className="text-center text-purple-600">Summary View Placeholder</div>
              </Card>
            </TabsContent>
            
            <TabsContent value="import-export">
              <Card className="border-purple-200 shadow-lg p-6">
                <div className="text-center text-purple-600">Import/Export Tools Placeholder</div>
              </Card>
            </TabsContent>
            
            <TabsContent value="configuration">
              <Card className="border-purple-200 shadow-lg p-6">
                <div className="text-center text-purple-600">Membership Configuration Placeholder</div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ClubDashboardLayout>
  )
}
