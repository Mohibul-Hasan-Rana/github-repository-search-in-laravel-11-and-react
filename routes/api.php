<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GitHubSearchController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::get('/search', [GitHubSearchController::class, 'search']);
Route::get('/getcommits', [GitHubSearchController::class, 'commits']);
