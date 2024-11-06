<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class PwReset extends Authenticatable
{
    use HasFactory, Notifiable;

    public $timestamps = false; // Menonaktifkan timestamp otomatis

    protected $table = 'password_reset_tokens';

    // Kolom yang diizinkan untuk mass assignment
    protected $fillable = [
        'email',
        'token',
    ];
}

