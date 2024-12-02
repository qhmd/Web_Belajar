<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class FrontEnd extends Authenticatable
{
    use HasFactory, Notifiable;

    public $timestamps = false; // Menonaktifkan timestamp otomatis

    protected $table = 'front_end';

    // Kolom yang diizinkan untuk mass assignment
    protected $fillable = ['judul_materi', 'level_materi' ,'deskripsi', 'link_materi', 'picture'];

}

