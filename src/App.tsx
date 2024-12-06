import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Test from '@/pages/Test'
import HotelList from '@/pages/HotelList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
