<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * @return Item[]|Collection
     */
    public function index()
    {
        return Item::all();
    }

    /**
     * @param Item $item
     * @return Item
     */
    public function show(Item $item): Item
    {
        return $item;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $requestData = $request->all();
        $requestData['last_edit_by'] = $user->id;

        $item = Item::create($requestData);

        return response()->json($item, 201);
    }

    /**
     * @param Request $request
     * @param Item    $item
     * @return JsonResponse
     */
    public function update(Request $request, Item $item): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $requestData = $request->all();
        $requestData['last_edit_by'] = $user->id;

        $item->update($requestData);

        return response()->json($item);
    }

    /**
     * @param Item $item
     * @return JsonResponse
     */
    public function delete(Item $item): JsonResponse
    {
        $item->delete();

        return response()->json(null, 204);
    }
}
