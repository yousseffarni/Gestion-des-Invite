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
       Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('Nom',60);
            $table->string('Prenom',60);
            $table->string('email',191)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password',191);
            $table->rememberToken();
            $table->timestamps();
            $table->string('cin',60);
            $table->string('CNSS',200);
            $table->date('DateN');
            $table->string('LieuN',70);
            $table->enum('SituationF', ['Célibataire', 'Marié(e)','Divorcé(e)','Veuf']);
            $table->integer('NbEnfants');
            $table->string('Adresse',200);
            $table->text('PhotoProfile');
            $table->integer('PhoneNumber');
            $table->enum('Civilite', ['Monsieur', 'Madame','Mademoiselle']);
            $table->string('Nationalite',60);
            $table->boolean('Interimaire');
            $table->integer('SuperviseurID')->unique();
            $table->foreign('SuperviseurID')->references('id')->onDelete('set null');
            $table->enum('Role', ['Admin', 'AgentRH','Manager','Collaborateur']);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('users');
    }
};
