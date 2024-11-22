<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class RegisterController extends Controller
{

    public function showRegistrationForm()
    {
        // Menampilkan form pendaftaran jika diperlukan
        return; // Ganti dengan view yang sesuai
    }
    public function register(Request $request)
    {
    // Validasi data pendaftaran
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        // Menggunakan metode handleValidationErrors dari Controller
        return $this->handleValidationErrors($validator);
    }

    // Menyimpan pengguna baru
    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);
    
    return $this->jsonResponse(['message' => 'Registrasi berhasil!'], 201);
}}

