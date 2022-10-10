<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
        ->header('Access-Control-Allow-Origins',['http://localhost:3001','http://10.1.1.134:3000'])
        ->header('Access-Control-Allow-Methods',"PUT,POST,DELETE,GET,OPTIONS")
        ->header('Access-Control-Allow-Headers',"Origin,Accept,Authorization,Content-Type,X-Auth-Token,x-xsrf-token,X-CSRF-TOKEN")
        ->header("Access-Control-Max-Age", "3600")
        ->header("Access-Control-Allow-Credentials", "true");
    }
}
