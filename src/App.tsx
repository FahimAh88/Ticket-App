import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "@/context/AppContext"
import { ThemeProvider } from "@/context/ThemeContext"
import AppLayout from "@/components/layout/AppLayout"

// Pages
import Home from "@/pages/Home"
import AllEvents from "@/pages/AllEvents"
import EventDetails from "@/pages/EventDetails"
import Profile from "@/pages/Profile"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import EventFormPage from "@/pages/admin/EventFormPage"
import SignIn from "@/pages/auth/SignIn"
import SignUp from "@/pages/auth/SignUp"
import CartPage from "@/pages/Cart"
import ArtistsPage from "@/pages/ArtistsPage"
import ArtistDetail from "@/pages/ArtistDetail"

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<AllEvents />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/artists/:id" element={<ArtistDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/events/new" element={<EventFormPage />} />
              <Route path="/admin/events/edit/:id" element={<EventFormPage />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
