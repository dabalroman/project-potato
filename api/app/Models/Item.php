<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Item
 *
 * @method static Builder|Item newModelQuery()
 * @method static Builder|Item newQuery()
 * @method static Builder|Item query()
 * @mixin Eloquent
 */
class Item extends Model
{
    public const STATE_OK = 0;
    public const STATE_BORROWED = 1;
    public const STATE_BROKEN = 2;

    protected $fillable = [
        'name',
        'price',
        'amount',
        'source',
        'category',
        'state',
        'description',
        'last_edit_by',
    ];

    protected $hidden = [];

    protected $casts = [];
}
