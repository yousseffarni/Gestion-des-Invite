<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Site;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    public function AddNewSite (Request $request){
        $validator = Validator::make($request-> all(), [
            'IntituleSite' => 'required|min:4|max:25',
            'AdresseSite' => 'required',
            'Localisation' => 'nullable',
            'NomEntreprise' => 'required',
           ], 
           [
             'IntituleSite.required' => 'Le champ Intitule de Site est obligatoire.',
             'IntituleSite.min' => 'Le champ  Intitule de Site doit contenir au moins 4 caractères.', 
             'IntituleSite.max' => 'Le champ Intitule de Site ne doit pas dépasser 25 caractères.', 

             'AdresseSite.required' => 'Le champ Adresse Site est obligatoire.',
             'NomEntreprise.required' => 'Le champ Nom Entreprise est obligatoire.',
           ]);
    
           if($validator->fails())
           {
            return response()->json([
              'validation_errors'=>$validator->messages(),
              'message'=>$validator->messages(),
            ]);
           }
    }  

    public function allSites()
    {
        $Sites = Site::all();
        return response()->json([
            'status'=>200,
            'Sites'=>$Sites,
        ]);
    }
}
