import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

// pages

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
