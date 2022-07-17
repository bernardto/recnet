<?php

namespace App\Http\Middleware;

use Closure;

class CheckAuthReg
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
        if(!auth()->guard('regisseur')->check()){

            return redirect()->to('/login');

        }
        else{


            return $next($request);
        }

    }
}
