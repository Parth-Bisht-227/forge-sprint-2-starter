<?php

namespace App\Http\Controllers;

use App\Models\BoardList;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ListController extends Controller
{
    public function index($boardId): JsonResponse
    {
        return response()->json(BoardList::where('board_id', $boardId)->orderBy('position')->get());
    }

    public function store(Request $request, $boardId): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'integer',
        ]);

        $list = BoardList::create([
            'board_id' => $boardId,
            'name' => $validated['name'],
            'position' => $request->input('position', 0),
        ]);

        return response()->json($list, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $list = BoardList::findOrFail($id);
        $validated = $request->validate([
            'name' => 'string|max:255',
            'position' => 'integer',
        ]);

        $list->update($validated);
        return response()->json($list);
    }

    public function destroy($id): JsonResponse
    {
        BoardList::destroy($id);
        return response()->json(null, 204);
    }
}
