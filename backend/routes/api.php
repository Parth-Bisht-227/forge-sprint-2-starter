<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;

// Boards
Route::apiResource('boards', BoardController::class);

// Lists
Route::get('boards/{board}/lists', [ListController::class, 'index']);
Route::post('boards/{board}/lists', [ListController::class, 'store']);
Route::apiResource('lists', ListController::class)->except(['index']);

// Cards
Route::get('lists/{list}/cards', [CardController::class, 'index']);
Route::post('lists/{list}/cards', [CardController::class, 'store']);
Route::apiResource('cards', CardController::class)->except(['index']);

// Specialized Card Actions
Route::patch('cards/{id}/move', [CardController::class, 'move']);
Route::post('cards/{id}/tags', [CardController::class, 'syncTags']);
Route::post('cards/{id}/members', [CardController::class, 'syncMembers']);

// Global Lookups
Route::get('tags', [TagController::class, 'index']);
Route::post('tags', [TagController::class, 'store']);
Route::get('members', [MemberController::class, 'index']);
Route::post('members', [MemberController::class, 'store']);
