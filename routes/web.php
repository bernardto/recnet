<?php


use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test2', function (){
    dd(Config::get("website.config.pagignate"));
});

//Route::get('/test/',"Recnet\Contribuable@seederR");
Route::get('/test/{id}',"Recnet\Collecteur@informerCollecteurParMail");

Route::get('/login', function () {
    return view('welcome');
})->middleware("non_auth_reg");


Route::middleware("est_auth_reg")->group(function () {


    /*
|--------------------------------------------------------------------------
| IMPRESSION
|--------------------------------------------------------------------------
*/

    Route::post('/logout', function () {
       \Illuminate\Support\Facades\Auth::guard("regisseur")->logout();
       return response()->json(["success" => true]);
    });

    Route::post('/contribuable_liste/',"Recnet\Imprimer@ListeContribuable");

    Route::post('/collecteur_liste/',"Recnet\Imprimer@ListeCollecteur");

    Route::post('/imprimerHistorique/',"Recnet\Imprimer@historiqueVersementCollecteur");

    Route::post('/liste_quartier/',"Recnet\Imprimer@listeQuartier");


    Route::post('/imprimer_liste_zone/',"Recnet\Imprimer@ListeZone");


    Route::post('/get_config/',"Parametre@getConfig");

    Route::get('/{any}', function () {
        return view('welcome');
    })->where('any', '.*');

});


/*
|--------------------------------------------------------------------------
| VERSEMENT
|--------------------------------------------------------------------------
*/

Route::post('/get_montant_calcule_date', 'Recnet\Versement@getMontantCalculeDate');
Route::post('/valider_versement_recette', 'Recnet\Versement@verserRecette');
Route::post('/get_montant_recette_intervalle', 'Recnet\Versement@getMontantEntreDeuxDate');
Route::post('/get_historique_versement_intervalle', 'Recnet\Versement@getHistoriqueVersementEntreDeuxDate');


/*
|--------------------------------------------------------------------------
| RECOUVREMENT
|--------------------------------------------------------------------------
*/

Route::post('/get_methode_de_tri', 'Recnet\Recouvrement@getMethodeTri');
Route::post('/get_statistique_recouvrement', 'Recnet\Recouvrement@getStatisque');
Route::post('/get_date_de_recouvrement', 'Recnet\Recouvrement@getListeDate');


/*
|--------------------------------------------------------------------------
| Contribuable
|--------------------------------------------------------------------------
*/

Route::post('/get_liste_contribuable', 'Recnet\Contribuable@getListeContribuable');
Route::post('/get_data_creation_contribuable', 'Recnet\Contribuable@getDataCreationContribuable');
Route::post('/get_data_du_compteb', 'Recnet\Contribuable@getDataDuCompteb');


Route::post('/payer_taxe', 'Recnet\Contribuable@payerTaxe');


Route::post('/get_info_activite', 'Recnet\Contribuable@getInfoActivite');
Route::post('/historique_versement', 'Recnet\Contribuable@historiqueVersement');

Route::post('/ajout_activite', 'Recnet\Contribuable@ajouterActivite');

Route::post('/modifier_contribuable', 'Recnet\Contribuable@modifierContribuable');

Route::post('/ajout_contribuable', 'Recnet\Contribuable@ajoutContribuable');
Route::post('/get_matricule', 'Recnet\Contribuable@getMatricule');
Route::post('/get_contribuable_nom_id', 'Recnet\Contribuable@getContribuableIdNom');
Route::post('/get_info_coll', 'Recnet\Contribuable@getInfoColl');
Route::post('/rechercher_contribuable', 'Recnet\Contribuable@rechercherContribuable');


Route::post('/get_contribuable_du_quartier', 'Recnet\Contribuable@getContribuableDuQuartier');


/*
|--------------------------------------------------------------------------
| Collecteur
|--------------------------------------------------------------------------
*/


Route::post('/get_tout_collecteur', 'Recnet\Collecteur@getListeCollecteur');
Route::post('/liste_collecteur_nom_mat_id', 'Recnet\Collecteur@listeCollecteurNomMatId');

Route::post('/ajout_collecteur', 'Recnet\Collecteur@ajoutCollecteur');
Route::post('/get_matricule', 'Recnet\Collecteur@getMatricule');
Route::post('/modifier_collecteur', 'Recnet\Collecteur@modifierCollecteur');
Route::post('/get_collecteur_nom_id', 'Recnet\Collecteur@getCollecteurIdNom');
Route::post('/get_info_coll', 'Recnet\Collecteur@getInfoColl');
Route::post('/rechercher_collecteur', 'Recnet\Collecteur@rechercherCollecteur');


Route::post('/get_collecteur_du_quartier', 'Recnet\Collecteur@getCollecteurDuQuartier');

//Quartier
Route::post('/valider_reaffection_collecteur_quartier', 'Recnet\Collecteur@validerReaffectionCollecteurQuartier');
Route::post('/valider_desaffection_collecteur_quartier', 'Recnet\Collecteur@validerDesaffectionCollecteurQuartier');
Route::post('/valider_affection_collecteur_quartier', 'Recnet\Collecteur@validerAffectionCollecteurQuartier');
Route::post('/get_coll_non_ass_quartier', 'Recnet\Collecteur@getCollNonAfecQuartier');


//Zone


Route::post('/get_coll_non_ass_zone', 'Recnet\Collecteur@getCollNonAfecZone');


Route::post('/get_collecteur_zone', 'Recnet\Collecteur@getCollecteurZone');
Route::post('/valider_reaffection_collecteur_zone', 'Recnet\Collecteur@validerReaffectionCollecteurZone');
Route::post('/valider_desaffection_collecteur_zone', 'Recnet\Collecteur@validerDesaffectionCollecteurZone');
Route::post('/valider_affection_collecteur_zone', 'Recnet\Collecteur@validerAffectionCollecteurZone');


/*
|--------------------------------------------------------------------------
| REGISSEUR
|--------------------------------------------------------------------------
*/
Route::post('/reg_get_info', 'Recnet\Regisseur@getInfoCompte');
Route::post('/reg_modification', 'Recnet\Regisseur@editRegisseur');
Route::post('/reg_connexion', 'Recnet\Regisseur@connexion');
Route::post('/update_password', 'Recnet\Regisseur@updatePassword');
Route::post('/reg_is_auth', function () {
    //auth()->guard("regisseur")->logout();
    return response()->json(['success' => auth()->guard("regisseur")->check()]);
});


/*
|--------------------------------------------------------------------------
| Superviseur
|--------------------------------------------------------------------------
*/
Route::post('/get_tout_superviseur', 'Recnet\Collecteur@getToutSuperviseur');

Route::post('/get_matricule_superviseur', 'Recnet\Collecteur@getMatriculeSuperviseur');
Route::post('/get_info_sup', 'Recnet\Collecteur@getInfoSuper');
Route::post('/rechercher_superviseur', 'Recnet\Collecteur@rechercherSuperviseur');


Route::post('/get_super_non_ass_zone', 'Recnet\Collecteur@getSuperNonAfecZone');

Route::post('/get_superviseur_zone', 'Recnet\Collecteur@getSuperviseurZone');
Route::post('/valider_reaffection_superviseur_zone', 'Recnet\Collecteur@validerReaffectionSuperviseurZone');
Route::post('/valider_desaffection_superviseur_zone', 'Recnet\Collecteur@validerDesaffectionSuperviseurZone');
Route::post('/valider_affection_superviseur_zone', 'Recnet\Collecteur@validerAffectionSuperviseurZone');

/*
|--------------------------------------------------------------------------
| Quartier
|--------------------------------------------------------------------------
*/

Route::post('/get_tout_quartier', 'Recnet\Quartier@getToutQuartier');
Route::post('/get_identifiant_quartier', 'Recnet\Quartier@getIdentifiant');
Route::post('/ajout_quartier', 'Recnet\Quartier@ajoutQuartier');
Route::post('/modifier_quartier', 'Recnet\Quartier@modifierQuartier');
Route::post('/get_quartier_des_zones', 'Recnet\Quartier@getQuartierDesZones');
Route::post('/get_tout_quartier_aff', 'Recnet\Quartier@getToutQuartierAffectation');
Route::post('/get_tout_quartier_non_ass', 'Recnet\Quartier@getToutQuartierNonAssigne');
Route::post('/rechercher_quartier', 'Recnet\Quartier@rechercherQuartier');
Route::post('/get_quartier_zone', 'Recnet\Quartier@getQuartierDesZones');


Route::post('/valider_affection_quartier_zone', 'Recnet\Quartier@validerAffectationQuartierAuZone');
Route::post('/valider_reaffection_quartier_zone', 'Recnet\Quartier@validerReacfectation');
Route::post('/valider_desaffection_quartier_zone', 'Recnet\Quartier@validerDesaffectionQuartierZone');


/*
|--------------------------------------------------------------------------
| Zones
|--------------------------------------------------------------------------
*/

Route::post('/get_tout_zone', 'Recnet\Zone@getToutZone');
Route::post('/get_page_zone', 'Recnet\Zone@getToutZonePage');
Route::post('/get_identifiant_zone', 'Recnet\Zone@getIdentifiant');
Route::post('/ajout_zone', 'Recnet\Zone@ajoutZone');
Route::post('/get_quartler_de_la_zone', 'Recnet\Zone@getZoneQuartier');


/*
|--------------------------------------------------------------------------
| Compte Budgetaire
|--------------------------------------------------------------------------
*/

Route::post('/get_tout_compte', 'Recnet\CompteBudgetaire@getToutCompte');

Route::post('/get_page_compte', 'Recnet\CompteBudgetaire@getToutComptePage');
Route::post('/get_identifiant_compte', 'Recnet\CompteBudgetaire@getIdentifiant');
Route::post('/ajout_compte', 'Recnet\CompteBudgetaire@ajoutCompte');

Route::post('/modifier_compte', 'Recnet\CompteBudgetaire@modifierCompte');


/*
|--------------------------------------------------------------------------
| TAXE
|--------------------------------------------------------------------------
*/

Route::post('/get_periode_taxe', 'Recnet\Taxe@getListePeriode');
Route::post('/get_compte_budget', 'Recnet\Taxe@getToutCompteBudget');
Route::post('/ajouter_taxe', 'Recnet\Taxe@ajouterTaxe');
Route::post('/modifier_taxe', 'Recnet\Taxe@modifierTaxe');
Route::post('/get_taxe', 'Recnet\Taxe@getTaxe');
Route::post('/delete_taxe', 'Recnet\Taxe@deleteTaxe');

