<?php
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Mail\ResetPasswordMail;

Route::post('/register', [RegisterController::class, 'register']);
Route::get('/register', [RegisterController::class, 'showRegistrationForm']);

Route::post('/login', [LoginController::class, 'login']);
Route::get('/login', [LoginController::class, 'showLoginForm']);

Route::resource('users', UserController::class);

Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'sendToken']);

Route::post('/input-token', [ForgotPasswordController::class, 'sendToken']);
Route::get('/input-token', [ForgotPasswordController::class, 'showLinkRequestForm']);

Route::post('/ganti-password', [ForgotPasswordController::class, 'updateUserPass']);
// Route::post('/ganti-password', [ForgotPasswordController::class, 'showRegisterForm']);