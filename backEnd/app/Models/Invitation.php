<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Site;

class Invitation extends Model
{
    protected $table = 'invitation';
    protected $fillable = [
        'Nom', 
        'Prenom',
        'Email',
        'Civilite',
        'Type_Invitation',
        'Entreprise',
        'Poste',
        'DateEntre',
        'Commentaire',
        'ToUser_Id',
        'Site'
    ];

    protected $with = ['user'];    
    public function user()
    {
        return $this->belongsTo(User::class, 'ToUser_Id','id');
    }

}
