<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\SiteController;
use App\Http\Controllers\API\InvitationController;
use App\Models\User;

Route::post('/Login',[AuthController::class,'Login']);
Route::post('/Register',[AuthController::class,'Register']);

Route::middleware(['auth:sanctum'])->group(function () {
    
  Route::get('/checkingAuthenticated',[AuthController::class,'checkingAuthenticated']);

  //Gestion Des Invité :
  Route::get('/AllInvitations',[InvitationController::class,'AllInvitations']);

  //Admin API:
  Route::middleware(['isAPIAdmin'])->group(function () {
    Route::post('/NouvelleInvitation',[InvitationController::class,'NouvelleInvitation']);
    Route::get('/GetInvitation/{id}',[InvitationController::class,'GetInvitation']);
    Route::put('/UpdateInvitation/{id}',[InvitationController::class,'UpdateInvitation']);
    Route::get('/EditInvitation/{id}',[InvitationController::class,'EditInvitation']);
    Route::delete('/DeleteInvitation/{id}',[InvitationController::class,'DeleteInvitation']);
  });

  
  Route::post('/Logout',[AuthController::class,'Logout']);
});



Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

