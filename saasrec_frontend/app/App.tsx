import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import all page components
import LandingPage from './page'
import ClubSignInPage from './clubs/signin/page'
import ClubSignUpPage from './clubs/signup/page'
import UserSignInPage from './users/signin/page'
import UserSignUpPage from './users/signup/page'
import PrivacyPage from './privacy/page'

// Club Dashboard Pages
import ClubOverviewPage from './clubs/dashboard/overview/page'
import ClubSettingsPage from './clubs/dashboard/settings/page'
import ClubActivitiesPage from './clubs/dashboard/activities/page'
import ClubMembershipPage from './clubs/dashboard/membership/page'
import ClubReportsPage from './clubs/dashboard/reports/page'

// User Dashboard Pages
import UserOverviewPage from './users/dashboard/overview/page'
import UserSubscriptionPage from './users/dashboard/subscription/page'
import UserClubsPage from './users/dashboard/clubs/page'
import UserActivitiesPage from './users/dashboard/activities/page'
import UserCalendarPage from './users/dashboard/calendar/page'
import UserProfilePage from './users/dashboard/profile/page'
import UserMembershipPage from './users/dashboard/membership/page'
import UserReportsPage from './users/dashboard/reports/page'


import OrgDemo from "../src/myComponents"


function App() {
  return (
    <Router>
      <Routes>
        {/* TEMP DEMO ROUTE */}
        {import.meta.env.DEV && (
            <Route path="/dev/org-demo" element={<OrgDemo />} />
        )}
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/clubs/signin" element={<ClubSignInPage />} />
        <Route path="/clubs/signup" element={<ClubSignUpPage />} />
        <Route path="/users/signin" element={<UserSignInPage />} />
        <Route path="/users/signup" element={<UserSignUpPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        
        {/* Club Dashboard Routes */}
        <Route path="/clubs/dashboard/overview" element={<ClubOverviewPage />} />
        <Route path="/clubs/dashboard/settings" element={<ClubSettingsPage />} />
        <Route path="/clubs/dashboard/activities" element={<ClubActivitiesPage />} />
        <Route path="/clubs/dashboard/membership" element={<ClubMembershipPage />} />
        <Route path="/clubs/dashboard/reports" element={<ClubReportsPage />} />
        
        {/* User Dashboard Routes */}
        <Route path="/users/dashboard/overview" element={<UserOverviewPage />} />
        <Route path="/users/dashboard/subscription" element={<UserSubscriptionPage />} />
        <Route path="/users/dashboard/clubs" element={<UserClubsPage />} />
        <Route path="/users/dashboard/activities" element={<UserActivitiesPage />} />
        <Route path="/users/dashboard/calendar" element={<UserCalendarPage />} />
        <Route path="/users/dashboard/profile" element={<UserProfilePage />} />
        <Route path="/users/dashboard/membership" element={<UserMembershipPage />} />
        <Route path="/users/dashboard/reports" element={<UserReportsPage />} />
      </Routes>
    </Router>
  )
}



export default App