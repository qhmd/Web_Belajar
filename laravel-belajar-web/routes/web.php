<?php
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Mail\ResetPasswordMail;
use App\Http\Controllers\Users\UserKontrol;
use App\Http\Controllers\Materi\MateriFront;
use App\Http\Controllers\Materi\MateriBack;
use App\Http\Controllers\Materi\PelatihanKontrol;




use App\Http\Controllers\AuthController;


Route::post('/register', [RegisterController::class, 'register']);
Route::get('/register', [RegisterController::class, 'showRegistrationForm']);

Route::post('/login', [LoginController::class, 'login']);
Route::get('/login', [LoginController::class, 'showLoginForm']);

Route::get('/logout', [LoginController::class, 'showLoginForm']);
Route::get('/admin/users', [UserKontrol::class, 'index']);

Route::match(['get','put'],'/admin/users/update/{id}', [UserKontrol::class, 'update']);
Route::match(['get','delete'],'/admin/users/delete/{id}', [UserKontrol::class, 'delete']);


// Route::group(['prefix' => 'admin/users'], function () {
    //     Route::put('/id', [UserKontrol::class, 'update'])->name('users.update');
//     Route::get('/', [UserKontrol::class, 'index'])->name('users.index'); 
// });

// Route::middleware('admin/users')->group(function () {
//     Route::get('/', [UserKontrol::class, 'index']);
//     // Route::get('/{id}', [UserKontrol::class, 'show']);
//     Route::put('/{id}', [UserKontrol::class, 'update']);
// });
// Route::put('users/{id}', 'UserKontrol@update')->name('users.update');


// Route::group(['prefix' => '/users'], function () {
//     Route::get('/', [
//         'uses' => 'UserKontrol@index',
//         'as'   => 'users.index',
//     ]);

//     Route::put('/{id}', [
//         'uses' => 'UserKontrol@update',
//         'as'   => 'users.update',
//     ]);
// });


Route::get('/materifront', [MateriFront::class, 'index']);
Route::post('/materifront', [MateriFront::class, 'store']);

Route::match(['get','put'],'/materifront/update/{id}', [MateriFront::class, 'update']);
Route::match(['get','delete'],'/materifront/delete/{id}', [MateriFront::class, 'delete']);

Route::match(['get','put'],'/materiback/update/{id}', [MateriBack::class, 'update']);
Route::match(['get','delete'],'/materiback/delete/{id}', [MateriBack::class, 'delete']);

Route::get('/materiback', [MateriBack::class, 'index']);
Route::post('/materiback', [MateriBack::class, 'store']);

Route::get('/pelatihan', [PelatihanKontrol::class, 'index']);
Route::post('/pelatihan', [PelatihanKontrol::class, 'store']);


Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'sendToken']);

Route::post('/input-token', [ForgotPasswordController::class, 'sendToken']);
Route::get('/input-token', [ForgotPasswordController::class, 'showLinkRequestForm']);

Route::post('/ganti-password', [ForgotPasswordController::class, 'updateUserPass']);
// Route::post('/ganti-password', [ForgotPasswordController::class, 'showRegisterForm']);
// Route::group(['middleware' => ['web']], function () {
//     Route::get('/home', [HomeController::class, 'index'])->name('home');
//     Route::post('/login', [AuthController::class, 'login']);
//     Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
// });
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return Auth::user();
});



// Route::delete('/user', [LoginController::class, 'logout']);


// Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
//     // Menghapus token yang digunakan oleh pengguna saat ini
//     $request->user()->currentAccessToken()->delete();
    
//     // Menghapus session untuk logout (jika menggunakan session)
//     session()->invalidate();
//     session()->regenerateToken();

//     return response()->json(['message' => 'Logged out successfully']);
// });
// Route::middleware('auth:sanctum')->post('/logout',[LoginController::class,'logout']);
// Route::delete('/user/57', [LoginController::class, 'logout']);


// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
// Route::post('/logout', function () {
//     Auth::logout();
//     return response()->json(['message' => 'Logged out successfully']);
// });