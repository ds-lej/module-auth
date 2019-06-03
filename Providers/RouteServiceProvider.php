<?php

namespace Mod\Auth\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The module namespace to assume when generating URLs to actions.
     *
     * @var string
     */
    protected $moduleNamespace = 'Mod\Auth\Http\Controllers';

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapExtRoutes();
    }

    /**
     * Define the "ext" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     * And also, heading "EXT"
     *
     * @return void
     */
    protected function mapExtRoutes()
    {
        Route::prefix('ext')
            ->middleware('ext')
            ->namespace($this->moduleNamespace)
            ->group(__DIR__ . '/../Routes/ext.php');
    }
}
