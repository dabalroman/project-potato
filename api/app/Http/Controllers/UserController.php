<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @return User[]|Collection
     */
    public function index()
    {
        return User::all();
    }

    /**
     * @param User $user
     * @return User
     */
    public function show(User $user): User
    {
        return $user;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        if(!$this->amIAdmin()){
            return response()->json(null, 403);
        }

        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    /**
     * @param Request $request
     * @param User    $user
     * @return JsonResponse
     */
    public function update(Request $request, User $user): JsonResponse
    {
        if(!$this->amIAdmin() && !$this->isThisMe($user)){
            return response()->json(null, 403);
        }

        $user->update($request->all());

        return response()->json($user);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function delete(User $user): JsonResponse
    {
        if(!$this->amIAdmin() && !$this->isThisMe($user)){
            return response()->json(null, 403);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
