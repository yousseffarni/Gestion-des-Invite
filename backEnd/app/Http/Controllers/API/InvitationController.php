<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Invitation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use DateTime;


class InvitationController extends Controller
{

    public function NouvelleInvitation (Request $request){

        $LoggedUser = Auth::user();

        $validator = Validator::make($request-> all(), [
          'Nom'=> 'required|min:4|max:50', 
          'Prenom'=>'required|min:4|max:50',
          'Email'=>'required|email|min:5|max:50',
          'Civilite'=>'required',
          'Type_Invitation'=>'required',
          'Entreprise'=>'required|min:4|max:255',
          'Poste'=>'required',
          'DateEntre'=>'required|date',
          'Commentaire'=>'required|min:4|max:255',
          'ToUser_Id'=>'required',
          'Site'=>'required',
        ]);

       if($validator->fails())
        {
          return response()->json([
            'status'=>401,
            'validation_errors'=>$validator->messages(),
          ]);
        }
        else
        {
          $NewInvitation = new Invitation;
          $NewInvitation->Nom=$request->Nom;
          $NewInvitation->Prenom=$request->Prenom;
          $NewInvitation->Email =$request->Email ;
          $NewInvitation->Civilite=$request->Civilite;
          $NewInvitation->Type_Invitation=$request->Type_Invitation;
          $NewInvitation->Entreprise=$request->Entreprise;
          $NewInvitation->Poste=$request->Poste;
          $NewInvitation->DateEntre=$request->DateEntre;
          $NewInvitation->Commentaire=$request->Commentaire;
          $NewInvitation->ToUser_Id=$request->ToUser_Id;
          $NewInvitation->Site=$request->Site;
          $NewInvitation->save();


          return response()->json([
            'status'=>200,
            'message'=>'Demande et envoyée avec succès', 
            'id'=>$NewInvitation->id,
          ]);
        }
    } 

    public function AllInvitations()
    {
        $Invitations= Invitation::all();
        if($Invitations)
        {
            return response()->json([
                'status'=>200,
                'Invitations'=>$Invitations,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'userid invalide',
            ]); 
        }
    }

    public function SupprimerInvitation($id)
    {

        $Invitation= Invitation::find($id);
        if($Invitation)
        {
            $Invitation->delete();
            return response()->json([
              'status'=>200,
              'message'=> 'Suppression avec succes',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'userid invalide',
            ]); 
        }
    }

    public function getInvitation($id)
    {

        $Invitation= Invitation::find($id);
        if($Invitation)
        {
            return response()->json([
                'status'=>200,
                'Invitation'=>$Invitation,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'userid invalide',
            ]); 
        }
    }




    public function UpdateInvitation (Request $request , $id){

      $LoggedUser = Auth::user();

      $validator = Validator::make($request-> all(), [
        'Nom'=> 'required|min:4|max:50', 
        'Prenom' =>'required|min:4|max:50',
        'Email' =>'required|email|min:5|max:50',
        'Civilite'=>'required',
        'Type_Invitation'=>'required',
        'Entreprise'=>'required|min:4|max:255',
        'Poste'=>'required',
        'DateEntre'=>'required|date',
        'Commentaire'=>'required|min:4|max:255',
        'ToUser_Id'=>'required',
        'Site'=>'required',
      ]);

     if($validator->fails())
      {
          return response()->json([
            'status'=>401,
            'validation_errors'=>$validator->messages(),
          ]);
      }
      else
      {
          $Invitation = Invitation::find($id);

          if($Invitation){
            $Invitation->Nom = $request->input('Nom');
            $Invitation->Prenom = $request->input('Prenom');
            $Invitation->Email = $request->input('Email') ;
            $Invitation->Civilite = $request->input('Civilite');
            $Invitation->Type_Invitation = $request->input('Type_Invitation');
            $Invitation->Entreprise = $request->input('Entreprise');
            $Invitation->Poste = $request->input('Poste');
            $Invitation->DateEntre = $request->input('DateEntre');
            $Invitation->Commentaire = $request->input('Commentaire');
            $Invitation->ToUser_Id = $request->input('ToUser_Id');
            $Invitation->Site = $request->input('Site');
            $Invitation->save();

            $Invitations = Invitation::all();

            return response()->json([
             'status'=>200,
             'message'=>'Invitation et Modifier avec succès', 
             'id'=>$Invitation->Id,
             'Invitation'=>$Invitation,
             'Invitations'=>$Invitations,
            ]);

          }else{
            return response()->json([
             'status'=>404,
             'message'=>'Invitation id non trouver', 
            ]);
          }
          

          
      }
  }
 

    public function DeleteInvitation($id)
    {
      $Invitation = Invitation::find($id);
      
      if($Invitation)
      {
        $Invitation->delete();
        $Invitations = Invitation::all();
        return response()->json([
          'status'=>200,
          'Invitations'=>$Invitations,
          'id'=>$id,
          'message'=>'Invitation est supprimé avec succès',
        ]); 
      }
      else{
        return response()->json([
            'status'=>401,
            'message'=>'Invitation id non Trouver',
        ]); 
      }
    }
}
