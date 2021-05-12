<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Item
 *
 * @method static Builder|Item newModelQuery()
 * @method static Builder|Item newQuery()
 * @method static Builder|Item query()
 * @mixin Eloquent
 * @property int         $id
 * @property string      $name
 * @property float       $price
 * @property int         $amount
 * @property int         $state
 * @property string|null $description
 * @property int         $source
 * @property int         $category
 * @property int         $last_edit_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Item whereAmount($value)
 * @method static Builder|Item whereCategory($value)
 * @method static Builder|Item whereCreatedAt($value)
 * @method static Builder|Item whereDescription($value)
 * @method static Builder|Item whereId($value)
 * @method static Builder|Item whereLastEditBy($value)
 * @method static Builder|Item whereName($value)
 * @method static Builder|Item wherePrice($value)
 * @method static Builder|Item whereSource($value)
 * @method static Builder|Item whereState($value)
 * @method static Builder|Item whereUpdatedAt($value)
 */
class Item extends Model
{
    public const STATE_OK = 0;
    public const STATE_BORROWED = 1;
    public const STATE_BROKEN = 2;

    protected $table = 'item';

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

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
