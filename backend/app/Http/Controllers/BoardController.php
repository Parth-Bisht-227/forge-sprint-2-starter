<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BoardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Board::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $board = Board::create($validated);
        return response()->json($board, 201);
    }

    public function show(string $id): JsonResponse
    {
        $board = Board::findOrFail($id);
        return response()->json($board);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $board = Board::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $board->update($validated);
        return response()->json($board);
    }

    public function destroy(string $id): JsonResponse
    {
        Board::destroy($id);
        return response()->json(null, 204);
    }
}
