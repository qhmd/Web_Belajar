<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PwReset; // Pastikan Anda mengimpor model PwReset
use App\Models\User; // Pastikan Anda mengimpor model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Http\middleware\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Carbon\Carbon;



class ForgotPasswordController extends Controller
{
    public function showLinkRequestForm() {
        return;
    }
    
    public function sendResetLinkEmail(Request $request)
    {
        error_log('User email: ' . $request->email);
        // Validasi email yang diberikan
        $request->validate(['email' => 'required|email']);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Jika user tidak ditemukan, kembalikan respons 404
        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

            // Generate token acak
        $token = rand(10000, 99999); // Menghasilkan angka acak antara 10000 dan 99999


        // Simpan token dan email ke dalam tabel PwReset
        PwReset::create([
            'email' => $request->email,
            'token' => $token,
        ]);

        // Kirim email dengan token
        try {
            Mail::to($request->email)->send(new ResetPasswordMail($token, $request->email));
            return response()->json(['message' => 'Reset password link has been sent to your email. Please check your inbox.'], 200);
        } catch (\Exception $e) {
            Log::error('Email could not be sent. Error: ' . $e->getMessage());
            return response()->json(['message' => 'Email could not be sent. Error: ' . $e->getMessage()], 500);
        }
    }


    public function sendToken(Request $request) {
        $request -> validate([
            'token' => 'required',
        ]);

        $passReset = PwReset::where('token', '=', $request->token)->first();

        // var_dump($passReset);
        if ($passReset) {
            $user = User::where('email', $passReset->email)->first();  // Ambil email dari PwReset
            if ($user) {
                Log::info("Waktu sekarang", ['time' => Carbon::now()->toDateTimeString()]);

                // Login user
                auth()->login($user);
                Log::info('Current time', ['now' => Carbon::now()]);
                Log::info('Subtracted time', ['sub_minute' => Carbon::now()->subMinutes(1)]);
                
                // Query delete
                PwReset::where('created_at', '<=', Carbon::now()->subMinutes(1))->delete();
                
                Log::info('Tokens deleted');
                return response()->json(['message' => 'Token Berhasil, Silahkan Buat Password Baru!'], 200);
            }
        } else {
            return response()->json(['message' => 'Token Salah.'], 401);
        }
    }

    public function updateUserPass(Request $request) {
        $request->validate([
            'password' => 'required|string|min:8',
        ]);
        
        // Ambil user yang sedang login
        $user = Auth::user();
        Log::info("User yang sedang login: " . json_encode($user));
        
        if ($user) {
            // Update password dan hash password baru
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json(['message' => 'Kata Sandi Berhasil di Ubah'], 200);
        } else {
            return response()->json(['message' => 'Ubah Kata Sandi Gagal'], 401);
        }
    }

    public function reset(Request $request)
    {
        // Validasi data permintaan reset kata sandi

        $request->validate([
            'token' => 'required', // Menambahkan validasi untuk token
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        // Periksa apakah token valid
        $pwReset = PwReset::where('email', $request->email)->where('token', $request->token)->first();

        if (!$pwReset) {
            return response()->json(['message' => 'Invalid token'], 400);
        }

        // Lakukan reset kata sandi
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->forceFill([
                'password' => bcrypt($request->password),
            ])->save();

            // Hapus token setelah berhasil reset
            $pwReset->delete();

            return response()->json(['message' => 'Password has been reset successfully'], 200);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
