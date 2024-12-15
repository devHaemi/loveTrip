import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Test from '@/pages/Test'
import HotelList from '@/pages/HotelList'
import HotelPage from '@/pages/Hotel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
