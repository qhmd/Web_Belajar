<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;


class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    // Metode untuk mengembalikan respons JSON dengan format konsisten
    protected function jsonResponse($data, $status = 200)
    {
        return response()->json($data, $status);
    }

    // Metode untuk menangani error secara global
    protected function handleValidationErrors($validator)
    {
        return $this->jsonResponse(['errors' => $validator->errors()], 422);
    }
}
