import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import StandardPage from './pages/StandardPage'
import AmbassadorsPage from './pages/AmbassadorsPage'
import IndexPage from './pages/IndexPage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"                          element={<Home />} />
        <Route path="/standard"                  element={<StandardPage />} />
        <Route path="/ambassadors"               element={<AmbassadorsPage />} />
        <Route path="/index"                     element={<IndexPage />} />
        <Route path="/index/:categoryId"         element={<CategoryPage />} />
        <Route path="/index/:categoryId/:productId" element={<ProductPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
