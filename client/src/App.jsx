import React from 'react'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Footer from './components/common/Footer'
import SearchPage from './pages/SearchPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import Payment from './pages/Payment'
import ThankYou from './pages/ThankYou'
import { adminRoutes } from './routes/adminRoutes'
import { userRoutes } from './routes/userRoutes'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/hotel/:slug' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/thank-you' element={<ThankYou />} />
          {userRoutes}
          {adminRoutes}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
