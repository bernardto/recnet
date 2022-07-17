<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Recnet\Collecteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use phpDocumentor\Reflection\File;

class Conexion extends Controller
{
    //

    function index(Request $request)
    {
        $connexion = false;
        $zone = false;


        $coll = DB::table('collecteur')
            ->select("id_col",
                "identifiant  as matricule",
                "nom",
                "prenom",
                "sex",
                "numero",
                "email",
                "date_cre",
                "num_cni",
                "date_nai",
                "update_password"
            )
            ->where('identifiant', '=', request('matricule'))
            ->get();


        if (count($coll) > 0) {


            //ancien mot de passe
            $password = DB::table('collecteur')->select("password")->where("id_col", "=", $coll[0]->id_col)->get();

            $password = $password[0]->password;

            if ($coll[0]->update_password == 1) {
                //A modifier son mot de pass
                if (!Hash::check(request('password'), $password)) {

                    return response()->json(['valide' => false,
                        'zone' => false,
                        'data_login' => null,]);

                }
            } elseif ($password != request('password')) {
                return response()->json(['valide' => false,
                    'zone' => false,
                    'data_login' => null,]);

            }


            if ($coll[0]->sex = "F")
                $coll[0]->sex = 1;
            else
                $coll[0]->sex = 0;

            $collecteur = new Collecteur();
            $quartier = $collecteur->getQuartierDuCollecteur($coll[0]->id_col);


            //Liste des contribuable des quartiers

            $id_quartier = array();

            foreach ($quartier as $qt) {

                array_push($id_quartier, $qt->id_qt);
            }


            $activite = DB::table('activite')->select()->whereIn('id_qt', $id_quartier)->get();


            $id_contribuable = array();

            foreach ($activite as $item) {


                array_push($id_contribuable, $item->id_ct);
            }

            $id_contribuable = array_unique($id_contribuable);

            $contribuable = DB::table('contribuable')->select()->whereIn('id_ct', $id_contribuable)->get();
            $compteContriBle = DB::table('compte_contribuable')->select()->whereIn('id_ct', $id_contribuable)->get();


            foreach ($contribuable as $ct) {
                if ($ct->sex == "F")
                    $ct->sex = 0;
                else
                    $ct->sex = 1;
            }


            //$compte_contribuable = DB::table('compte_contribuable')->select()->whereIn('id_ct',$id_contribuable)->get();


            $compte_budgetaire = DB::table('compte_budget')->select()->get();

            $taxe = DB::table('taxe')->select()->get();


            $periode_taxe = DB::table("periode_taxe")->select()->get();


            $id_prd = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            $pr = 10;


            foreach ($taxe as $tx) {


                if ($tx->id_prd == 9) {

                    //création de la nouvelle periode
                    $periode_taxe->push(["id_prd" => $pr, "lib" => "Personnalisée", "nb_jour" => $tx->nb_jours]);
                    $tx->id_prd = $pr;
                    $pr++;


                }

            }


            $sous_taxe = DB::table('sous_taxe')->select()->get();

            $zone = DB::table('assignation_collecteur_zone')
                ->select(DB::raw("
                assignation_collecteur_zone.id_zn,
                assignation_collecteur_zone.date,
                zone.id_zn,
                zone.lib,
                zone.identifiant
                "
                ))
                ->distinct()
                ->join("zone", "zone.id_zn", "=", "assignation_collecteur_zone.id_zn")
                ->where("assignation_collecteur_zone.id_coll", "=", $coll[0]->id_col)
                ->where('assignation_collecteur_zone.actif', '=', 1)
                ->get();


            $data = [

                "compte_budgetaire" => $compte_budgetaire,
                "taxe" => $taxe,
                "sous_taxe" => $sous_taxe,
                "periode_taxe" => $periode_taxe,
                "zone" => $zone,
                "collecteur" => $coll,
                "quartier" => $quartier,
                "contribuable" => $contribuable,
                "activite" => $activite,
                "compte_contribuable" => $compteContriBle

            ];

            $a_quartier = count($quartier) > 0;


            return response()->json([
                'valide' => true,
                'quartier' => $a_quartier,
                'data_login' => $data,

            ]);

        }else{
            return response()->json(['valide' => false,
                'zone' => false,
                'data_login' => null,]);
        }


    }

//Permet de changer le mot de passe dans l'API
    function changerPassword(Request $request)
    {

        $user = DB::table('collecteur')->where('id_col', '=', request('id'))->select()->get();


        if (count($user) <= 0)
            return $this->RetourChangerPassword(true);

        $user = $user[0];


        //a déjà changé de mot de passe
        if ($user->update_password == 1) {

            return $this->RetourChangerPassword(true, false, null, true, false);

        }


        if ($user->password == request('anc_mp')) {

            //Mise à jour du mot de passe

            DB::table('collecteur')
                ->where('id_col', '=', request('id'))
                ->update(array('password' => Hash::make(request('password')), 'update_password' => 1));


            return $this->RetourChangerPassword(true, false, null, false, true);


            //L'ancien mot de passe ne correspond pas
        } else {


            return $this->RetourChangerPassword(true, true, null, false, false);
        }


    }

//Retourne les règles de validation du formualre
    public
    function regles_inscription_equipe()
    {

        return ['anc_mp' => 'required|min:6|max:34', 'password' => 'required|min:6|max:34|confirmed', 'password_confirmation' => 'required|min:6|max:34'];

    }

    public
    function message_inscription()
    {

        return ['anc_mp.required' => 'l\'ancien mot de passe est obligatoire',
            'password.required' => 'le nouveau mot de passe est obligatoire',
            'password_confirmation.required' => 'le champ confirmation mot de passe est obligatoire'

        ];

    }

//renommer les attributs afin de les afficher
    function attr()
    {


        return ['anc_mp' => 'Ancien mot de passe', 'password' => 'Nouveau mot de passe', 'password_confirmation' => 'Confirmation mot de passe'];
    }

    function RetourChangerPassword($success = false, $intern_err = true, $errors = null, $alredy_up = false, $update = false)
    {

        return response()
            ->json(array(
                'success' => $success,
                'interne_er' => $intern_err,
                'alredy_up' => $alredy_up,
                'update' => $update
            ));

    }


}
/*
 $tab =  json_decode(request('data'));
        //PROCESS VERNAL DU SCRUTIN ------------------------------------------------------------------------------------------------------------------------------

        $image = $request->file('file');
        $destinationPath = 'proces_verbal';



        //nom du fichier, susression de l'ancienne version en base de donnée // suspression de l'ancienne version en dure

        //id_scrutin_idBv.extension

        $nom_porcess_verbal =  $tab->id_scrutin .'BV'. $tab->res_bv->id_bv;

        $name = $nom_porcess_verbal .'.'. $image->getClientOriginalExtension();


        //suspression ancien fichier disk

        Storage::delete( public_path('/proces_verbal/'.$nom_porcess_verbal .'.'. $image->getClientOriginalExtension()) );

        //suspression en base de donnée

        DB::table('proces_verbal')->where('id_bv' ,'=', $tab->res_bv->id_bv)->where('id_scrutin' , '=', $tab->id_scrutin)->delete();


        //INSERTION


        //bd
        DB::table('proces_verbal')->insert(['id_scrutin' => $tab->id_scrutin ,  'id_bv' => $tab->res_bv->id_bv, 'img' => $name]);

        //disk
        $image->move(public_path($destinationPath), $name);


        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------


 */
