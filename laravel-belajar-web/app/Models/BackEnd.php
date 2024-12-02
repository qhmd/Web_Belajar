<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class BackEnd extends Authenticatable
{
    use HasFactory, Notifiable;

    public $timestamps = false; // Menonaktifkan timestamp otomatis

    protected $table = 'back_end';

    // Kolom yang diizinkan untuk mass assignment
    protected $fillable = ['judul_materi', 'deskripsi', 'level_materi', 'link_materi', 'picture'];

}

