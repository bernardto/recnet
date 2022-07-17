<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Recouvrement extends Controller
{
    //
    public const  METHODE_DE_TRI = [

        ["id" => 0 , "lib" => "TOUTS LES RESULTATS"],
        ["id" => 1 , "lib" => "QUARTIER"],
        /*["id" => 2 , "lib" => "ZONE"],*/
        ["id" => 3 ,  "lib" => "COLLECTEUR"]

    ];

    function  getMethodeTri(Request  $request){

        return response()->json(["data"=> self::METHODE_DE_TRI]);



    }

    function getDetailRecouvrement(Request  $request){





        $data ="";

        switch (request("main_tri")){
            case 0: //TOUS LES RESULTAT
                //on cherche la liste des collecteurs à cette date




                if(request("rapport") == 1) {
                    $data = DB::select(DB::raw("
                    SELECT  distinct(collecteur.id_col) AS id_col,
                             CONCAT(collecteur.nom,' ',collecteur.prenom) AS nom ,
                                     collecteur.identifiant as identifiant, collecteur.sex as sexe,
                                SUM(payer_taxe.montant) AS montant,
                                COUNT(DISTINCT payer_taxe.id_ct) AS nb_cont
                    FROM payer_taxe,collecteur

                    WHERE payer_taxe.date LIKE '%" . request("date_tri") . "%'

                    AND payer_taxe.id_coll = collecteur.id_col group by  collecteur.id_col"
                    ));
                }else{

                    $data = DB::select(DB::raw("
                   SELECT  distinct(contribuable.id_ct) AS id_ct,
                         CONCAT(contribuable.nom,' ',contribuable.prenom) AS nom ,
                                    contribuable.sex as sexe, contribuable.identifiant, contribuable.n_compte,

                            SUM(payer_taxe.montant) AS montant
                    FROM payer_taxe,contribuable
                    WHERE payer_taxe.date LIKE '%" . request("date_tri") . "%'
                    AND payer_taxe.id_ct= contribuable.id_ct group by  contribuable.id_ct"
                                        ));
                }


                break;
            case 1: //QUARTIER

                //QUARTIER (ETAT DU RECOUVREMENT DE CHAQUE COLLECTEUR)

                if(request("rapport") == 1) {

                    $data = DB::select(DB::raw("
                    SELECT  distinct(collecteur.id_col) AS id_col,
                             CONCAT(collecteur.nom,' ',collecteur.prenom) AS nom , collecteur.identifiant as identifiant, collecteur.sex as sexe,
                                SUM(payer_taxe.montant) AS montant,
                                COUNT(DISTINCT payer_taxe.id_ct) AS nb_cont
                    FROM payer_taxe,collecteur,activite
                    WHERE payer_taxe.date LIKE '%" . request("date_tri") . "%'
                    AND payer_taxe.id_coll = collecteur.id_col
                    AND activite.id_act = payer_taxe.id_actvite
                    AND activite.id_qt = ".request("id")." group by collecteur.id_col"
                    ));
                }else{

                    $data = DB::select(DB::raw(" SELECT  distinct(contribuable.id_ct) AS id_ct,
                         CONCAT(contribuable.nom,' ',contribuable.prenom) AS nom ,
                                    contribuable.sex as sexe, contribuable.identifiant, contribuable.n_compte,

                            SUM(payer_taxe.montant) AS montant
                    FROM payer_taxe,contribuable,activite
                    WHERE payer_taxe.date LIKE '%" . request("date_tri") . "%'
                    AND payer_taxe.id_ct= contribuable.id_ct
                     AND activite.id_act = payer_taxe.id_actvite
                    AND activite.id_qt = ".request("id")." group by contribuable.id_ct"
                    ));

                }

            break;
            case 2: //ZONE


                break;
            case 3: //COLLECTEUR

                //COLLECTEUR (LISTE DES CONTRIBUABLE DU COLLECTEUR A LA DATE)


                if(request("rapport") == 1) {

                    $data = DB::select(DB::raw(" SELECT contribuable.id_ct AS id_ct,
                                 CONCAT(contribuable.nom,' ',contribuable.prenom) AS nom , contribuable.sex as sexe, contribuable.identifiant, contribuable.n_compte,
                                payer_taxe.montant AS montant,
                                activite.lib AS lib_activite,
                                payer_taxe.date AS heure
                    FROM payer_taxe,contribuable,activite
                    WHERE payer_taxe.date LIKE '%" . request("date_tri") . "%'
                    AND payer_taxe.id_coll =  ".request("id")."
                    AND activite.id_act = payer_taxe.id_actvite"
                    ));
                }else{

                    $data = DB::select(DB::raw(" SELECT contribuable.id_ct AS id_ct,
                                 CONCAT(contribuable.nom,' ',contribuable.prenom) AS nom , contribuable.sex as sexe, contribuable.identifiant, contribuable.n_compte,
                                payer_taxe.montant AS montant,
                                activite.lib AS lib_activite,
                                payer_taxe.date AS heure
                    FROM payer_taxe,contribuable,activite
                    WHERE payer_taxe.date LIKE '%" . request("date_tri") . "%'
                    AND payer_taxe.id_coll =  ".request("id")."
                    AND activite.id_act = payer_taxe.id_actvite"
                    ));

                }

                break;

        }

        return response()->json(["data" =>$data]);

    }



    function getStatisque(Request  $request){
      //  $a = request("date_tri") . " main_tri". request("main_tri") . "option_tri " .request("option_tri");


         $request = request("date_tri");
          $HEURE = ["01","02","03","04","05",
                         "06","07","08","09","10",
                         "11","12","13","14","15",
                         "16","17","18","19","20","21","22",
                        "23","00"];

        $sql = "";
        $data_par_heure = array();
        $nb_collecteur = 0;
        $nb_contribuable = 0;
        $nb_activite = 0;
        $montant_total =0;

        //LIKE '%" . request('search') . "%'
        switch (request("main_tri")){
            case 0: //TOUS LES RES
                /**
                 * DATA PAR HEURE
                 */
                foreach ($HEURE as $h){
                    array_push($data_par_heure,
                        DB::select(DB::raw(
                            "SELECT sum(payer_taxe.montant) AS montant from payer_taxe
               WHERE DATE LIKE '%".request("date_tri") ." ".$h ."%' "
                        )));

                }

                /**
                 * DATA CONTRIBUABLE
                 */
                $nb_contribuable = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_ct) AS nb
                from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%'
                    "));

                /**
                 * ACTIVITE
                 */
                $nb_activite = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_actvite) AS nb
                from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%' "
                    ));

                $montant_total = DB::select(DB::raw(
                        "SELECT sum(payer_taxe.montant) AS montant  from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%'"));

                $nb_collecteur = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_coll) AS nb
                from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%'"));

                break;


            case 1: //QUARTIER

                /**
                 * DATA PAR HEURE
                 */
                foreach ($HEURE as $h){
                     array_push($data_par_heure,
                         DB::select(DB::raw(
                        "SELECT sum(payer_taxe.montant) AS montant from payer_taxe, quartier, activite
                WHERE DATE LIKE '%".request("date_tri") ." ".$h ."%' and quartier.id_qt = activite.id_qt AND activite.id_act = payer_taxe.id_actvite
                    AND quartier.id_qt = ".request("option_tri")["id_qt"]
                    )));

                }
                /**
                 * DATA COLLECTEUR
                 */
                $nb_collecteur = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_coll) AS nb
                from payer_taxe, quartier, activite
                WHERE DATE LIKE '%".request("date_tri") ."%' and quartier.id_qt = activite.id_qt AND activite.id_act = payer_taxe.id_actvite
                    AND quartier.id_qt = ".request("option_tri")["id_qt"]
                ));
                /**
                 * DATA CONTRIBUABLE
                 */
                $nb_contribuable = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_ct) AS nb
                from payer_taxe, quartier, activite
                WHERE DATE LIKE '%".request("date_tri") ."%'
                and quartier.id_qt = activite.id_qt AND activite.id_act = payer_taxe.id_actvite
                    AND quartier.id_qt = ".request("option_tri")["id_qt"]));
                /**
                 * ACTIVITE
                 */
                $nb_activite = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_actvite) AS nb
                from payer_taxe, quartier, activite
                WHERE DATE LIKE '%".request("date_tri") ."%' and quartier.id_qt = activite.id_qt AND activite.id_act = payer_taxe.id_actvite
                    AND quartier.id_qt = ".request("option_tri")["id_qt"]));

                $montant_total = DB::select(DB::raw(
                    "SELECT sum(payer_taxe.montant) AS montant  from payer_taxe, quartier,activite
                WHERE DATE LIKE '%".request("date_tri") ."%' and quartier.id_qt = activite.id_qt AND activite.id_act = payer_taxe.id_actvite
                    AND quartier.id_qt = ".request("option_tri")["id_qt"]));

                break;

            case 2: //ZONE
                break;
            case 3: //COLLECTEUR
                /**
                 * DATA PAR HEURE
                 */
                foreach ($HEURE as $h){
                    array_push($data_par_heure,
                        DB::select(DB::raw(
                            "SELECT sum(payer_taxe.montant) AS montant from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ." ".$h ."%'
                    AND payer_taxe.id_coll = ".request("option_tri")["id"]
                        )));

                }
                /**
                 * DATA CONTRIBUABLE
                 */
                $nb_contribuable = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_ct) AS nb
                from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%'
                    AND payer_taxe.id_coll = ".request("option_tri")["id"]));

                /**
                 * ACTIVITE
                 */
                $nb_activite = DB::select(DB::raw("SELECT count(DISTINCT payer_taxe.id_actvite) AS nb
                from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%'
                    AND payer_taxe.id_coll = ".request("option_tri")["id"]));

                $montant_total = DB::select(DB::raw(
                    "SELECT sum(payer_taxe.montant) AS montant  from payer_taxe
                WHERE DATE LIKE '%".request("date_tri") ."%' AND payer_taxe.id_coll = ".request("option_tri")["id"]));
                $nb_collecteur = array(["nb" => 1]);
                break;

        }

        return response()->json(
            ["data_heure" =>$data_par_heure,
             "nb_collecteur" => $nb_collecteur,
            "nb_contribuable" => $nb_contribuable,
            "nb_activite" => $nb_activite,
            "montant_total" => $montant_total]
        );







    }
    //Liste des dates disponible pour le recouvrement
    function getListeDate(Request  $request){

        $query = " CAST( DATE AS DATE))";
        $data = DB::table('payer_taxe')->select(DB::raw("DISTINCT cast( DATE AS DATE) as date"))->get();

        foreach ($data as $key => $val){

            if($val->date == '')
              unset($data[$key]);

        }



        $today = new DateTime(now());
        $id = 0;
        $data_ar = array();
        $today_disponible = false;

        $item_today = array();
       foreach ($data as $key => $item){




            $before_day = new DateTime($item->date);
            $interval = $today->diff($before_day);

            if($interval->d == 0){
                $item->lib = "Aujourd'hui  ( ".$before_day->format('d-m-Y').")";
                $today_disponible = true;
            }else if($interval->d == 1) {
                $item->lib = "Hier (".$before_day->format('d-m-Y').")";

            }else{
                $item->lib = $before_day->format('d-m-Y') ;

            }

            $item->id = $id;
            array_push($data_ar, $item);
            $id ++;

        }




        return response()->json([
            "data"=> $data_ar,
            "today_disponible" =>
            $today_disponible,
            "today" => $today_disponible ? null : ["date" => now()->format('Y-m-d'),
                "lib" => "Ajourd'hui", "id" => 2888 ] ]);
    }
}
