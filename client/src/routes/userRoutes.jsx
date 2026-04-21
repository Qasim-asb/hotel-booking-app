import { Route } from 'react-router-dom'
import UserRoute from '../components/user/UserRoute'
import Dashboard from '../components/common/Dashboard'
import YourOrder from '../components/user/YourOrder'
import ContributePost from '../components/user/ContributePost'

const stats = [
  { label: 'Total Bookings', value: 12 },
  { label: 'Upcoming Trips', value: 3 },
  { label: 'Reward Points', value: 450 }
]

export const userRoutes = (
  <Route path='/user' element={<UserRoute />}>
    <Route index element={<Dashboard title='User Dashboard' stats={stats} />} />
    <Route path='orders' element={<YourOrder />} />
    <Route path='contribute' element={<ContributePost />} />
  </Route>
)