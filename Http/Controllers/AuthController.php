<?php

namespace Lej\Auth\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    /**
     * Check auth
     * @return Response
     */
    public function index()
    {
        return response()->json(['status' => false]);
    }

    /**
     * Login
     * @return Response
     */
    public function login()
    {
        return response()->json(['status' => false]);
    }
}
