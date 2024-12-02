<?php

namespace App\Http\Controllers\Materi;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class PelatihanKontrol extends Controller {
    public function index() {
        return response()->json(Pelatihan::all());
    }

    public function store(Request $request) {
        // Validasi input
        $request->validate([
            'judul_pelatihan' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal_buka' => 'required|string',
            'tanggal_tutup' => 'required|string',
            'lama_pelatihan' => 'required|string',
            'link_pelatihan' => 'required|string',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan gambar ke storage
        $imagePath = $request->file('picture')->store('images', 'public');

        // Simpan data ke database
        $materi = Pelatihan::create([
            'judul_pelatihan' => $request->judul_pelatihan,
            'deskripsi' => $request->deskripsi,
            'tanggal_buka' => $request->tanggal_buka,
            'tanggal_tutup' => $request->tanggal_tutup,
            'lama_pelatihan' => $request->lama_pelatihan,   
            'link_pelatihan' => $request->link_pelatihan, //
            'picture' => $imagePath,
        ]);

        return response()->json(['message' => 'Pelatihan berhasil ditambahkan', 'data' => $materi], 201);
    }

    public function update(Request $request, $id)
        {
            try {
                // Log semua data yang diterima untuk debugging
                Log::info('Data diterima', [
                    'all_data' => $request->all(),
                    'picture' => $request->file('picture'),
                ]);

                // Validasi data dengan error handling yang lebih spesifik
                try {
                    $validated = $request->validate([
                        'judul_pelatihan' => 'required|string|max:255',
                        'deskripsi' => 'required|string',
                        'tanggal_buka' => 'required|string',
                        'tanggal_tutup' => 'required|string',
                        'lama_pelatihan' => 'required|string',
                        'link_pelatihan' => 'required|string',
                        'picture' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
                    ]);
                } catch (\Illuminate\Validation\ValidationException $e) {
                    \Log::error('Validation Errors:', [
                        'errors' => $e->errors(),
                        'request_data' => $request->all()
                    ]);
                    return response()->json([
                        'message' => 'Validation failed',
                        'errors' => $e->errors()
                    ], 422);
                }

                // Cari data materi
                $pelatihan = Pelatihan::findOrFail($id);

                // Proses file gambar
                if ($request->hasFile('picture')) {
                    // Hapus gambar lama jika ada
                    if ($pelatihan->picture) {
                        Storage::disk('public')->delete($pelatihan->picture);
                    }
                    
                    // Simpan gambar baru
                    $validated['picture'] = $request->file('picture')->store('materi/images', 'public');
                }

                // Update data
                $pelatihan->update($validated);

                return response()->json([
                    'message' => 'Data berhasil diperbarui',
                    'materi' => $pelatihan,
                ], 200);

            } catch (\Exception $e) {
                \Log::error("Error during update:", [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return response()->json([
                    'message' => 'Update failed',
                    'error' => $e->getMessage()
                ], 500);
            }
        }
    
  

    public function delete(Request $request, $id) {
        $materi = Pelatihan::findOrFail($id);
        $materi->delete();
        return response()->json(['message' => 'Materi Berhasil Dihapus']);
    }
}
