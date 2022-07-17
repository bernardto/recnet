<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManagerStatic as Image;

class Collecteur extends Controller
{

    //

    function  listeCollecteurNomMatId(Request $request){

        return response()->json(["data" => DB::table('collecteur')->select(["nom","prenom", 'id_col', "identifiant"])->orderBy("nom")->get()]);

    }

    /**
     * Collecteur constructor.
     */
    public function __construct()
    {
    }

    function validerReaffectionSuperviseurZone(Request $request)
    {

        $data = request('data_coll');

        foreach ($data as $coll) {


            if (request('add_ecra') === 1) {


                foreach ($coll['id_zn'] as $zn) {


                    DB::table('assignation_superviseur_zone')->insert([
                        'id_zn' => $zn,
                        'id_coll' => $coll['id'],
                        'date' => now(),
                        'actif' => 1,
                    ]);


                }

            } else {

                DB::table('assignation_superviseur_zone')->where('id_coll', '=', $coll)->update(['actif' => 0, 'date_fin' => now()]);


                foreach ($coll['id_zn'] as $zn) {


                    DB::table('assignation_superviseur_zone')->insert([
                        'id_zn' => $zn,
                        'id_coll' => $coll['id'],
                        'date' => now(),
                        'actif' => 1,
                    ]);


                }

            }

        }

        return response()->json(['success' => true]);


    }


    function validerDesaffectionSuperviseurZone(Request $request)
    {

        foreach (request('id_zn') as $id_zn) {


            foreach (request('data_coll') as $id_col) {


                DB::table('assignation_superviseur_zone')
                    ->where('id_coll', '=', $id_col)
                    ->where('id_zn', '=', $id_zn)->update(['actif' => 0, 'date_fin' => now()]);


            }


        }


        return response()->json(['success' => true]);

    }

    function validerAffectionSuperviseurZone(Request $request)
    {

        foreach (request('id_coll') as $id_coll) {


            foreach (request('id_zn') as $id_zn) {


                DB::table('assignation_superviseur_zone')->insert([
                    'id_zn' => $id_zn,
                    'id_coll' => $id_coll,
                    'date' => now(),
                    'actif' => 1,
                ]);


            }


        }

        return response()->json(['success' => true]);

    }

    function collectionToArray($collection , $val){

        $data = array();

        foreach($collection as $item){

            array_push($data, $item->$val);
        }

        return $data;

    }

    function getInfoSuper(Request $request)
    {

        $data = json_decode(request('data'), true);

        //si les collecteurs sont définis
        if ($data) {

            $data_coll = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                identifiant,
                sex,
                CONCAT(nom," ", prenom ) as nom,
                photo

                '))->whereIn('id_col', $data['id'])->get();

            return response()->json(["data" => $data_coll]);
        } else {

            $info  = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                sex,
                identifiant,
                CONCAT(nom," ", prenom ) as nom,
                photo

            '
            ))->where('est_superviseur', '=', 1)
                ->orderBy('nom')->paginate(Config::get("website.config.pagignate"));

            foreach ($info->items() as $item){

                $item->id_zn =
                    DB::table("assignation_collecteur_zone")->select("id_zn")->distinct()
                        ->where("actif","=",1)->where("id_coll", "=",$item->id )->get()->toArray();


                $item->id_qt =
                    DB::table("assignation_collecteur_quartier")->select("id_qt")->distinct()
                        ->where("actif","=",1)
                        ->where("id_coll", "=",$item->id )->get()->toArray();



            }


            return response()->json(["data" => $info]);

        }

    }

    function rechercherSuperviseur(Request $request)
    {

        $data = DB::select(DB::raw("

        SELECT id_col as id,
                sex,  photo, CONCAT(nom,' ', prenom ) as nom, identifiant , est_superviseur
        FROM collecteur
        WHERE est_superviseur = 1  and  CONCAT(nom,' ',prenom)
                  LIKE '%" . request('search') . "%'
                   or identifiant LIKE '%" . request('search') . "%'

        ORDER BY nom LIMIT 0, "+Config::get("website.config.pagignate")
        ));
        $i = 0;


        return response()->json(["data" => $data]);

    }

    function getSuperviseurZone(Request $request)
    {


        $data = DB::table('assignation_superviseur_zone')->select(DB::raw('
                assignation_superviseur_zone.id_coll as id,
                collecteur.sex,
                collecteur.identifiant,
                CONCAT(collecteur.nom," ", collecteur.prenom ) as nom,
                collecteur.photo

            '
        ))->join('collecteur', 'collecteur.id_col', '=', 'assignation_superviseur_zone.id_coll')
            ->whereIn('id_zn', request('id_zn'))
            ->where('assignation_superviseur_zone.actif', '=', 1)->get();


        foreach ($data as $item) {

            $item->id_zn = DB::table('assignation_superviseur_zone')
                ->select('id_zn')
                ->where([['id_coll', '=', $item->id], ['actif', '=', 1]])
                ->get();

        }


        return response()->json(["data" => $data]);

    }


    function getSuperNonAfecZone(Request $request)
    {

        $data_id = DB::table('assignation_superviseur_zone')
            ->select('id_coll')
            ->where('actif', '=', 1)
            ->distinct()
            ->get()->toArray();


        $id_arr = array();
        foreach ($data_id as $id) {

            array_push($id_arr, $id->id_coll);
        }


        $data = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                sex,
                identifiant,
                CONCAT(nom," ", prenom ) as nom,
                photo'))
            ->where('est_superviseur', '=', 1)
            ->whereNotIn('id_col', $id_arr)
            ->orderBy('nom')
            ->paginate(Config::get("website.config.pagignate"));
        return response()->json(["data" => $data]);


    }

    //Est superviseur

//-------------------------------------------------------------------------------------------------------------------------
    //ZONE
    //--------------------------------------------------------


    function getCollNonAfecZone(Request $request)
    {

        $est_superviseur = request("est_superviseur") === 1 ? 1 :0;

        $data_id = DB::table('assignation_collecteur_zone')
            ->select('id_coll')
            ->where('actif', '=', 1)
            ->distinct()
            ->get()->toArray();


        $id_arr = array();
        foreach ($data_id as $id) {

            array_push($id_arr, $id->id_coll);
        }


        $data = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                sex,
                identifiant,
                CONCAT(nom," ", prenom ) as nom,
                photo'))
            ->where('est_superviseur', '=', $est_superviseur)
            ->whereNotIn('id_col', $id_arr)
            ->orderBy('nom')
            ->paginate(Config::get("website.config.pagignate"));

        return response()->json(["data" => $data]);


    }

    function validerDesaffectionCollecteurZone(Request $request)
    {


        //  DB::table('assignation_collecteur_zone')->whereIn('id_coll',  request('data_coll'))->update(['actif' => 0]);


        foreach (request('id_zn') as $id_zn) {


            foreach (request('data_coll') as $id_col) {


                DB::table('assignation_collecteur_zone')
                    ->where('id_coll', '=', $id_col)
                    ->where('id_zn', '=', $id_zn)->update(['actif' => 0, 'date_fin' => now()]);


            }


        }


        return response()->json(['success' => true]);

    }

    function validerReaffectionCollecteurZone(Request $request)
    {

        $data = request('data_coll');


        foreach ($data as $coll) {


            if (request('add_ecra') === 1) {


                foreach ($coll['id_zn'] as $zn) {


                    DB::table('assignation_collecteur_zone')->insert([
                        'id_zn' => $zn,
                        'id_coll' => $coll['id'],
                        'date' => now(),
                        'actif' => 1,
                    ]);


                }

            } else {

                DB::table('assignation_collecteur_zone')->where('id_coll', '=', $coll['id'])->update(['actif' => 0, 'date_fin' => now()]);


                foreach ($coll['id_zn'] as $zn) {


                    DB::table('assignation_collecteur_zone')->insert([
                        'id_zn' => $zn,
                        'id_coll' => $coll['id'],
                        'date' => now(),
                        'actif' => 1,
                    ]);


                }

            }

            $this->informerCollecteurParMail($coll['id']);
        }




        return response()->json(['success' => true]);


    }

    function validerAffectionCollecteurZone(Request $request)
    {

        foreach (request('id_coll') as $id_coll) {


            //DB::table('assignation_collecteur_quartier')->where('id_coll', '=', $id_coll)->update(['actif' => 0]);


            foreach (request('id_zn') as $id_zn) {


                DB::table('assignation_collecteur_zone')->insert([
                    'id_zn' => $id_zn,
                    'id_coll' => $id_coll,
                    'date' => now(),
                    'actif' => 1,
                ]);


            }

            DB::table('collecteur')->where('id_col', '=', $id_coll)->update(['assignation_zn' => 1]);

            $this->informerCollecteurParMail($id_coll);


        }


        return response()->json(['success' => true]);

    }


    function getCollecteurZone(Request $request)
    {


        $est_superviseur = request("est_superviseur") === 1 ? 1 :0;


        $data = DB::table('assignation_collecteur_zone')->select(DB::raw('
                assignation_collecteur_zone.id_coll as id,
                collecteur.sex,
                collecteur.identifiant,
                CONCAT(collecteur.nom," ", collecteur.prenom ) as nom,
                collecteur.photo

            '
        ))
            ->join('collecteur', 'collecteur.id_col', '=', 'assignation_collecteur_zone.id_coll')
            ->where('assignation_collecteur_zone.actif', '=', 1)
            ->where('collecteur.est_superviseur', '=', $est_superviseur)
            ->whereIn('assignation_collecteur_zone.id_zn', request('id_zn'))
            ->groupBy("assignation_collecteur_zone.id_coll")
            ->having(DB::raw('count(assignation_collecteur_zone.id_zn)'), '>=', count(request('id_zn')))
            ->get();


        foreach ($data as $item) {

            $item->id_zn = DB::table('assignation_collecteur_zone')
                ->select('id_zn')
                ->where([['id_coll', '=', $item->id], ['actif', '=', 1]])
                ->get();

        }


        return response()->json(["data" => $data]);

    }

    function getCollecteurIdNom(Request  $request){

        return response()->json(["data" => DB::table("collecteur")
            ->select(DB::raw('id_col as id, CONCAT(nom," ", prenom ) as lib'))->where("est_superviseur","=",0)->get()
        ]);
    }

    //Quartier
    //--------------------------------------------------------

    function getCollNonAfecQuartier(Request $request)
    {

        $data_id = DB::table('assignation_collecteur_quartier')
            ->select('id_coll')
            ->where('actif', '=', 1)
            ->distinct()
            ->get()->toArray();


        $id_arr = array();
        foreach ($data_id as $id) {

            array_push($id_arr, $id->id_coll);
        }


        $data = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                sex,
                identifiant,
                CONCAT(nom," ", prenom ) as nom,
                photo'))
            ->whereNotIn('id_col', $id_arr)
            ->where('est_superviseur', '=', 0)
            ->orderBy('nom')
            ->paginate(Config::get("website.config.pagignate"));
        return response()->json(["data" => $data]);


    }


    function validerReaffectionCollecteurQuartier(Request $request)
    {

        $data = request('data_coll');

        foreach ($data as $coll) {


            if (request('add_ecra') === 1) {


                foreach ($coll['id_qt'] as $qt) {


                    DB::table('assignation_collecteur_quartier')->insert([
                        'id_qt' => $qt,
                        'id_coll' => $coll['id'],
                        'date' => now(),
                        'actif' => 1,
                    ]);


                }

            } else {

                DB::table('assignation_collecteur_quartier')->where('id_coll', '=', $coll)->update(['actif' => 0, 'date_fin' => now()]);


                foreach ($coll['id_qt'] as $qt) {


                    DB::table('assignation_collecteur_quartier')->insert([
                        'id_qt' => $qt,
                        'id_coll' => $coll['id'],
                        'date' => now(),
                        'actif' => 1,
                    ]);


                }

            }

            $this->informerCollecteurParMail($coll['id']);

        }
        return response()->json(['success' => true]);


    }


    function validerAffectionCollecteurQuartier(Request $request)
    {


        foreach (request('id_coll') as $id_coll) {


            //DB::table('assignation_collecteur_quartier')->where('id_coll', '=', $id_coll)->update(['actif' => 0]);


            foreach (request('id_qt') as $id_qt) {


                DB::table('assignation_collecteur_quartier')->insert([
                    'id_qt' => $id_qt,
                    'id_coll' => $id_coll,
                    'date' => now(),
                    'actif' => 1,
                ]);


            }

            DB::table('collecteur')->where('id_col', '=', $id_coll)->update(['assignation_qt' => 1]);
            $this->informerCollecteurParMail($id_coll);


        }

        return response()->json(['success' => true]);

    }


    function rechercherCollecteur(Request $request)
    {

        $data = DB::select(DB::raw("

        SELECT id_col as id,
                sex,  photo, CONCAT(nom,' ', prenom ) as nom, identifiant
        FROM collecteur
        WHERE CONCAT(nom,' ',prenom)
                  LIKE '%" . request('search') . "%'
                   or identifiant LIKE '%" . request('search') . "%'

        ORDER BY nom LIMIT 0, "+Config::get('website.config.pagignate')));


        return response()->json(["data" => $data]);

    }


    function getCollecteurDuQuartier(Request $request)
    {



        $data = DB::table('assignation_collecteur_quartier')->select(DB::raw('
                assignation_collecteur_quartier.id_coll as id,
                collecteur.sex,
                collecteur.identifiant,
                CONCAT(collecteur.nom," ", collecteur.prenom ) as nom,
                collecteur.photo

            '
        ))
            ->join('collecteur', 'collecteur.id_col', '=', 'assignation_collecteur_quartier.id_coll')
            ->where('assignation_collecteur_quartier.actif', '=', 1)
            ->whereIn('assignation_collecteur_quartier.id_qt', request('id_qt'))
            ->groupBy("assignation_collecteur_quartier.id_coll")
            ->having(DB::raw('count(assignation_collecteur_quartier.id_qt)'), '>=', count(request('id_qt')))
            ->get();


        foreach ($data as $item) {

            $item->id_qt = DB::table('assignation_collecteur_quartier')
                ->select('id_qt')
                ->distinct()
                ->where([['id_coll', '=', $item->id], ['actif', '=', 1]])
                ->get();

        }


        return response()->json(["data" => $data]);

    }


    function validerDesaffectionCollecteurQuartier(Request $request)
    {


        foreach (request('id_qt') as $id_qt) {


            foreach (request('data_coll') as $id_col) {


                DB::table('assignation_collecteur_quartier')
                    ->where('id_coll', '=', $id_col)
                    ->where('id_qt', '=', $id_qt)->update(['actif' => 0, 'date_fin' => now()]);


            }


        }


        return response()->json(['success' => true]);


    }


    /**
     * Liste des collecteurs non affectés (AFFECTATION COLLECTEUR°)
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */


    function getInfoColl(Request $request)
    {

        $data = json_decode(request('data'), true);

        //si les collecteurs sont définis
        if ($data) {

            $data_coll = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                identifiant,
                sex,
                CONCAT(nom," ", prenom ) as nom,
                photo

                '))->whereIn('id_col', $data['id'])->get();

            return response()->json(["data" => $data_coll]);
        } else {

            $info  = DB::table('collecteur')->select(DB::raw('
                id_col as id,
                sex,
                identifiant,
                CONCAT(nom," ", prenom ) as nom,
                photo

            '
            ))->where('est_superviseur', '=', 0)
                ->orderBy('nom')->paginate(Config::get("website.config.pagignate"));

            foreach ($info->items() as $item){

                $item->id_zn =
                    DB::table("assignation_collecteur_zone")->select("id_zn")->distinct()
                        ->where("actif","=",1)->where("id_coll", "=",$item->id )->get()->toArray();


                $item->id_qt =
                    DB::table("assignation_collecteur_quartier")->select("id_qt")->distinct()
                        ->where("actif","=",1)
                        ->where("id_coll", "=",$item->id )->get()->toArray();



            }


            return response()->json(["data" => $info]);


        }

    }


    function getToutSuperviseur(Request $request)
    {


        $data = DB::table('collecteur')->select(DB::raw('



            collecteur.id_col as id,
            collecteur.photo,
            collecteur.identifiant,
            collecteur.nom,
            collecteur.prenom,
            collecteur.sex as genre,
            collecteur.numero,
            collecteur.email,
            collecteur.date_nai,
            collecteur.date_cre,
            collecteur.num_cni'
        ))
            ->where('collecteur.est_superviseur', '=', 1)
            ->orderBy('collecteur.nom')
            ->paginate(15);
        return response()->json(['data' => $data]);

    }

    function getListeCollecteur(Request $request)
    {
        $select = "
            collecteur.id_col as id,
            collecteur.photo,
            collecteur.identifiant,
            collecteur.nom,
            collecteur.prenom,
            collecteur.sex as genre,
            collecteur.numero,
            collecteur.email,
            collecteur.date_nai,
            collecteur.date_cre,
            collecteur.num_cni";


        $data = $this->getDataFromTri($select, request("trier_par"), request("val_tri"), request("est_superviseur"));



        return response()->json(['data' => $data]);
    }


    function getMatricule(Request $request)
    {

        $last_id = DB::table('collecteur')
            ->select('id_col')
            ->orderBy('id_col', 'desc')
            ->skip(0)->take(1)
            ->get();

        if (count($last_id) > 0) {
            return response()->json(['matricule' => $last_id[0]->id_col + 1 . 'COL' . date('Y')[2] . '' . date('Y')[3]]);
        } else {

            return response()->json(['matricule' => 1 . 'COL' . date('Y')[2] . '' . date('Y')[3]]);
        }
    }


    function getMatriculeSuperviseur(Request $request)
    {

        $last_id = DB::table('collecteur')
            ->select('id_col')
            ->orderBy('id_col', 'desc')
            ->skip(0)->take(1)
            ->get();

        if (count($last_id) > 0) {
            return response()->json(['matricule' => $last_id[0]->id_col + 1 . 'SUP' . date('Y')[2] . '' . date('Y')[3]]);
        } else {

            return response()->json(['matricule' => 1 . 'SUP' . date('Y')[2] . '' . date('Y')[3]]);
        }
    }

    /**Permet d'ajouter un Collecteur
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */



    function ajoutCollecteur(Request $request)
    {

        // return var_dump($arr);

        $data = json_decode(request('data'), true);
        $validator = Validator::make($data, $this->regleAjout(), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            $id = DB::table('collecteur')->insertGetId(
                [
                    'nom' => $data['nom'],
                    'prenom' => $data['prenom'],
                    'password' => random_int(100000, 1000000),
                    'email' => $data['email'],

                    'date_nai' => $data['date_naissance'],
                    'est_superviseur' => $data['est_superviseur'] ? 1 : 0,
                    'sex' => $data['genre'],
                    'num_cni' => $data['num_cni'],
                    'date_cre' => $this->AjourDhui(),
                    'numero' => $data['numero'],
                    'identifiant' => $data['identifiant'],
                ]
            );


            $bool = false;
            for ($i = 0; $i < request('nb_photo'); $i++) {
                $bool = true;
                $file = request('fichier');
                $nom_du_fichier = str_replace(" ", "_", $file->getClientOriginalName());



                $image_resize = Image::make($file->getRealPath());
                $image_resize->resize(48, 48);
                $image_resize->save(public_path('storage/photo/collecteur/' .$id. "_" . $nom_du_fichier));




                //Mise à jour photo
                DB::table('collecteur')->where('id_col', '=', $id)->update(['photo' => $id . "_" . $nom_du_fichier]);

            }

            if ($bool)
                return response()->json(["success" => true, 'id' => $id, 'photo' => $id . "_" . $nom_du_fichier]);
            else
                return response()->json(["success" => true, 'id' => $id, 'photo' => "user"]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * Modification du Collecteur
     */
    function modifierCollecteur(Request $request)
    {

        // return var_dump($arr);

        $data = json_decode(request('data'), true);
        $validator = Validator::make($data, $this->regleModification($data['up_email'], $data['up_identifiant']), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            DB::table('collecteur')->where('id_col', "=", $data['id'])->update(
                [
                    'nom' => $data['nom'],
                    'prenom' => $data['prenom'],

                    'email' => $data['email'],
                    'date_nai' => $data['date_naissance'],
                    'sex' => $data['genre'],
                    'num_cni' => $data['num_cni'],
                    'numero' => $data['numero'],
                    'identifiant' => $data['identifiant'],
                ]
            );


            $bool = false;
            for ($i = 0; $i < request('nb_photo'); $i++) {
                $bool = true;
                $file = request('fichier');
                $nom_du_fichier = str_replace(" ", "_", $file->getClientOriginalName());

                //Suspression de l'ancienne photo

                if ($data['photo']!= "user")
                    Storage::delete(public_path('storage/photo/collecteur/' . $data['photo']));


                $image_resize = Image::make($file->getRealPath());
                $image_resize->resize(48, 48);
                $image_resize->save(public_path('storage/photo/collecteur/' .$data['id'] . "_" . $nom_du_fichier));

                //Mise à jour photo
                DB::table('collecteur')->where('id_col', '=', $data['id'])->update(['photo' => $data['id'] . "_" . $nom_du_fichier]);

            }

            if ($bool)
                return response()->json(["success" => true, 'id' => $data['id'], 'photo' => $data['id'] . "_" . $nom_du_fichier]);
            else
                return response()->json(["success" => true, 'id' => $data['id'], 'photo' => $data['photo']]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }


    public function message_inscription()
    {

        return ['password.required' => 'le mot de passe est obligatoire', 'email.required' => 'L\'adresse email est obligatoire.',

        ];

    }

    function attr()
    {

        return [

            'nom' => 'Nom',
            'prenom' => 'Prenom',

            'email' => 'Email',
            'date_naissance' => 'Date Naissance',
            'genre' => 'Genre',
            'num_cni' => 'Numéro CNI',
            'numero' => 'Téléphone',
            'identifiant' => 'Identifiant',


        ];
    }

    function regleAjout()
    {

        return [

            'nom' => 'required|min:3|max:50',
            'prenom' => 'required|min:3|max:255',
            'email' => 'required|min:5|max:255|email|unique:collecteur',
            'date_naissance' => 'required|min:5|max:50',
            'genre' => 'required|max:10',

            'num_cni' => 'min:5|max:50',
            'numero' => 'required|min:8|max:15',
            'identifiant' => 'required|min:5|max:50|unique:collecteur',


        ];
    }

    function regleModification($email, $identifiant)
    {

        $a = [

            'nom' => 'required|min:3|max:50',
            'prenom' => 'required|min:3|max:255',
            'date_naissance' => 'required|min:5|max:50',
            'genre' => 'required|max:10',

            'num_cni' => 'min:5|max:50',
            'numero' => 'required|min:8|max:15',


        ];
        if ($email)
            $a = array_merge($a, ['email' => 'required|min:5|max:255|email|unique:collecteur',
            ]);

        else
            $a = array_merge($a, ['email' => 'required|min:5|max:255|email',
            ]);

        if ($identifiant)
            $a = array_merge($a, ['identifiant' => 'required|min:5|max:50|unique:collecteur',
            ]);
        else
            $a = array_merge($a, ['identifiant' => 'required|min:5|max:50',
            ]);

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

    function informerCollecteurParMail($id)
    {



        //$id = 1218;
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
                "update_password",
                "password"
            )
            ->where('id_col', '=', $id)
            ->get();

        if(count($coll) > 0)
            $coll = $coll[0];
        else
            return 0;

        $email = $coll->email;


        $quartier = $this->getQuartierDuCollecteur($id);


        $nom_app = "recnet.apk";


        $password = "";
        if($coll->update_password == 1)
            $password = "votre mot de passe";
        else
            $password = $coll->password;


        $data = ['matricule' => $coll->matricule,"nom_app" => $nom_app,'nom' => $coll->nom . ' ' . $coll->prenom,
            'password' => $password , 'quartier' => $quartier];


        //Page HTML de l'email
        Mail::send('email.email_informer_collecteur', ['data' => $data], function ($message) use ($email) {
            $message->to($email, 'RECNET')->subject("MAIRIE MISSION DE COLLECTE "); //titre
        });

        return "0";

    }


    public function getQuartierDuCollecteur($id_col){
        //$id_col = request("id_col");

        $quartier = DB::table('assignation_collecteur_quartier')
            ->select(DB::raw("

                assignation_collecteur_quartier.id_qt,
                assignation_collecteur_quartier.date as date,
                quartier.id_qt as id_qt,
                quartier.lib as lib,
                quartier.identifiant as identifiant
                "
            ))
            ->distinct()
            ->join("quartier","quartier.id_qt", "=", "assignation_collecteur_quartier.id_qt")
            ->where("assignation_collecteur_quartier.id_coll", "=", $id_col)
            ->where('assignation_collecteur_quartier.actif', '=', 1)
            ->get();



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
            ->join("zone","zone.id_zn", "=", "assignation_collecteur_zone.id_zn")
            ->where("assignation_collecteur_zone.id_coll", "=", $id_col)
            ->where('assignation_collecteur_zone.actif', '=', 1)
            ->get();






        $data_quartier_zone = array();

        foreach ($zone as $item){

            $qt_dans_zone = DB::table('assignation_quartier_zone')
                ->select(DB::raw("

                   assignation_quartier_zone.id_qt as id_qt,
                  assignation_quartier_zone.date as date,
                   quartier.lib as lib,
                   quartier.identifiant as identifiant"

                ))
                ->distinct()
                ->join("quartier","quartier.id_qt", "=", "assignation_quartier_zone.id_qt")
                ->where('assignation_quartier_zone.actif', '=', 1)
                ->where('assignation_quartier_zone.id_zn', '=', $item->id_zn)
                ->get();


            if(count($qt_dans_zone))
                array_push($data_quartier_zone, $qt_dans_zone);




        }


        $j = 0;



        //Doublon quartier / quartier zone
        foreach ($quartier as $qt){



            for($i= 0; $i < count($data_quartier_zone); $i++){

                $data_qt_zn = $data_quartier_zone[$i];


                foreach ($data_qt_zn as $key => $qt_dans_zone  ){



                    if($qt->id_qt == $qt_dans_zone->id_qt){
                        unset($data_quartier_zone[$i][$key]);
                    }


                }

            }


        }

        $temp =  array();

        if(count($data_quartier_zone) > 0 ) {
            foreach ($data_quartier_zone[0] as $item) {
                array_push($temp, $item);
            }

            $data_quartier_zone = $temp;


            //on ajoute les quartiers des zones aux quartiers
            //dd($quartier);
            if (count($data_quartier_zone) > 0) {
                $max = count($quartier) + count($data_quartier_zone);

                $j = 0;
                for ($i = count($quartier); $i < $max; $i++) {
                    $quartier[$i] = $data_quartier_zone[$j];
                    $j++;
                }
            }
        }

        return $quartier;
    }

    function Envoie_Fichier(Request $request)
    {





        for ($i = 1;$i < request('taille');$i++)
        {

            $file = request('fichier' . $i);

            /*//Enregistrer pour chaque Agent
            for ($j = 0;$j < count($id_desti);$j++)
            {

                DB::table('fichier')->insertGetId([
                    'nom' => mb_strtoupper($file->getClientOriginalName(), 'UTF-8'),
                    'id_e' => Auth::id(),
                    'id_d' => $id_desti[$j],
                    'date_e' => $this->Date_Aj() ,
                    'date_va_dep' => $date_depart,
                    'date_va_fin' => $date_limite,

                ]);

            }*/

            $file->storeAs('serveur2',mb_strtoupper($file->getClientOriginalName(), 'UTF-8'));

        }

    }


    public function seedCollecteurAffectation(){
        $data = DB::table("collecteur")->select("id_col")->get();
        $id_zn = [1, 2,3];
        foreach ($data as $it){
            DB::table("assignation_collecteur_zone")->insert(
                ["id_zn" => $id_zn[random_int(0,2)], "id_coll" => $it->id_col, "date" => now(), "actif" => 1]
            );
        }
        return "0";
    }

    public function getDataFromTri($select, $trier_par,  $val_tri, $est_superviseur)
    {


        $data = "";

        switch ($trier_par){
            case 1:

                $data =  DB::table('collecteur')->select(DB::raw($select
                ))

                    ->where("collecteur.est_superviseur","=", $est_superviseur ? 1 : 0)
                    ->orderBy('collecteur.nom')
                    ->paginate(Config::get("website.config.pagignate"));
                break;
            case 2://QUARTIER

                $data =     DB::table('collecteur')->select(DB::raw($select
                ))
                    ->join('assignation_collecteur_quartier','assignation_collecteur_quartier.id_coll','=', 'collecteur.id_col')
                    ->where("assignation_collecteur_quartier.id_qt", "=", $val_tri)
                    ->where("collecteur.est_superviseur","=", $est_superviseur ? 1 : 0)
                    ->where("assignation_collecteur_quartier.actif", "=", 1)
                    ->orderBy('collecteur.nom')
                    ->distinct()
                    ->paginate(Config::get("website.config.pagignate"));
                break;


            case 3:
                $data =     DB::table('collecteur')->select(DB::raw($select
                ))
                    ->join('assignation_collecteur_zone','assignation_collecteur_zone.id_coll','=', 'collecteur.id_col')
                    ->where("assignation_collecteur_zone.id_zn", "=", $val_tri)
                    ->where("collecteur.est_superviseur","=", $est_superviseur ? 1 : 0)
                    ->where("assignation_collecteur_zone.actif", "=", 1)
                    ->orderBy('collecteur.nom')
                    ->distinct()
                    ->paginate(Config::get("website.config.pagignate"));

                break;
        }


        return $data;



    }

    public function getDataFromTriEtat($select, $trier_par,  $val_tri, $est_superviseur)
    {


        $data = "";

        switch ($trier_par){
            case 1:

                $data =  DB::table('collecteur')->select(DB::raw($select
                ))
                    ->where("collecteur.est_superviseur","=", $est_superviseur ? 1 : 0)
                    ->orderBy('collecteur.nom')

                    ->get();
                break;
            case 2://QUARTIER

                $data =     DB::table('collecteur')->select(DB::raw($select
                ))
                    ->join('assignation_collecteur_quartier','assignation_collecteur_quartier.id_coll','=', 'collecteur.id_col')
                    ->where("collecteur.est_superviseur","=", $est_superviseur ? 1 : 0)
                    ->where("assignation_collecteur_quartier.id_qt", "=", $val_tri)
                    ->where("assignation_collecteur_quartier.actif", "=", 1)
                    ->orderBy('collecteur.nom')
                    ->distinct()
                    ->get();
                break;


            case 3:
                $data =     DB::table('collecteur')->select(DB::raw($select
                ))
                    ->join('assignation_collecteur_zone','assignation_collecteur_zone.id_coll','=', 'collecteur.id_col')
                    ->where("collecteur.est_superviseur","=", $est_superviseur ? 1 : 0)
                    ->where("assignation_collecteur_zone.id_zn", "=", $val_tri)
                    ->where("assignation_collecteur_zone.actif", "=", 1)
                    ->orderBy('collecteur.nom')
                    ->distinct()
                    ->get();

                break;
        }

        return $data;



    }

}
/*
  Mail::send('code_de_validation_email', ['data' => $data1], function ($message) use ($email) {
                        $message->to($email, 'ELECTION')->subject("CODE DE VALIDATION"); //titre
                    });


 */
