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
            $userLogin = Auth::user();
            // Jika berhasil, simpan informasi pengguna di sesi
            return response()->json([
                'user' => $userLogin,
            ], 200);
        } else {
            // Jika gagal, kirim pesan kesalahan
            return response()->json([' '], 401);
        }
    }

    // public function logout(Request $request) {
    // $request->session()->invalidate(); // Hapus sesi
    // $request->session()->regenerate(); // Meregenerasi s
    // // Logout logic, e.g., delete session or token
    // auth()->logout();
    // return response()->json(['message' => 'Logout successful'], 200);
    // }
    public function logout($id)
    {
    $user = User::find($id);
    
    if ($user) {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    } else {
        return response()->json(['message' => 'User not found'], 404);
    }
    }


}