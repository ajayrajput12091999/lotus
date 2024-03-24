<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
// use Tymon\JWTAuth\Facades\JWTAuth;
// use Tymon\JWTAuth\Http\Middleware;
use JWTAuth;
class JWTMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            return response()->json(['status' =>false,'message'=> $e->getMessage()]);
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['status' =>false,'message'=>'Token is Invalid']);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['status' =>false,'message'=> 'Token is Expired']);
            } else {
                // $user = JWTAuth::parseToken()->authenticate();
                // dd($e->getMessage());
                return response()->json(['status' =>false,'message'=>'Authorization Token not found']);
            }
        }
        return $next($request);
    }
}