import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Layouts/Header/Header";
import Home from "./components/Home/Home";
import Signup from "./components/Signup";
import TokenForPw from "./components/changePassword";
import ForgotPassword from "./components/resetPassword";
import Services from "./Service&Footer/Service";
import Footer from "./Service&Footer/Footer";
import { LoginProvider } from "./context/AuthContext";
import Admin from "./routes/Admin";
import Users from "./routes/Users";
import FrontEndUser from "./components/frontendUser";
import BackEndUser from "./components/BackEndUser";
import PelatihanUser from "./components/PelatihanUser";
import LevelMateriFront from "./components/levelFront/levelMateriFront";
import FrontEndUserMenengah from "./components/frontEndManengah";
import FrontEndUserLanjutan from "./components/frontEndLanjutan";
import LevelMateriBack from "./components/levelFront/levelMateriBack";
import BackEnduser from "./components/BackEndUser";
import BackEnduserMenengah from "./components/levelBack/backEndMenengah";
import BackEnduserLanjutan from "./components/levelBack/backEndLanjutan";

function App() {
  return (
    <LoginProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/front-end" element={
              <>
                <LevelMateriFront />
              </>
              } />
          <Route path='front-end/pemula' element={<FrontEndUser/>}/>
          <Route path='front-end/menengah' element={<FrontEndUserMenengah/>}/>
          <Route path='front-end/lanjutan' element={<FrontEndUserLanjutan/>}/>


          {/* <Route path="/back-end" element={<BackEndUser />} /> */}
          <Route path="/back-end" element={<LevelMateriBack />} />
          <Route path='back-end/pemula' element={<BackEndUser/>}/>
          <Route path='back-end/menengah' element={<BackEnduserMenengah/>}/>
          <Route path='back-end/lanjutan' element={<BackEnduserLanjutan/>}/>
          
          <Route path="/pelatihan" element={<PelatihanUser />} />
          <Route path="/login"
            element={
                <Login />
                } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/ganti-sandi" element={<TokenForPw />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        <Services /><Footer />
      </div>
    </LoginProvider>
  );
}

export default App;
