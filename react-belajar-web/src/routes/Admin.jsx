import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Layouts/Header/Header"; // Komponen Header
import ProtectedRoute from "./ProtectedRoute"; // Komponen ProtectedRoute
import Home from '../components/Home/Home'; // Komponen Home
import Service from "../Service&Footer/Service"; // Komponen Service
import Footer from "../Service&Footer/Footer"; // Komponen Service
import Dashboard from "../components/Admin/dashboard"; //
import ListUser from "../components/Admin/listuser";
import UpdateUserForm from "../components/Admin/updateUsers";
import Frontend from "../components/Admin/frontend";
import MateriPageBack from "../components/Admin/backend";
import Pelatihan from "../components/Admin/pelatihan";

function Admin() {
    return (
        <Routes>
            {/* Rute untuk komponen Header, dengan pengecekan akses menggunakan ProtectedRoute */}
            <Route 
                path = '/'
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Header /> {/* Komponen yang ingin dirender */}
                        <Home /> {/* Komponen yang ingin dirender */}
                        <Service /> {/* Komponen yang ingin dirender */}
                        <Footer /> {/* Komponen yang ingin dirender */}
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Dashboard /> {/* Komponen yang ingin dirender */}
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/daftaruser" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <div style={{ display: 'flex', height: '100vh' }}>
                            {/* Sidebar (Dashboard) */}
                            <div style={{ width: '250px', background: '#f4f4f4' }}>
                                <Dashboard />
                            </div>

                            {/* Konten Utama */}
                            <div style={{ flex: 1, padding: '20px' }}>
                                <ListUser />
                            </div>
                        </div>
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/materifront" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <div style={{ display: 'flex' }}>
                            {/* Sidebar (Dashboard) */}
                            <div style={{ width: '250px', background: '#f4f4f4' }}>
                                <Dashboard />
                            </div>

                            {/* Konten Utama */}
                            <div style={{ padding: '20px' }}>
                                <>
                                <Frontend /> {/* Komponen yang ingin dirender */}
                                </>
                            </div>
                            {/* <div style={{ flex: 1, padding: '20px' }}> */}
                                {/* <TambahMateriFront /> Komponen yang ingin dirender */}
                            {/* </div> */}
                        </div>
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/materiback" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <div style={{ display: 'flex'}}>
                            {/* Sidebar (Dashboard) */}
                            <div style={{ width: '250px', background: '#f4f4f4' }}>
                                <Dashboard />
                            </div>

                            {/* Konten Utama */}
                            <div style={{ padding: '20px' }}>
                                <MateriPageBack /> {/* Komponen yang ingin dirender */}
                            </div>
                            {/* <div style={{ flex: 1, padding: '20px' }}> */}
                                {/* <TambahMateriFront /> Komponen yang ingin dirender */}
                            {/* </div> */}
                        </div>
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/pelatihan" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <div style={{ display: 'flex', height: '100vh' }}>
                            {/* Sidebar (Dashboard) */}
                            <div style={{ width: '250px', background: '#f4f4f4' }}>
                                <Dashboard />
                            </div>

                            {/* Konten Utama */}
                            <div style={{ flex: 1, padding: '20px' }}>
                                <Pelatihan /> {/* Komponen yang ingin dirender */}
                            </div>
                            {/* <div style={{ flex: 1, padding: '20px' }}> */}
                                {/* <TambahMateriFront /> Komponen yang ingin dirender */}
                            {/* </div> */}
                        </div>
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/update/:id"
                element = {
                    <ProtectedRoute allowedRoles={['admin']}>
                        <UpdateUserForm /> {/* Komponen yang ingin dirender */}
                    </ProtectedRoute>
                }
            />
        
          
            {/* Jika ada rute anak yang lain, dapat ditambahkan di sini */}
        </Routes>
    );
}

export default Admin;
