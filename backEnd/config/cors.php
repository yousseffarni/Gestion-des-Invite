<?php


return [
    'paths' => ['api/*',
               '/Login',
               '/sanctum/csrf-cookie',
               '/RegisterCollaborateur'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3001'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [], 

    'max_age' => 0,

    'supports_credentials' => true,

];
