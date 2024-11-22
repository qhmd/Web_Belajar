import React from "react"
import { Route, Routes } from "react-router-dom"  // Hapus Router dari import
import Login from "./components/Login"
import Header from "./components/Layouts/Header/Header"
import Home from "./components/Home/Home"
import Signup from "./components/Signup"
import TokenForPw from "./components/changePassword"
import ForgotPassword from "./components/resetPassword"
import Services from "./Service&Footer/Service"
import Footer from "./Service&Footer/Footer"
import { LoginProvider } from "./context/AuthContext";
import Admin from "./routes/Admin"
import Users from './routes/Users';
import FrontEndUser from "./components/frontendUser"

function App() {
  return (
    <LoginProvider>
          <div>
      <Routes>
      <Route exact
                path="*"
                element={
                  <h1>Page Not Found</h1>
                }
        />
        <Route exact 
               path="/home" 
               element={
                 <>
                   <Header />
                   <Home />
                   <Services />
                   <Footer />
                 </>
               }
        />
        <Route exact 
               path="/front-end" 
               element={
                 <>
                   <Header />
                   <FrontEndUser/>
                   {/* <Services /> */}
                   {/* <Footer /> */}
                 </>
               }
        />
        <Route exact
               path="/login"
               element={
                <>
                <Header />
                 <Login />
                </>
               }
        />
        <Route exact
               path="/signup"
               element={
                <>
                <Header />
                 <Signup/>
                </>
               }
        />
        <Route exact
               path="/forgot-password"
               element={
                <>
                <Header />
                 <ForgotPassword />
                </>
               }
        />
        <Route exact
               path="/forgot-password/ganti-sandi"
               element={
                <>
                <Header />
                 <TokenForPw />
                </>
               }
        />
        <Route path="/admin/*" element={<Admin />}/>
        <Route path="/users/*" element={<Users />}/>
      </Routes>
    </div>
    </LoginProvider>
  )
}

export default App