<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransacaoController;
use App\Http\Controllers\AuthController;

// Rotas públicas
Route::post('login', [AuthController::class, 'login']);

// Rotas protegidas
Route::group([], function () {
    Route::apiResource('transacoes', TransacaoController::class);
    Route::get('resumo', [TransacaoController::class, 'resumo']);
    Route::post('logout', [AuthController::class, 'logout']);
})->middleware('auth:api');
