<?php

Route::prefix('auth')->group(function() {
    Route::post('/', 'AuthController@index');
    Route::post('/login', 'AuthController@login');
});