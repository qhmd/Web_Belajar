<?php
use App\Http\Controllers\Auth\RegisterController;

Route::post('/register', [RegisterController::class, 'register']);
Route::get('/register', [RegisterController::class, 'showRegistrationForm']);
Route::resource('users', UserController::class);
