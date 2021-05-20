<?php

namespace App\Models;

use DB;
use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Category
 *
 * @method static Builder|Category newModelQuery()
 * @method static Builder|Category newQuery()
 * @method static Builder|Category query()
 * @mixin Eloquent
 * @property int         $id
 * @property string      $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Category whereCreatedAt($value)
 * @method static Builder|Category whereId($value)
 * @method static Builder|Category whereName($value)
 * @method static Builder|Category whereUpdatedAt($value)
 * @property-read array $items
 */
class Category extends Model
{
    protected $table = 'category';

    protected $appends = [
        'items'
    ];

    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /** @noinspection PhpUnused */
    public function getItemsAttribute(): array
    {
        return array_map(
            static fn($e) => $e->id,
            DB::table('item')
              ->select('id')
              ->where('category', '=', $this->id)
              ->get()
              ->toArray()
        );
    }
}
