<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public $timestamps = false; // Menonaktifkan timestamp otomatis

    // Kolom yang diizinkan untuk mass assignment
    protected $fillable = [
        'name',
        'email',
        'role',
        'password',
    ];
}

