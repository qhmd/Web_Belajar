<?php
namespace App\Http\Controllers\Users;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;



class UserKontrol extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }


    public function show($id)
{
    // Mencari pengguna berdasarkan ID, jika tidak ditemukan akan mengembalikan 404
    $user = User::findOrFail($id);

    // Mengembalikan data pengguna dalam format JSON
    return response()->json($user);
}


public function delete(Request $request, $id) {
    // Mencari pengguna berdasarkan ID, jika tidak ditemukan akan mengembalikan 404
    $user = User::findOrFail($id);
    
    // Hapus pengguna
    $user->delete();
    
    return response()->json(['message' => 'User deleted successfully']);
}



public function update(Request $request, $id)
{
    
    try {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, 
            'role' => 'required|string|in:admin,user',
        ]);

        $user = User::findOrFail($id);  
        $user->update($validated);

        return response()->json($user, 200);
    } catch (\Exception $e) {
        
        \Log::error('User update error', [
            'id' => $id,
            'error' => $e->getMessage()
        ]);

        return response()->json([
            Log::info('CSRF Token:', [request()->header('X-XSRF-TOKEN')]),
            'message' => 'Update failed',
            'error' => $e->getMessage()
        ], 500);
    }
}
    

}
