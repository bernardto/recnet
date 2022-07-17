<?php


namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Config;

class Quartier extends Controller
{
    //


    function rechercherQuartier(Request $request)
    {

        $data = DB::select(DB::raw("

        SELECT lib,
              id_qt,
               identifiant,
        FROM quartier
        WHERE   identifiant
                  LIKE '%" . request('search') . "%'
                   or lib LIKE '%" . request('search') . "%'

        ORDER BY nom LIMIT 0, 10
        "));

        return response()->json(["data" => $data]);

    }

    function validerReacfectation(Request $request)
    {


        foreach (request("id_qt") as $qt) {


            DB::table('assignation_quartier_zone')->where('id_qt', '=', $qt)->update(['actif' => 0, 'date_fin' => now()]);

            DB::table('assignation_quartier_zone')->insert([
                'id_qt' => $qt,
                'id_zn' => request("id_zn"),
                'date' => now(),
                'actif' => 1,
            ]);


        }
        return response()->json(['success' => true]);
    }

    function validerDesaffectionQuartierZone(Request $request){
        foreach (request('id_qt') as $id_qt) {




                DB::table('assignation_quartier_zone')
                    ->where('id_zn', '=', request("id_zn"))
                    ->where('id_qt', '=', $id_qt)->update(['actif' => 0, 'date_fin' => now()]);





        }
        return response()->json(['success' => true]);
    }
    function validerAffectationQuartierAuZone(Request $request)
    {


        foreach (request('id_qt') as $id_qt) {

            DB::table('assignation_quartier_zone')->where('id_qt', '=', $id_qt)->update(['actif' => 0]);


            DB::table('assignation_quartier_zone')->insert([
                'id_qt' => $id_qt,
                'id_zn' => request('id_zn'),
                'date' => now(),
                'actif' => 1,
            ]);


            // DB::table('quartier')->where('id_qt', '=', $id_qt)->update(['assignation_qt' => request('id_zn')]);

        }

        return response()->json(['success' => true]);

    }

    function getToutQuartierAffectation(Request $request)
    {


        $data = DB::table('quartier')
            ->select(['quartier.lib as lib', 'quartier.id_qt as id_qt', 'quartier.identifiant as identifiant'])
            ->orderBy('lib')

            ->get();




        return response()->json(['data' => $data]);


    }


    function getToutQuartierNonAssigne(Request $request)
    {

        $id_qt_ass = DB::table("assignation_quartier_zone")->select("id_qt")->where("actif", "=", 1)->get()->toArray();


        $arr = array();

        foreach ($id_qt_ass as $item) {
            array_push($arr, $item->id_qt);
        }


        $data = DB::table('quartier')
            ->select(['quartier.lib as nom', 'quartier.id_qt as id', 'quartier.identifiant as identifiant'])
            ->orderBy('lib')
            ->whereNotIn("id_qt", $arr)
            ->paginate(10);


        return response()->json(['data' => $data]);


        /* return response()->json(["data" =>  DB::table('assignation_quartier_zone')->select(DB::raw('
             assignation_quartier_zone.id_qt as id_qt,
             quartier.lib as lib,
             quartier.identifiant as identifiant

         '
         ))  ->where('quartier.actif', '','')
             ->join('quartier','quartier.id_qt','=', 'assignation_quartier_zone.id_qt')->orderBy('nom')->paginate(10)]);*/


    }


    function getToutQuartier(Request $request)
    {




        //request("trier_par"), request("val_tri")
        if(request("trier_par") == 3) {

            $data = DB::table('quartier')
                ->select(
                    DB::raw('quartier.lib as lib, quartier.id_qt as id_qt, quartier.identifiant as identifiant, zone.lib as zone'))
                ->join("assignation_quartier_zone", "assignation_quartier_zone.id_qt", "=", "quartier.id_qt")
                ->join("zone", "zone.id_zn", "=", "assignation_quartier_zone.id_zn")
                ->where("assignation_quartier_zone.actif", "=", 1)
                ->where("assignation_quartier_zone.id_zn", "=", request("val_tri"))
                ->distinct()
                ->orderBy('lib', 'asc')
                ->paginate(Config::get("website.config.pagignate"));
        }else{

            $data = DB::table('quartier')
                ->select(
                    DB::raw('quartier.lib as lib, quartier.id_qt as id_qt, quartier.identifiant as identifiant, zone.lib as zone, zone.id_zn as id_zone'))
                ->join("assignation_quartier_zone", "assignation_quartier_zone.id_qt", "=", "quartier.id_qt")
                ->join("zone", "zone.id_zn", "=", "assignation_quartier_zone.id_zn")
                ->where("assignation_quartier_zone.actif", "=", 1)
                ->distinct()
                ->orderBy('lib', 'asc')
                ->paginate(Config::get("website.config.pagignate"));

        }

        return response()->json(['data' => $data]);


    }


    function getQuartierDesZones(Request $request)
    {


        $arr = array();

        $id_qt_ass = DB::table("assignation_quartier_zone")->select("id_qt")->where("actif", "=", 1)
            ->where("id_zn", "=", request("id_zn"))->get()->toArray();

        foreach ($id_qt_ass as $item) {
            array_push($arr, $item->id_qt);
        }


        $arr = array_unique($arr);


        $data = DB::table('quartier')->select(['id_qt as id', 'lib as nom', 'identifiant'])->whereIn("id_qt", $arr)->get();
        return response()->json(['data' => $data]);

    }

    function getIdentifiant(Request $request)
    {

        $last_id = DB::table('quartier')
            ->select('id_qt')
            ->orderBy('id_qt', 'desc')
            ->skip(0)->take(1)
            ->get();

        if (count($last_id) > 0) {
            return response()->json(['identifiant' => $last_id[0]->id_qt + 1 . 'QT' . date('Y')[2] . '' . date('Y')[3]]);
        } else {

            return response()->json(['identifiant' => 1 . 'QT' . date('Y')[2] . '' . date('Y')[3]]);
        }
    }


    function ajoutQuartier(Request $request)
    {


        // return var_dump($arr);

        /*$data = json_decode(request('data'),true);*/


        $validator = Validator::make($request->all(), $this->regleAjout(), $this->message_inscription(), $this->attr());


        if ($validator->passes()) {


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);



            $id = DB::table('quartier')->insertGetId(
                [
                    'lib' => request('lib'),

                    'identifiant' => request('identifiant')

                ]
            );
            if(request("zone") > 0) {
                DB::table('assignation_quartier_zone')->where('id_qt', '=', $id)->update(['actif' => 0]);

                DB::table('assignation_quartier_zone')->insert([
                    'id_qt' => $id,
                    'id_zn' => request('zone'),
                    'date' => now(),
                    'actif' => 1,
                ]);
            }
            return response()->json(["success" => true]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }


    function modifierQuartier(Request $request)
    {

        // return var_dump($arr);


        $validator = Validator::make($request->all(), $this->regleModification(request("change_id")), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {

            if(request("up_zone")) {

                DB::table('assignation_quartier_zone')->where('id_qt', '=', request("id_qt"))->update(['actif' => 0]);

                DB::table('assignation_quartier_zone')->insert([
                    'id_qt' => request("id_qt"),
                    'id_zn' => request('zone'),
                    'date' => now(),
                    'actif' => 1,
                ]);
            }

            DB::table('quartier')->where("id_qt","=", request("id_qt"))->update(
                [
                    'lib' => request('lib'),

                    'identifiant' => request('identifiant')

                ]
            );
            return response()->json(["success" => true]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }


    public function message_inscription()
    {

        return ['identifiant.required' => 'le mot de passe est obligatoire', 'email.required' => 'L\'adresse email est obligatoire.',

        ];

    }

    function attr()
    {

        return [

            'lib' => 'Nom du quartier',
            'identifiant' => 'Identifiant',

        ];
    }

    function regleAjout()
    {

        return [

            'lib' => 'required|min:3|max:255',
            'zone' => 'nullable|integer',
            'identifiant' => 'required|min:5|max:50|unique:quartier',


        ];
    }

    function regleModification( $identifiant)
    {

        $a = [
            'lib' => 'required|min:3|max:255',
            'zone' => 'nullable|integer',

        ];
        if ($identifiant)
            $a = array_merge($a, ['identifiant' => 'required|min:5|max:50|unique:quartier']);
        else{
            $a = array_merge($a, ['identifiant' => 'required|min:5|max:50']);
        }
        return $a;


    }

    function AjourDhui()
    {

        $nom_jour_fr = array(
            "dimanche",
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi"
        );
        $mois_fr = array(
            "",
            "janvier",
            "février",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembre"
        );
        // on extrait la date du jour
        list($nom_jour, $jour, $mois, $annee) = explode('/', date("w/d/n/Y "));
        return $nom_jour_fr[$nom_jour] . ' ' . $jour . ' ' . $mois_fr[$mois] . ' ' . $annee . ' ' . date("H:i:s");

    }

    function getToutQuartierEtat(Request $request)
    {


///*  $data = DB::table('demande')
//            ->select('demande.id', 'agents.id as total',  'agents.nom as name', 'agents.post', 'agents.tel as contact', 'agents.email'
//                ,'demande.data'  , 'demande.statut' ,  'demande.mot_retour AS reponse' , 'demande.cause' , 'demande.date'
//            )
//            ->join('agents','agents.id','=', 'demande.id_agent')
//            ->orderBy('demande.date', 'desc')
//            ->paginate(10);
/// */

        //request("trier_par"), request("val_tri")
        if(request("trier_par") == 3) {

            $data = DB::table('quartier')
                ->select(
                    DB::raw('quartier.lib as lib,  quartier.identifiant as identifiant, zone.lib as zone'))
                ->join("assignation_quartier_zone", "assignation_quartier_zone.id_qt", "=", "quartier.id_qt")
                ->join("zone", "zone.id_zn", "=", "assignation_quartier_zone.id_zn")
                ->where("assignation_quartier_zone.actif", "=", 1)
                ->where("assignation_quartier_zone.id_zn", "=", request("val_tri"))
                ->distinct()
                ->orderBy('lib', 'asc')
                ->get();
        }else{

            $data = DB::table('quartier')
                ->select(
                    DB::raw('quartier.lib as lib,  quartier.identifiant as identifiant, zone.lib as zone'))
                ->join("assignation_quartier_zone", "assignation_quartier_zone.id_qt", "=", "quartier.id_qt")
                ->join("zone", "zone.id_zn", "=", "assignation_quartier_zone.id_zn")
                ->where("assignation_quartier_zone.actif", "=", 1)
                ->distinct()
                ->orderBy('lib', 'asc')
                ->get();

        }

        return $data;


    }


}
/*$dt = DB::table('zone')->select()->get();


        foreach ( $dt as $item){

            DB::table('zone')->where('id_zn', '=', $item->id_zn)->update(['code' => $item->id_zn.'QT'.date('Y')[2].''.date('Y')[3]]);
        }*/

