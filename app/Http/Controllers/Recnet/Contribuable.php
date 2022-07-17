<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use DateInterval;
use DateTime;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Image;

class Contribuable extends Controller
{
    //
    const  DEPART_COMPTE_CONTRIBUABLE = 1458129;

    /**
     * Contribuable constructor.
     */
    public function __construct()
    {

    }


    function payerTaxe(Request $request)
    {
        try {

            $activite = DB::table("activite")->select()->where("id_act", "=", request("id_act"))->get();
            $activite = $activite[0];
            $new_date = $this->ajouterDateActivite(request("id_act"));

            DB::table("payer_taxe")->insert([

                "date" => now(),
                "id_ct" => $activite->id_ct,
                "montant" => $activite->montant_cal,
                "id_actvite" => request("id_act"),
                "regiseur" => auth()->guard("regisseur")->id()

            ]);

            DB::table('activite')->where("id_act", "=", request("id_act"))->update(["date_pay" => $new_date]);

            $activite = DB::table("activite")->select()->where("id_act", "=", request("id_act"))->get();
            $activite = $activite[0];
            $activite->info_act = $this->getInfoActivite($activite->id_taxe, $activite->id_qt);


            $date_pay = new DateTime($activite->date_pay);
            $date_pay->format('Y-m-d');

            $maintenant = date("Y-m-d");
            $maintenant = new DateTime($maintenant);


            $date_diff = $maintenant->diff($date_pay)->format("%r%a");

            $activite->date_pay_jr = (int)$date_diff;


            return response()->json(["activite" => $activite, "success" => true]);

        } catch (\Exception $e) {
            return response()->json(["new_date" => "", "success" => false]);
        }

    }

    function ajouterActivite(Request $request)
    {

        $data = json_decode(request('data'), true);


        $validator = Validator::make($data, $this->regleAjoutActivite(), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {


            $data = json_decode(request('data'));


            $date_pay = $this->calculerDate($data->id_taxe);

            $id_activite = DB::table('activite')->insertGetId([
                "adresse" => $data->adress_act,
                "descr_act" => $data->desc_act,
                "id_ct" => $data->id_contribuable,
                "id_qt" => $data->id_qt,
                "id_taxe" => $data->id_taxe,
                "lib" => $data->nom_act,
                "nb_assiete" => $data->nb_ass,
                "montant_cal" => (int)$data->montant_cal,
                "montant_sai" => "",
                "date_pay" => $date_pay,


            ]);

            $acti = DB::table("activite")->select()->where("id_act", "=", $id_activite)->get();

            $acti = $acti[0];
            $acti->info_act = $this->getInfoActivite($acti->id_taxe, $acti->id_qt);


            return response()->json(['success' => true, "activite" => $acti]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }

    }

    function historiqueVersement(Request $request)
    {

        $data = DB::table('payer_taxe')->select(["date", "montant"])
            ->where("id_actvite", "=", request('id_act'))
            ->orderBy("date")
            ->get();


        $montant_total = DB::table("payer_taxe")->select(DB::raw("SUM(montant) as montant "))->where("id_actvite", "=", request('id_act'))->get();

        $montant_total = $montant_total[0];
        foreach ($data as $pay) {

            $date = new DateTime($pay->date);
            $pay->date = $date->format("d-m-Y H:i:s");
        }
        return response()->json(["data" => $data, "montant_total" => $montant_total]);
    }

    function ajoutContribuable(Request $request)
    {

        // return var_dump($arr);

        $data = json_decode(request('data'), true);


        $validator = Validator::make($data, $this->regleAjout(), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {


            $data = json_decode(request('data'));


            $id_contribuable = DB::table('contribuable')->insertGetId([
                "date" => $data->date_naissance,
                "email" => $data->email,
                "nationalite" => $data->nationalite,
                "nom" => $data->nom,
                "num_cni" => $data->num_cni,
                "numero" => $data->numero,
                "prenom" => $data->prenom,
                "sex" => $data->genre,
                "identifiant" => $data->identifiant,
                "date_cre" => now()
            ]);


            $date_pay = $this->calculerDate($data->id_taxe);

            $id_activite = DB::table('activite')->insertGetId([
                "adresse" => $data->adress_act,
                "descr_act" => $data->desc_act,
                "id_ct" => $id_contribuable,
                "id_qt" => $data->id_qt,
                "id_taxe" => $data->id_taxe,
                "lib" => $data->nom_act,
                "nb_assiete" => $data->nb_ass,
                "montant_cal" => (int)$data->montant_cal,
                "montant_sai" => "",
                "date_pay" => $date_pay,


            ]);

            /**
             * ON RECHERCHE LE DERNIER COMPTE CONTRIBUABLE ET ON INCREMENT
             */
            $last_id_c = DB::table('compte_contribuable')
                ->select('id')
                ->orderBy('id', 'desc')
                ->skip(0)->take(1)
                ->get();

            $n_compte = self::DEPART_COMPTE_CONTRIBUABLE;

            if (count($last_id_c)) {
                $n_compte = self::DEPART_COMPTE_CONTRIBUABLE + $last_id_c[0]->id;

            }

            $id_compte_contribuable = DB::table('compte_contribuable')
                ->insertGetId(["n_compte" => $n_compte, "id_ct" => $id_contribuable]);


            $compteContribuable = DB::table('compte_contribuable')
                ->select()
                ->where('id', '=', $id_compte_contribuable)
                ->get();


            DB::table('log_contribuable')->insertGetId(['lib' => "Déclaration du contribuable", "date" => now(), "id_ct" => $id_contribuable]);


            DB::table('contribuable')->where('id_ct', '=', $id_contribuable)
                ->update(['n_compte' => $n_compte]);


            /**
             * PHOTO DU CONTRIBUABLE
             */


            $photo = "user";
            if ($request->hasFile("fichier")) {
                $image = request('fichier');
                $nom_image = $id_contribuable . '_CT_';
                $nom_image = $nom_image . '.' . $image->getClientOriginalExtension();

                //suspression ancien fichier disk

                $nom_ancien_image = DB::table('contribuable')->select("photo")->where("id_ct", "=", $id_contribuable)->get();

                $nom_ancien_image = $nom_ancien_image[0]->photo;

                if ($nom_ancien_image != "user")
                    Storage::delete(public_path('image/contribuable/' . $nom_ancien_image));


                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(48, 48);
                $image_resize->save(public_path('image/contribuable/' .$id_contribuable. "_" . $nom_image));



                //Mise à jour photo
                DB::table('contribuable')->where('id_ct', '=', $id_contribuable)->update(['photo' => $nom_image]);


                $photo = DB::table('contribuable')->select("photo")->where('id_ct', '=', $id_contribuable)->get();
                $photo = $photo[0]->photo;
            }


            return response()->json(['success' => true, "identifiant" => $data->identifiant, "photo" => $photo, "compteContribuable" => $compteContribuable[0], 'id_ct' => $id_contribuable, "id_act" => $id_activite,
                "date_pay" => $date_pay]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }

    }

    function getMatricule()
    {

        $last_id = DB::table('contribuable')
            ->select('id_ct')
            ->orderBy('id_ct', 'desc')
            ->skip(0)->take(1)
            ->get();

        if (count($last_id) > 0) {
            return $last_id[0]->id_ct + 1 . 'CT' . date('Y')[2] . '' . date('Y')[3];
        } else {

            return 1 . 'CT' . date('Y')[2] . '' . date('Y')[3];
        }
    }

    function seederR(Request $request)
    {

        for ($i = 0; $i < 120; $i++) {
            $id_contribuable = DB::table('contribuable')->insertGetId([
                "date" => date("d-m-Y"),
                "email" => Str::random(10) . '@gmail.com',
                "nationalite" => "IVOIRIENNE",
                "nom" => Str::random(7),
                "photo" => "user",
                "num_cni" => "4444444",
                "numero" => "0778803638",
                "prenom" => Str::random(15),
                "sex" => "F",
                "identifiant" => $this->getMatricule(),
                "date_cre" => now()
            ]);


            $id_qt = [1, 4, 15, 16];
            $id_taxe  = 0;
            do{
                $id_taxe = random_int(22, 70);
               $taxe =  DB::table("taxe")->select("id_tax")->where("id_tax","=", $id_taxe)->get();
            }while(count($taxe) <= 0 );

            $date_pay = $this->calculerDate($id_taxe);

            $id_activite = DB::table('activite')->insertGetId([
                "adresse" => Str::random(5),
                "descr_act" => "",
                "id_ct" => $id_contribuable,
                "id_qt" => $id_qt [random_int(0, 3)],
                "id_taxe" => $id_taxe,
                "lib" => "VENTE DE " . Str::random(5),
                "nb_assiete" => 2,
                "montant_cal" => (int)12000,
                "montant_sai" => "",
                "date_pay" => $date_pay,


            ]);

            /**
             * ON RECHERCHE LE DERNIER COMPTE CONTRIBUABLE ET ON INCREMENT
             */
            $last_id_c = DB::table('compte_contribuable')
                ->select('id')
                ->orderBy('id', 'desc')
                ->skip(0)->take(1)
                ->get();


            $n_compte = self::DEPART_COMPTE_CONTRIBUABLE;

            if (count($last_id_c)) {
                $n_compte = self::DEPART_COMPTE_CONTRIBUABLE + $last_id_c[0]->id;

            }

            $id_compte_contribuable = DB::table('compte_contribuable')
                ->insertGetId(["n_compte" => $n_compte, "id_ct" => $id_contribuable]);


            DB::table('contribuable')->where('id_ct', '=', $id_contribuable)
                ->update(['n_compte' => $n_compte]);


        }
        return "0";
    }

    function modifierContribuable(Request $request)
    {


        $data = json_decode(request('data'), true);
        $validator = Validator::make($data, $this->regleModification($data['up_email'], $data['up_identifiant']), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {


            $data = json_decode(request('data'), false);

            DB::table('contribuable')->where('id_ct', "=", $data->id)->update(
                [

                    "date" => $data->date_naissance,
                    "email" => $data->email,
                    "nationalite" => $data->nationalite,
                    "nom" => $data->nom,
                    "num_cni" => $data->num_cni,
                    "numero" => $data->numero,
                    "prenom" => $data->prenom,
                    "sex" => $data->genre,
                    "identifiant" => $data->identifiant,

                ]
            );

            DB::table('activite')->where('id_act', '=', $data->id_act)->update([
                "adresse" => $data->adress_act,
                "descr_act" => $data->desc_act,
                "lib" => $data->nom_act,
                "montant_cal" => (int)$data->montant_cal,
                "nb_assiete" => $data->nb_ass,
            ]);

            /**
             * PHOTO DU CONTRIBUABLE
             */
            if ($request->hasFile("fichier")) {

                $image = request('fichier');
                $nom_image = $data->id . '_CT_';
                $nom_image = $nom_image . '.' . $image->getClientOriginalExtension();

                //suspression ancien fichier disk

                $nom_ancien_image = DB::table('contribuable')->select("photo")->where("id_ct", "=", $data->id)->get();

                $nom_ancien_image = $nom_ancien_image[0]->photo;

                if ($nom_ancien_image != "user")
                    Storage::delete(public_path('/image/contribuable/' . $nom_ancien_image));


                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(48, 48);
                $image_resize->save(public_path('image/contribuable/' .$data->id . "_" . $nom_image));


                //Mise à jour photo
                DB::table('contribuable')->where('id_ct', '=', $data->id)->update(['photo' => $nom_image]);


                $photo = DB::table('contribuable')->select("photo")->where('id_ct', '=', $data->id)->get();
                $photo = $photo[0]->photo;
                return response()->json(['success' => true, "photo" => $photo]);
            }

            return response()->json(['success' => true]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }


    function getDataDuCompteb(Request $request)
    {

        $taxe = DB::table('taxe')->select()->where("id_cp_bd", "=", request("id_cb"))->get();

        return response()->json(["taxe" => $taxe]);


    }

    function getDataCreationContribuable(Request $request)
    {

        //Récupération des compteBudgétaire

        $compte_bud = DB::table('compte_budget')->select(DB::raw('CONCAT(val,": ", lib ) as lib, id_cp_bd as id'))->get();

        //Récupération des Quartiers


        $quartier = DB::table('quartier')
            ->select(['quartier.lib as lib', 'quartier.id_qt as id_qt'])
            ->orderBy('lib')
            ->get();


        //Récupération d'un nouveau matribuable


        $last_id = DB::table('contribuable')
            ->select('id_ct')
            ->orderBy('id_ct', 'desc')
            ->skip(0)->take(1)
            ->get();

        $matricule = "";
        if (count($last_id) > 0) {
            $matricule = $last_id[0]->id_ct + 1 . 'CT' . date('Y')[2] . '' . date('Y')[3];
        } else {

            $matricule = 1 . 'CT' . date('Y')[2] . '' . date('Y')[3];
        }

        return response()->json([
            "compteB" => $compte_bud,
            "quartier" => $quartier,
            "matricule" => $matricule,
            "periode" => DB::table("periode_taxe")->select(["id_prd as id", "lib"])->get()
        ]);
    }

    function getInfoActivite($id_taxe, $id_qt)
    {

        $lib_qt = DB::table('quartier')->select('lib')->where('id_qt', '=', $id_qt)->get();
        $taxe = DB::table('taxe')->select()->where('id_tax', '=', $id_taxe)->get();


        $lib_compte = DB::table('compte_budget')->select(['lib', 'val'])->where('id_cp_bd', '=', $taxe[0]->id_cp_bd)->get();
        $lib_periode = DB::table('periode_taxe')->select('lib')->where('id_prd', '=', $taxe[0]->id_prd)->get();
        $lib_periode = $lib_periode[0];

        return ['lib_qt' => $lib_qt[0]->lib, 'taxe' => $taxe[0], 'lib_compte' => $lib_compte[0]->val . ' : ' . $lib_compte[0]->lib, 'lib_prd' => $lib_periode];



    }



    function getListeContribuable(Request $request)
    {

        $select = '

            contribuable.id_ct as id,
            contribuable.nom,
            contribuable.identifiant as identifiant,
           contribuable.prenom as prenom,
            contribuable.sex as genre,
            contribuable.numero as numero,
            contribuable.photo as photo,
            contribuable.email as email,
            contribuable.date as date_nai,
            contribuable.date_cre as date_cre,
            contribuable.num_cni as num_cni,
            contribuable.n_compte as n_compte,
            contribuable.nationalite as nationalite';

        $data = $this->getDataFromTri($select, request("trier_par"), request("val_tri"));

        foreach ($data as $item) {

            $item->activite = DB::table("activite")->select()->where('id_ct', "=", $item->id)->get();


            foreach ($item->activite as $act) {
                $date_pay = new DateTime($act->date_pay);
                $date_pay->format('Y-m-d');

                $maintenant = date("Y-m-d");
                $maintenant = new DateTime($maintenant);


                $date_diff = $maintenant->diff($date_pay)->format("%r%a");

                $act->date_pay_jr = (int)$date_diff;

                $act->info_act = $this->getInfoActivite($act->id_taxe, $act->id_qt);
            }


        }


        return response()->json(['data' => $data]);
    }

    function calculerDate($id)
    {


        $nb_jour = DB::table('taxe')
            ->select(DB::raw("periode_taxe.nb_jour as jr"))
            ->join("periode_taxe", "periode_taxe.id_prd", "=", "taxe.id_prd")
            ->where("id_tax", "=", $id)
            ->get();


        if (count($nb_jour) > 0)
            $nb_jour = $nb_jour[0]->jr;
        else
            $nb_jour = 0;

        try {
            $date = new DateTime(date("j-n-Y"));
            if ($nb_jour > 1)
                $date->add(new DateInterval('P' . $nb_jour . 'D'));
            else
                $date = new DateTime(date("j-n-Y"));

        } catch (\Exception $e) {
            return 0;
        }

        return $date->format('d-m-Y');

    }

    function ajouterDateActivite($id_act)
    {
        $id_taxe = DB::table("activite")->select(['id_taxe'])->where("id_act", "=", $id_act)->get();

        $nb_jour = DB::table('taxe')
            ->select(DB::raw("periode_taxe.nb_jour as jr"))
            ->join("periode_taxe", "periode_taxe.id_prd", "=", "taxe.id_prd")
            ->where("id_tax", "=", $id_taxe[0]->id_taxe)
            ->get();


        if (count($nb_jour) > 0)
            $nb_jour = $nb_jour[0]->jr;
        else
            $nb_jour = 0;

        try {
            $date = DB::table("activite")->select(['date_pay'])->where("id_act", "=", $id_act)->get();
            $date = new DateTime($date[0]->date_pay);


            $date->add(new DateInterval('P' . $nb_jour . 'D'));


        } catch (\Exception $e) {
            $date = new DateTime(date("j-n-Y"));
        }

        return $date->format('d-m-Y');

    }

    function regleAjout()
    {

        return [

            "nom" => "required|min:3|max:50",
            "nationalite" => "min:3|max:50",
            "prenom" => "required|min:3|max:255",
            'email' => 'min:5|max:255|email|unique:contribuable',
            'date_naissance' => 'required|min:5|max:50',
            'genre' => 'required|max:10',
            "nom_act" => "required|min:3|max:50",
            "desc_act" => "min:3|max:500",
            "adress_act" => "min:3|max:200",
            "nb_ass" => "required|integer",
            "montant_cal" => "required",
            'num_cni' => 'min:10|max:20',
            'numero' => 'min:8|max:15',
            'identifiant' => 'required|min:5|max:20|unique:contribuable',


        ];
    }

    public function message_inscription()
    {

        return [

        ];

    }

    function regleModification($email, $identifiant)
    {

        $a = [

            "nom" => "required|min:3|max:50",
            "nationalite" => "min:3|max:50",
            "prenom" => "required|min:3|max:255",
            'date_naissance' => 'required|min:5|max:50',
            'genre' => 'required|max:10',
            "nom_act" => "required|min:3|max:50",
            "desc_act" => "min:3|max:500",
            "adress_act" => "min:3|max:200",
            "nb_ass" => "required|integer",
            "montant_cal" => "required",
            'num_cni' => 'min:10|max:20',
            'numero' => 'min:8|max:15',
            'identifiant' => 'required|min:5|max:20|unique:contribuable',


        ];
        if ($email)
            $a = array_merge($a, ['email' => 'required|min:5|max:255|email|unique:contribuable',
            ]);

        else
            $a = array_merge($a, ['email' => 'required|min:5|max:255|email',
            ]);

        if ($identifiant)
            $a = array_merge($a, ['identifiant' => 'required|min:5|max:50|unique:contribuable',
            ]);
        else
            $a = array_merge($a, ['identifiant' => 'required|min:5|max:50',
            ]);

        return $a;


    }

    function attr()
    {

        return [

            "nom" => "Nom",
            "prenom" => "Prenom",
            'email' => 'Email',
            'nationalite' => 'Nationnalité',
            'date_naissance' => 'Date de Naissance',
            'genre' => 'genre',
            "nom_act" => "Nom de l'activité",
            "desc_act" => "Description de l'activité",
            "adress_act" => "Adresse",
            "nb_ass" => "Assiete",
            "montant_cal" => "Montant calculé",
            'num_cni' => 'Numéro de la piece',
            'numero' => 'Numéro de téléphone',
            'identifiant' => 'Identifiant',


        ];
    }

    private function regleAjoutActivite()
    {

        return [

            "nom_act" => "required|min:3|max:50",
            "desc_act" => "min:3|max:500",
            "adress_act" => "min:3|max:200",
            "nb_ass" => "required|integer",
            "montant_cal" => "required",
            "id_contribuable" => "required",
            "id_taxe" => "required",

        ];

    }

    public function getDataFromTri($select, $trier_par,  $val_tri)
    {


        $data = "";

        switch ($trier_par){
            case 1:

                $data =  DB::table('contribuable')->select(DB::raw($select
                ))
                    ->orderBy('nom')
                    ->paginate(Config::get("website.config.pagignate"));
                break;
            case 2://QUARTIER

                $data =     DB::table('contribuable')->select(DB::raw($select
                ))
                    ->join('activite','activite.id_ct','=', 'contribuable.id_ct')
                    ->where("activite.id_qt", "=", $val_tri)
                    ->orderBy('contribuable.nom')
                    ->distinct()
                    ->paginate(Config::get("website.config.pagignate"));
                break;


            case 3:
                $data =  DB::table('contribuable')->select(DB::raw($select
                ))
                    ->join('activite','activite.id_ct','=', 'contribuable.id_ct')
                    ->join('quartier','quartier.id_qt','=', 'activite.id_qt')
                    ->join('assignation_quartier_zone','quartier.id_qt','=', 'assignation_quartier_zone.id_qt')
                    ->where("assignation_quartier_zone.id_zn", "=", $val_tri)
                    ->where("assignation_quartier_zone.actif", "=", 1)
                    ->orderBy('contribuable.nom')
                    ->distinct()
                    ->paginate(Config::get("website.config.pagignate"));
                break;
            case 4:
                $data =     DB::table('contribuable')->select(DB::raw($select
                ))
                    ->join('activite','activite.id_ct','=', 'contribuable.id_ct')
                    ->join('taxe','taxe.id_tax','=', 'activite.id_taxe')
                    ->where("taxe.id_cp_bd", "=", $val_tri)
                    ->orderBy('contribuable.nom')
                    ->distinct()
                    ->paginate(Config::get("website.config.pagignate"));
                break;

        }


            return $data;



    }

    public function getDataFromTriEtat($select, $trier_par,  $val_tri)
    {


        $data = "";

        switch ($trier_par){
            case 1:

                $data =  DB::table('contribuable')->select(DB::raw($select
                ))
                    ->orderBy('nom')
                    ->get();
                break;
            case 2://QUARTIER

                $data =     DB::table('contribuable')->select(DB::raw($select
                ))
                    ->join('activite','activite.id_ct','=', 'contribuable.id_ct')
                    ->where("activite.id_qt", "=", $val_tri)
                    ->orderBy('contribuable.nom')
                    ->distinct()
                    ->get();
                break;


            case 3:
                $data =  DB::table('contribuable')->select(DB::raw($select
                ))
                    ->join('activite','activite.id_ct','=', 'contribuable.id_ct')
                    ->join('quartier','quartier.id_qt','=', 'activite.id_qt')
                    ->join('assignation_quartier_zone','quartier.id_qt','=', 'assignation_quartier_zone.id_qt')
                    ->where("assignation_quartier_zone.id_zn", "=", $val_tri)
                    ->where("assignation_quartier_zone.actif", "=", 1)
                    ->orderBy('contribuable.nom')
                    ->distinct()
                    ->get();
                break;
            case 4:
                $data =     DB::table('contribuable')->select(DB::raw($select
                ))
                    ->join('activite','activite.id_ct','=', 'contribuable.id_ct')
                    ->join('taxe','taxe.id_tax','=', 'activite.id_taxe')
                    ->where("taxe.id_cp_bd", "=", $val_tri)
                    ->orderBy('contribuable.nom')
                    ->distinct()
                    ->get();
                break;

        }


        return $data;



    }

}
