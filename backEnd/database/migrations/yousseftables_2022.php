<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('Attestation', function (Blueprint $table) {
            $table->increments('IdAttestation');
            $table->string('TypeAttestation',60);
            $table->date('DateDemande');
            $table->date('DateRetour');
            $table->date('DateRecuperation');
            $table->string('Status',60);
            $table->string('Commentaire',191);
            $table->unsignedInteger('CollaborateurID');
        });

        Schema::create('CompteBancaire', function (Blueprint $table) {
            $table->string('RIB',191);
            $table->string('NomBank',60);
            $table->unsignedInteger('CollaborateurID');
        });

        Schema::create('Conge', function (Blueprint $table) {
            $table->increments('IdConge');
            $table->date('Date_Debut');
            $table->date('Date_Fin');
            $table->string('nbr_Jours',60);
            $table->enum('Type', ['Annuels payés', 'Maladie','naissance','maternité','Autres absences autorisées']);
            $table->unsignedInteger('CollaborateurID');
        });

        Schema::create('Salaire', function (Blueprint $table) {
            $table->increments('IdSalaire');
            $table->doubleval('SalaireDeBase');
            $table->enum('ModePaiment', ['Virement Bancaire', 'Cash','Autre','Tcheck','Amana']);
            $table->unsignedInteger('CollaborateurID');
        });



        Schema::create('Site', function (Blueprint $table) {
            $table->increments('IdSite');
            $table->string('IntituleSite',191);
            $table->string('AdresseSite',191);
            $table->string('NomEntreprise',60);
        });

        Schema::create('Direction', function (Blueprint $table) {
            $table->increments('IdDirection');
            $table->string('IntituleDirection',60);
            $table->unsignedInteger('IdSite');
            $table->foreign('IdSite')->references('IdSite')->on('Site')->onDelete('set null');
        });

        Schema::create('Departement', function (Blueprint $table) {
            $table->increments('IdDepartement');
            $table->string('IntituleDepartement',60);
            $table->unsignedInteger('IdDirection');
            $table->foreign('IdDirection')->references('IdDirection')->on('Direction')->onDelete('set null');
        });

        Schema::create('Categorie', function (Blueprint $table) {
            $table->increments('CodeCategorie');
            $table->string('intituleCategorie',60);
        });

        Schema::create('post', function (Blueprint $table) {
            $table->increments('CodePost');
            $table->string('Intitule_Post',60);
            $table->string('AnneesExpertMin',60);
            $table->string('AnneesExpertMax',60);
            $table->unsignedInteger('CodeCategorie');
            $table->unsignedInteger('IdDepartement');
            $table->foreign('CodeCategorie')->references('CodeCategorie')->on('Categorie')->onDelete('set null');
            $table->foreign('IdDepartement')->references('IdDepartement')->on('Departement')->onDelete('set null');
        });

        Schema::create('affectation', function (Blueprint $table) {
            $table->increments('IDaffectation');
            $table->date('DateDebut');
            $table->date('DateDepart');
            $table->unsignedInteger('CodePost');
            $table->unsignedInteger('CollaborateurID');
            $table->foreign('CodePost')->references('CodePost')->on('post')->onDelete('set null');
            $table->foreign('CollaborateurID')->references('id')->on('users')->onDelete('set null');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Attestation');
        Schema::dropIfExists('CompteBancaire');
        Schema::dropIfExists('Conge');
        Schema::dropIfExists('Salaire');
        /*
        Schema::dropIfExists('affectation');
        Schema::dropIfExists('post');
        Schema::dropIfExists('Categorie');
        Schema::dropIfExists('Departement');
        Schema::dropIfExists('Direction');
        Schema::dropIfExists('Site');
        */
    }
};
