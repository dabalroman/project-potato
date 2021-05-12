<?php

namespace App\Http\Controllers;

use App\Models\Source;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    /**
     * @return Source[]|Collection
     */
    public function index()
    {
        return Source::all();
    }

    /**
     * @param Source $source
     * @return Source
     */
    public function show(Source $source): Source
    {
        return $source;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $source = Source::create($request->all());

        return response()->json($source, 201);
    }

    /**
     * @param Request $request
     * @param Source  $source
     * @return JsonResponse
     */
    public function update(Request $request, Source $source): JsonResponse
    {
        $source->update($request->all());

        return response()->json($source);
    }

    /**
     * @param Source $source
     * @return JsonResponse
     */
    public function delete(Source $source): JsonResponse
    {
        $source->delete();

        return response()->json(null, 204);
    }
}
