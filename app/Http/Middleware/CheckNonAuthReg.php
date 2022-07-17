<?php

namespace App\Http\Middleware;

use Closure;

class CheckNonAuthReg
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->guard('regisseur')->check()){

            return redirect()->to('/');

        }
        else{

            return $next($request);

        }
    }
}
