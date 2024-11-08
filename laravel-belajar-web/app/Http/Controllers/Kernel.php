<?php 
protected $middlewareGroups = [
    'web' => [
        // Middleware lain...
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class, // Middleware CSRF
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \App\Http\Middleware\Cors::class
        \Laravel\Cors\HandleCors::class,
    ],

    // Middleware grup lainnya...
];
