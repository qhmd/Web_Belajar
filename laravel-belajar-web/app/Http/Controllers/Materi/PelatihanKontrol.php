<?php

namespace App\Http\Controllers\Materi;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
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
            'link_pelatihan' => 'required|string',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan gambar ke storage
        $imagePath = $request->file('picture')->store('images', 'public');

        // Simpan data ke database
        $materi = Pelatihan::create([
            'judul_pelatihan' => $request->judul_pelatihan,
            'deskripsi' => $request->deskripsi,
            'link_pelatihan' => $request->link_pelatihan, //
            'picture' => $imagePath,
        ]);

        return response()->json(['message' => 'Pelatihan berhasil ditambahkan', 'data' => $materi], 201);
    }
}
