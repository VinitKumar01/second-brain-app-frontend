import { Signin } from "./pages/Signin"
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/signup" />} />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/dashboard/:hash" element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
}

export default App