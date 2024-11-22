<?php
namespace App\Http\Controllers\Materi;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\FrontEnd;
use Illuminate\Http\Request;

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
}
