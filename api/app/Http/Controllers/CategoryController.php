<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * @return Category[]|Collection
     */
    public function index(){
        return Category::all();
    }

    /**
     * @param Category $category
     * @return Category
     */
    public function show(Category $category): Category
    {
        return $category;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    /**
     * @param Request  $request
     * @param Category $category
     * @return JsonResponse
     */
    public function update(Request $request, Category $category): JsonResponse
    {
        $category->update($request->all());

        return response()->json($category);
    }

    /**
     * @param Category $category
     * @return JsonResponse
     */
    public function delete(Category $category): JsonResponse
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
