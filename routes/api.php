<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::post('/connexion_collecteur', 'API\Conexion@index');
Route::post('/changer_password', 'API\Conexion@changerPassword');
Route::post('/contribuable_ajout', 'API\Contribuable@ajout');
Route::post('/payer_taxe', 'API\Contribuable@PayerTaxe');
Route::post('/ajout_activite', 'API\Contribuable@AjoutActivite');
