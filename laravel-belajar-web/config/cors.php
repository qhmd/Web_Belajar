<?php

return [
    'paths' => [ 'api/*', 'sanctum/csrf-cookie', 'materifront/*','*'],  // Pastikan path sesuai dengan rute yang ada
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', '*'],  // Pastikan frontend diizinkan
    'allowed_headers' => ['Content-Type', 'X-XSRF-TOKEN', '*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,  // Hanya jika perlu kredensial (seperti cookies)
];
