import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Home from "./pages/Home"
import Sidebar from './components/Sidebar'
const App = () => {
  return (
    <Router>
      <Header/>
      <Sidebar/>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/product/:productId"} element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App