<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Direction;

class Site extends Model
{
    protected $table = 'site';
    protected $fillable = [
        'IntituleSite',
        'AdresseSite',
        'Localisation',
        'NomEntreprise'
    ];

}
