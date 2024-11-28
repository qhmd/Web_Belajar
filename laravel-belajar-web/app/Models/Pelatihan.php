<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pelatihan extends Authenticatable
{
    use HasFactory, Notifiable;

    public $timestamps = false; // Menonaktifkan timestamp otomatis

    protected $table = 'pelatihan';

    // Kolom yang diizinkan untuk mass assignment
    protected $fillable = ['judul_pelatihan', 'deskripsi', 'picture', 'link_pelatihan'];

}

