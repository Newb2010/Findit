<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    // Menampilkan semua barang
    public function index(Request $request)
    {
        $items = Item::query()
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->get();

        return response()->json($items);
    }

    // Menampilkan detail barang
    public function show(Item $item)
    {
        return response()->json($item);
    }

    // Membuat laporan barang
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:100',
            'status' => 'required|in:lost,found',
            'location' => 'required|string|max:255',
            'event_date' => 'nullable|date',
            'image' => 'nullable|image|max:15360',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')
                ->store('items', 'public');
        }

        unset($validated['image']);

        $item = Item::create($validated);

        return response()->json([
            'message' => 'Item berhasil dilaporkan.',
            'data' => $item,
        ], 201);
    }

    // Mengedit laporan barang
    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string|max:100',
            'status' => 'sometimes|required|in:lost,found',
            'location' => 'sometimes|required|string|max:255',
            'event_date' => 'nullable|date',
            'image' => 'nullable|image|max:15360',
        ]);

        if ($request->hasFile('image')) {
            if ($item->image_path) {
                Storage::disk('public')->delete($item->image_path);
            }

            $validated['image_path'] = $request->file('image')
                ->store('items', 'public');
        }

        unset($validated['image']);

        $item->update($validated);

        return response()->json([
            'message' => 'Item berhasil diperbarui.',
            'data' => $item->fresh(),
        ]);
    }

    // Menghapus laporan barang
    public function destroy(Item $item)
    {
        if ($item->image_path) {
            Storage::disk('public')->delete($item->image_path);
        }

        $item->delete();

        return response()->json([
            'message' => 'Item berhasil dihapus.',
        ]);
    }
}
