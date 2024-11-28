<?php
namespace App\Http\Controllers\Materi;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FrontEnd;
use Illuminate\Support\Facades\Log;


class MateriFront extends Controller
{
    public function index()
    {
        return response()->json(FrontEnd::all());
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'judul_materi' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'link_materi' => 'required|file|mimes:pdf', 
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan file PDF
        $pdfPath = $request->file('link_materi')->store('pdfs', 'public');

        // Simpan gambar
        $imagePath = $request->file('picture')->store('images', 'public');

        // Simpan data ke database
        $materi = FrontEnd::create([
            'judul_materi' => $request->judul_materi,
            'deskripsi' => $request->deskripsi,
            'link_materi' => $pdfPath,
            'picture' => $imagePath,
        ]);

        return response()->json(['message' => 'Data berhasil ditambahkan', 'data' => $materi], 201);
    }
    public function update(Request $request, $id)
    {
        try {
            // Log semua data yang diterima untuk debugging
            Log::info('Data diterima', [
                'all_data' => $request->all(),
                'link_materi' => $request->file('link_materi'),
                'picture' => $request->file('picture'),
            ]);
    
            // Validasi data
            $validated = $request->validate([
                'judul_materi' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'link_materi' => 'nullable|file|mimes:pdf|max:5120', // Tambahkan max ukuran jika perlu
                'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            // Cari data materi
            $materi = FrontEnd::findOrFail($id);
    
            // Proses file PDF
            if ($request->hasFile('link_materi')) {
                $validated['link_materi'] = $request->file('link_materi')->store('materi/pdf', 'public');
            }
    
            // Proses file gambar
            if ($request->hasFile('picture')) {
                $validated['picture'] = $request->file('picture')->store('materi/images', 'public');
            }
    
            // Update data
            $materi->update($validated);
    
            return response()->json([
                'message' => 'Data berhasil diperbarui',
                'materi' => $materi,
            ], 200);
    
        } catch (\Exception $e) {
            \Log::error("Error during update:", ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    


    public function delete(Request $request, $id) {
        $materi = FrontEnd::findOrFail($id);
        $materi->delete();
        return response()->json(['message' => 'Materi Berhasil Dihapus']);
    }
}
