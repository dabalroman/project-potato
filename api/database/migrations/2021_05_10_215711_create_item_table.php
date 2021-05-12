<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('price');
            $table->integer('amount');
            $table->integer('state');
            $table->string('description')->nullable();
            $table->unsignedBigInteger('source');
            $table->unsignedBigInteger('category');
            $table->unsignedBigInteger('last_edit_by');
            $table->timestamps();

            $table->foreign('source')->references('id')->on('source');
            $table->foreign('category')->references('id')->on('category');
            $table->foreign('last_edit_by')->references('id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item');
    }
}
