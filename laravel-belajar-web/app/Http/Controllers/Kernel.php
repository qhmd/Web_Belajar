<?php 
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\Cors::class,
        \Laravel\Cors\HandleCors::class,
        \Fruitcake\Cors\HandleCors::class,  
        // Middleware lain...
        \App\Http\Middleware\TrustProxies::class,
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class, // Middleware CSRF
        \Illuminate\Routing\Middleware\SubstituteBindings::class,

    ],

    // Middleware grup lainnya...
];
