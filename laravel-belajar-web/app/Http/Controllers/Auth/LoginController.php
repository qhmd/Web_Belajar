<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    
    public function showLoginForm()
    {
        // Menampilkan form pendaftaran jika diperlukan
        return; // Ganti dengan view yang sesuai
    }


    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        // Mencari pengguna berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Memeriksa apakah pengguna ada dan password cocok
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Jika berhasil, simpan informasi pengguna di sesi
            return response()->json(['message' => 'Login berhasil!'], 200);
        } else {
            // Jika gagal, kirim pesan kesalahan
            return response()->json([' '], 401);
        }
    }
}
