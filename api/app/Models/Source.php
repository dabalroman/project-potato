<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Source
 *
 * @method static Builder|Source newModelQuery()
 * @method static Builder|Source newQuery()
 * @method static Builder|Source query()
 * @mixin Eloquent
 * @property int         $id
 * @property string      $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Source whereCreatedAt($value)
 * @method static Builder|Source whereId($value)
 * @method static Builder|Source whereName($value)
 * @method static Builder|Source whereUpdatedAt($value)
 */
class Source extends Model
{
    protected $table = 'source';

    protected $fillable = [
        'name',
    ];

    protected $hidden = [];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
