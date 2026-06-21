<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\BoardList;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CardController extends Controller
{
    public function index($listId): JsonResponse
    {
        return response()->json(Card::where('list_id', $listId)->orderBy('position')->get());
    }

    public function store(Request $request, $listId): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'position' => 'integer',
        ]);

        $card = Card::create([
            'list_id' => $listId,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'due_date' => $validated['due_date'] ?? null,
            'position' => $request->input('position', 0),
        ]);

        return response()->json($card, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(Card::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $card = Card::findOrFail($id);
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'due_date' => 'nullable',
            'position' => 'integer',
        ]);

        $card->update($validated);
        return response()->json($card);
    }

    public function destroy($id): JsonResponse
    {
        Card::destroy($id);
        return response()->json(null, 204);
    }

    public function move(Request $request, $id): JsonResponse
    {
        $card = Card::findOrFail($id);
        $validated = $request->validate([
            'list_id' => 'required|integer',
            'position' => 'integer',
        ]);

        $card->update([
            'list_id' => $validated['list_id'],
            'position' => $request->input('position', $card->position),
        ]);

        return response()->json($card);
    }

    public function syncTags(Request $request, $id): JsonResponse
    {
        $card = Card::findOrFail($id);
        $validated = $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'integer',
        ]);

        $card->tags()->sync($validated['tag_ids']);
        return response()->json($card->load('tags'));
    }

    public function syncMembers(Request $request, $id): JsonResponse
    {
        $card = Card::findOrFail($id);
        $validated = $request->validate([
            'member_ids' => 'required|array',
            'member_ids.*' => 'integer',
        ]);

        $card->members()->sync($validated['member_ids']);
        return response()->json($card->load('members'));
    }
}
