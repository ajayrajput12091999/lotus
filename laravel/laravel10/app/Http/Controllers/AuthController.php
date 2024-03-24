<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use JWTAuth;


class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['login','register']]);

    }

    public function login(Request $request)
    {
        try {

            $rules = [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                
                return response()->json([
                    'success' => false,
                    'message' => $validator->messages()->first(),
                ], 200);
            }

            $credentials = $request->only('email', 'password');
            
            // $token = Auth::attempt($credentials);
            $jwt_token = JWTAuth::attempt($credentials);
            if (!$jwt_token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                ], 200);
            }

            $user = Auth::user();
            return response()->json([
                    'success' => true,
                    'message'=>'User Login Successfully',
                    'user' => $user,
                    'authorisation' => [
                        'token' => $jwt_token,
                        'type' => 'bearer',
                    ]
                ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }

    }

    public function register(Request $request){
        try {

            $rules = [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'role_type' => 'required',
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                
                return response()->json([
                    'success' => false,
                    'message' => $validator->messages()->first(),
                ], 200);
            }

            if(strtolower($request->role_type) != "admin" && strtolower($request->role_type) != "user"){
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid role type',
                ]);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_type' => strtolower($request->role_type),
            ]);

            // $token = Auth::login($user);
            // $token = JWTAuth::attempt($user);
            return response()->json([
                'success' => true,
                'message' => 'User Registered Successfully',
            ]);

            // return response()->json([
            //     'success' => true,
            //     'message' => 'User created successfully',
            //     'user' => $user,
            //     'authorisation' => [
            //         'token' => $token,
            //         'type' => 'bearer',
            //     ]
            // ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
        
    }

    public function logout(Request $request)
    {
        // dd($request->token);
        JWTAuth::invalidate($request->token);

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'success' => true,
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function verifyToken(){
        $user = JWTAuth::parseToken()->authenticate();

        if($user->toArray()){
            return response()->json([
                'success' => true,
                'message' => 'Token verified',
                'data' => $user->toArray()
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Details not found',
            ]);
        }                  
    }

}