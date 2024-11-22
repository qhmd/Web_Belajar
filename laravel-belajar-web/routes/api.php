<?php
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Mail\ResetPasswordMail;
use App\Http\Controllers\AuthController;

// routes/api.php
Route::delete('/user', [LoginController::class, 'logout']);
