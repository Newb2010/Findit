<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'status',
        'location',
        'image_path',
        'event_date',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];
}