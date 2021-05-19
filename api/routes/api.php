<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(
    ['middleware' => 'api', 'prefix' => 'auth'],
    function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/user-profile', [AuthController::class, 'userProfile']);
    }
);

Route::group(
    ['middleware' => 'auth:api', 'prefix' => 'categories'],
    function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::get('/{category}', [CategoryController::class, 'show']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::put('/{category}', [CategoryController::class, 'update']);
        Route::delete('/{category}', [CategoryController::class, 'delete']);
    }
);

Route::group(
    ['middleware' => 'auth:api', 'prefix' => 'items'],
    function () {
        Route::get('/', [ItemController::class, 'index']);
        Route::get('/{item}', [ItemController::class, 'show']);
        Route::post('/', [ItemController::class, 'store']);
        Route::put('/{item}', [ItemController::class, 'update']);
        Route::delete('/{item}', [ItemController::class, 'delete']);
    }
);

Route::group(
    ['middleware' => 'auth:api', 'prefix' => 'sources'],
    function () {
        Route::get('/', [SourceController::class, 'index']);
        Route::get('/{source}', [SourceController::class, 'show']);
        Route::post('/', [SourceController::class, 'store']);
        Route::put('/{source}', [SourceController::class, 'update']);
        Route::delete('/{source}', [SourceController::class, 'delete']);
    }
);

Route::group(
    ['middleware' => 'auth:api', 'prefix' => 'users'],
    function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{user}', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'delete']);
    }
);
