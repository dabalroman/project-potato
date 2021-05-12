<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get(
    '/user', function (Request $request) {
    return $request->user();
}
);

Route::get('categories', 'App\Http\Controllers\CategoryController@index');
Route::get('categories/{category}', 'App\Http\Controllers\CategoryController@show');
Route::post('categories', 'App\Http\Controllers\CategoryController@store');
Route::put('categories/{category}', 'App\Http\Controllers\CategoryController@update');
Route::delete('categories/{category}', 'App\Http\Controllers\CategoryController@delete');

Route::get('items', 'App\Http\Controllers\ItemController@index');
Route::get('items/{item}', 'App\Http\Controllers\ItemController@show');
Route::post('items', 'App\Http\Controllers\ItemController@store');
Route::put('items/{item}', 'App\Http\Controllers\ItemController@update');
Route::delete('items/{item}', 'App\Http\Controllers\ItemController@delete');

Route::get('sources', 'App\Http\Controllers\SourceController@index');
Route::get('sources/{source}', 'App\Http\Controllers\SourceController@show');
Route::post('sources', 'App\Http\Controllers\SourceController@store');
Route::put('sources/{source}', 'App\Http\Controllers\SourceController@update');
Route::delete('sources/{source}', 'App\Http\Controllers\SourceController@delete');

Route::get('users', 'App\Http\Controllers\UserController@index');
Route::get('users/{user}', 'App\Http\Controllers\UserController@show');
Route::post('users', 'App\Http\Controllers\UserController@store');
Route::put('users/{user}', 'App\Http\Controllers\UserController@update');
Route::delete('users/{user}', 'App\Http\Controllers\UserController@delete');
