<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Source
 *
 * @method static Builder|Source newModelQuery()
 * @method static Builder|Source newQuery()
 * @method static Builder|Source query()
 * @mixin Eloquent
 */
class Source extends Model
{
    protected $table = 'model';

    protected $fillable = [
        'name',
    ];

    protected $hidden = [];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
