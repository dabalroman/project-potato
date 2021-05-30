<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function amIAdmin(): bool {
        /** @var User $currentlyLoggedUser */
        $currentlyLoggedUser = auth()->user();

        return User::isAdmin($currentlyLoggedUser);
    }

    /**
     * @param User $user
     * @return bool
     */
    protected function isThisMe(User $user): bool
    {
        /** @var User $currentlyLoggedUser */
        $currentlyLoggedUser = auth()->user();

        return $currentlyLoggedUser->id === $user->id;
    }
}
