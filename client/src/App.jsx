import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from './Pages/NotFound/NotFound'
import ScanTarget from './Pages/ScanTarget/ScanTarget'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/scan-target" exact element={<ScanTarget />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
