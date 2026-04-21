import { Route } from 'react-router-dom'
import AdminRoute from '../components/admin/AdminRoute'
import Dashboard from '../components/common/Dashboard'
import CreateCategory from '../components/admin/CreateCategory'
import AllCategories from '../components/admin/AllCategories'
import CreatePost from '../components/admin/CreatePost'
import AllPost from '../components/admin/AllPost'
import EditPost from '../components/admin/EditPost'
import AllTrip from '../components/admin/AllTrip'
import AllUsers from '../components/admin/AllUsers'
import PendingReviews from '../components/admin/PendingReviews'

const stats = [
  { label: 'Total Posts', value: 24 },
  { label: 'Categories', value: 8 },
  { label: 'Trips', value: 15 },
  { label: 'Users', value: 342 }
]

export const adminRoutes = (
  <Route path='/admin' element={<AdminRoute />}>
    <Route index element={<Dashboard title='Admin Dashboard' stats={stats} />} />
    <Route path='create-category' element={<CreateCategory />} />
    <Route path='all-categories' element={<AllCategories />} />
    <Route path='create-post' element={<CreatePost />} />
    <Route path='all-posts' element={<AllPost />} />
    <Route path='edit-post/:slug' element={<EditPost />} />
    <Route path='all-trips' element={<AllTrip />} />
    <Route path='all-users' element={<AllUsers />} />
    <Route path='pending-reviews' element={<PendingReviews />} />
  </Route>
)