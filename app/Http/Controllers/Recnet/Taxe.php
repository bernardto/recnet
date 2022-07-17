<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class Taxe extends Controller
{
    //

    function getListePeriode(Request $request){


       return response()->json(['data' => $data = DB::table("periode_taxe")->select(DB::raw('id_prd as id, lib'))->get()]);

    }


    function getToutCompteBudget(Request $request){

        $data =   DB::table('compte_budget')->select(DB::raw(  'CONCAT(val,": ", lib ) as lib, id_cp_bd as id'))->get();


        return response()->json(['data' => $data]);

    }


    function getTaxe(Request $request){

        $select = " taxe.id_tax as id,
                compte_budget.val as val_cf,
                compte_budget.lib as lib_cf,
                taxe.prix as prix,
                periode_taxe.lib as periode,
                taxe.id_prd,
                taxe.assiete as asst,
                taxe.taux_cfa_prt as taux_cfa_prt,
                taxe.id_cp_bd,
                taxe.nb_jours as nb_jour,
                taxe.id_prd as id_prd,
                taxe.meth_cal_prix as meth_cal_prix,
                taxe.lib as lib_taxe";




        switch (request("trier_par")) {
            case 1://tous les résulats

                $data = DB::table('taxe')->select(DB::raw($select
                ))->join('periode_taxe', 'periode_taxe.id_prd', '=', 'taxe.id_prd')
                    ->join('compte_budget','compte_budget.id_cp_bd', '=', 'taxe.id_cp_bd')
                    ->paginate(Config::get("website.config.pagignate"));
                break;
            case 2://COMPTE FONCTIONNEL

                $data = DB::table('taxe')->select(DB::raw($select
                ))->join('periode_taxe', 'periode_taxe.id_prd', '=', 'taxe.id_prd')
                    ->join('compte_budget','compte_budget.id_cp_bd', '=', 'taxe.id_cp_bd')
                    ->where("compte_budget.id_cp_bd","=", request("val_tri"))
                    ->paginate(Config::get("website.config.pagignate"));
                break;

            case 3://PERIODE TAXE
                $data = DB::table('taxe')->select(DB::raw($select
                ))->join('periode_taxe', 'periode_taxe.id_prd', '=', 'taxe.id_prd')
                    ->join('compte_budget','compte_budget.id_cp_bd', '=', 'taxe.id_cp_bd')
                    ->where("periode_taxe.id_prd","=", request("val_tri"))
                    ->paginate(Config::get("website.config.pagignate"));
                break;

        }

        return response()->json(['data' =>$data]);

    }
    function ajouterTaxe(Request $request){



        // return var_dump($arr);

        $data =request('data');
        $validator = Validator::make($data, $this->regleAjout(), $this->message_inscription(), $this->attr());

        $comp_existe = false;
        $id_cb = "";
        if ($validator->passes()) {

            //Vérification de l'existence du compt budgtaire

            try {
                $data['val_cf'] = $data['val_cf'] . ":7026";
                $data['val_cf'] = explode(":", $data['val_cf'])[0];
                $id_cb =  DB::table('compte_budget')->select('id_cp_bd as id_cb')->where('val','=', $data['val_cf'])->get();

            }catch (\Exception $e){

                $comp_existe = true;

            }



           if(!$comp_existe){

                  $id_cb =    DB::table('compte_budget')->insertGetId(['lib' => $data['lib_taxe'], 'val' => $data['val_cf']]);


           }else{

               $id_cb =  $data['val_cf']['id'];
           }




            $sql = array(
                'lib' => $data['lib_taxe'],
                'id_cp_bd' => $id_cb,
                'assiete' => $data['asst'],
                'id_prd' => $data['periode']['id'],
                'taux_cfa_prt' => $data['taux_cfa_prt'],
                'prix' => $data['prix'],
                'meth_cal_prix' => $data['methode_cal_prix']


        );


           if($data['periode']['id'] == 9){

               //JOUR
               if($data['value_jr_mois']['id'] == 1)
                   $sql = array_merge($sql, ['nb_jours' => $data['nb_jour']]);
               else
                    $sql =  array_merge($sql, ['nb_jours' => 30 * $data['nb_jour']]);


           }


           $sous_taxe = false;
           //Fixe ou en fonction des critère
           if($data['methode_cal_prix'] == 1){

               array_merge($sql,["prix" =>$data['prix']]);

           }else{

              $sql =  array_merge($sql,["critere" => $data['crit']]);
               $sous_taxe = true;


           }



          // return request("modifier");
           if(request("modifier") == 0)
                $id_taxe = DB::table('taxe')->insertGetId($sql);
           else
               $id_taxe = DB::table('taxe')->where("id_tax", "=", $data["id"])->update($sql);


          /*  if($sous_taxe){

               foreach ($data['sous_taxe'] as $item){

                   $sql_st = array(

                       "prix" => $item['prix'],
                       "signe_math" => $item['signe_math']['lib'],
                       "id_taxe" => $id_taxe

                   );

                   if($item['signe_math']['id'] == 6) {
                      $sql_st =  array_merge($sql_st,
                          ['val_debut' => $item['val_in_de'],
                              'val_fin' => $item['val_in_fin']
                          ] );
                   }else{
                      $sql_st =  array_merge($sql_st, ['val_signe' => $item['val_signe']]);
                   }

                   DB::table('sous_taxe')->insert($sql_st);


               }
           }

          */
            return response()->json(["success" => true]);




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

            'val_cf' => 'Compte budgetaire',
            'lib_taxe' => 'Nom de la taxe',
            'crit' => 'Critère',
            'asst' => 'Assiète',
            "periode" => 'La périodicité'


        ];
    }

    function regleAjout()
    {

        return [

            'val_cf' => 'required|min:2|max:255',
            'lib_taxe' => 'required|min:2|max:254',
            'crit' => 'nullable|min:2|max:254',
            'asst' => 'nullable|min:2|max:254',
            'taux_cfa_prt' => 'required|integer',
            "periode" => 'required'


        ];
    }


}

