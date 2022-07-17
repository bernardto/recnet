<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use DateTime;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class Versement extends Controller
{
    //


    function verserRecette(Request $request)
    {

        try {
            DB::table("versement")->insert(["date" => now(), "id_regisseur" => auth()->guard("regisseur")->id(), "id_coll" => request('id_coll'), "montant" => request("montant")]);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            return response()->json(["success" => false]);
        }
    }

    function getMontantCalculeDate(Request $request)
    {

        $data = DB::select(DB::raw(
            "SELECT sum(payer_taxe.montant) AS montant from payer_taxe
               WHERE date LIKE '%" . request("date") . "%' AND id_coll = " . request("id_coll")));
        if ($data[0]->montant === null)
            $data[0]->montant = 0;
        return response()->json(["montant" => $data[0]->montant]);

    }

    function getMontantEntreDeuxDate(Request $request)
    {

        $data = DB::select(DB::raw(
            "select SUM(montant) AS montant from payer_taxe
                    WHERE  id_coll = " . request('id_coll') . " AND  date between '" . request("date_d") . "00:00:00' and '" . request("date_f") . " 23:59:59'
                    order by date DESC "));

        if ($data[0]->montant === null)
            $data[0]->montant = 0;

        return response()->json(["montant" => $data[0]->montant]);


    }


    function getHistoriqueVersementEntreDeuxDate(Request $request)
    {

        $data = DB::select(DB::raw(
            "select date, montant  from versement
                    WHERE  id_coll = " . request('id_coll') . " AND  date between '" . request("date_d") . "00:00:00' and '" . request("date_f") . " 23:59:59'
                    order by date DESC "));


        foreach ($data as $pay) {

            $date = new DateTime($pay->date);
            $pay->date = $date->format("d-m-Y H:i:s");
        }

        return response()->json(["data" => $data]);


    }


    function getHistoriqueVersementEtat(Request $request)
    {

        $data = DB::select(DB::raw(
            "select date, montant  from versement
                    WHERE  id_coll = " . request('id_coll') . " AND  date between '" . request("date_d") . "00:00:00' and '" . request("date_f") . " 23:59:59'
                    order by date DESC "));


        $select = "
            collecteur.photo,
            collecteur.nom,
            collecteur.prenom,
            collecteur.numero as contact,
            ";

        $date_d = $this->formatDateTime(request("date_d"), false);

        $date_f = $this->formatDateTime(request("date_f"), false);



        $collecteur = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                identifiant,
                CONCAT(nom," ", prenom ) as nom,
                photo,
                numero as contact

                '))->where('id_col', request("id_coll"))->get();

        if(count($collecteur) > 0)
            $collecteur = $collecteur[0];

        foreach ($data as $pay) {

            $req = "select count(*) as nb from payer_taxe
                    WHERE  id_coll = " . request('id_coll') . " AND  date between '" . $this->formatDateTimeMySQL($pay->date, false) . " 00:00:00' and '" .$this->formatDateTimeMySQL($pay->date, false). " 23:59:59'";



            $pay->nb_ct = DB::select(DB::raw($req));
            $date = new DateTime($pay->date);
            $pay->date = $date->format("d-m-Y H:i:s");
        }



       $impr =  new Imprimer();
       $date =  $impr->dateFr();


        return compact("data", "date","date_d", "date_f", "collecteur");

    }

    function  formatDateTime($date, $heure = true){
        $date_format = new DateTime($date);
        if($heure)
          return $date_format->format("d-m-Y H:i:s");
        else
            return $date_format->format("d-m-Y");
    }
    function  formatDateTimeMySQL($date, $heure = true){
        $date_format = new DateTime($date);
        if($heure)
            return $date_format->format("Y-m-d H:i:s");
        else
            return $date_format->format("Y-m-d");
    }
}
