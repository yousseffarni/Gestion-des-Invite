<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Salaire;
use App\Models\Direction;
use App\Models\AffecterPostCb;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Rules\PhoneNumber;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{


    public function checkingAuthenticated(Request $request)
    {

      $user = Auth::user();
      if($user){
        return response()->json([
            'message'=>'Vous êtes authentifié', 
            'status'=>200, 
            'user'=>$user,   
        ],200);
      }else{
        return response()->json([
            'message'=>'Vous n\'êtes pas authentifié', 
            'status'=>404,      
        ]);
      }

    }


    public function Login(Request $request)
    {
       $validator = Validator::make($request-> all(), [
        'identifiant'=>'required|min:4|max:255',
        'password'=>'required|min:8|max:25',
       ], 
       [
           'identifiant.required' => 'Le champ identifiant est obligatoire.',
           'identifiant.max' => 'L\'identifiant ne doit pas dépasser 254 caractères.',
           'identifiant.min' => 'L\'identifiant doit contenir au moins 4 caractères.',
           'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
           'password.max' => 'Le mot de passe ne doit pas dépasser 25 caractères.',
           'password.required' => 'Le champ mot de passe est obligatoire.'
       ]);

       if($validator->fails())
       {
             return response()->json([
              'validation_errors'=>$validator->messages(),
              'message'=>"Les Champs identifiant et password sont Obligatoir!"
             ]); 
       }
       else
       {
          $user = User::where('identifiant' , $request->identifiant)->first();
          if($user)
          {

            if($request->password  == $user->password){  
              
            $token =  $user->createToken($user->identifiant.'_Token')->plainTextToken;

            return response() ->json([
              'status'=>200,
              'user'=>$user,
              'token'=>$token,
              'message'=>'Vous êtes connecté avec succès', 
            ]);

            }else{
               return response() ->json([
                   'status'=>404,
                   'message'=>'Le Mot de Pass et incorrectes', 
                 ]);
             }
          }
          else
          {
            return response() ->json([
                'status'=>404,
                'message'=>'identifiant que vous avez saisies et incorrectes', 
              ]);
          }
       }
    }

    public function Register(Request $request)
    {
       $validator = Validator::make($request-> all(), [
        'identifiant' => 'required|min:5|max:250|unique:users,identifiant',
        'email' => 'required|email|min:5|max:250|unique:users,email',
        'nom' => 'required|min:3|max:191',
        'prenom' => 'required|min:3|max:191',
        'Civilite' => 'required',
        'password' => 'required|min:8|max:20',
        'Confirm_password' => 'required|same:password',
       ], 
       [
        //identifiant
        'identifiant.required' => 'Le champ  Identifiant  est obligatoire.',
        'Civilite.required' => 'Le champ  Civilite  est obligatoire.',
        'identifiant.min' => 'Le champ Identifiant doit contenir au moins 5 caractères.', 
        'identifiant.max' => 'Le champ Identifiant ne doit pas dépasser 250 caractères.', 
        'identifiant.unique' => 'Cette Identifiant  à déjà été pris.', 

        //Email
        'email.required' => 'Le champ  Email  est obligatoire.', 
        'email.min' => 'Le champ Email doit contenir au moins 5 caractères.', 
        'email.max' => 'Le champ Email ne doit pas dépasser 250 caractères.', 
        'email.unique' => 'Cette Email  à déjà été pris.', 

        //password
        'password.required' => 'Le champ Mot de passe   est obligatoire.', 
        'Confirm_password.required' => 'Le champ Confirmation de Mot de passe est obligatoire.', 
        'Confirm_password.same' => 'Le champ Mot de passe et Confirmation de Mot de passe Ne Correspond pas.', 
        'password.min' => 'Le champ  Mot de passe doit contenir au moins 8 caractères.', 
        'password.max' => 'Le champ  Mot de passe ne doit pas dépasser 20 caractères.', 

        //Nom et Prenom
        'nom.required' => 'Le champ Nom est obligatoire.', 
        'nom.min' => 'Le champ  Nom doit contenir au moins 8 caractères.', 
        'nom.max' => 'Le champ  Nom ne doit pas dépasser 20 caractères.',

        'prenom.required' => 'Le champ Prenom est obligatoire.', 
        'prenom.min' => 'Le champ  Prenom doit contenir au moins 8 caractères.', 
        'prenom.max' => 'Le champ  Prenom ne doit pas dépasser 20 caractères.',
       ]);

       if($validator->fails())
       {
        return response()->json([
         'validation_errors'=>$validator->messages(),
         'message'=>"Les Champs identifiant et password sont Obligatoir!"
        ]); 
       }
       else{
        $user = new User;
        $user->identifiant = $request->identifiant;
        $user->email = $request->email;
        $user->nom = $request->nom;
        $user->prenom = $request->prenom;
        $user->Civilite = $request->Civilite;
        $user->password = $request->password;
        $user->save();

        return response() ->json([
          'status'=>200,
          'user'=>$user,
          'message'=>'Vous êtes Iscrire avec succès', 
        ]);
       }
    }

    public function Logout()
    {
      auth()->user()->tokens()->delete();
      return response()->json([
        'status'=>200,
        'message'=>'Déconnecté avec succès', 
      ]);
    }
}
