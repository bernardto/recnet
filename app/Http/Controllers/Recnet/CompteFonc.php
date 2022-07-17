<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CompteFonc extends Controller
{
    //

    function getToutComptePage(Request $request){

        $data =   DB::table('compte_fonc')->select(['lib','identifiant' ,'id_cf as id'])->paginate(10);


        return response()->json(['data' => $data]);

    }

    function getToutCompte(Request $request){

        $data =   DB::table('compte_fonc')->select(['lib','identifiant' ,'id_cf as id'])->get();


        return response()->json(['data' => $data]);

    }


    function  modifierCompte(Request $request){

        // return var_dump($arr);

         $validator = Validator::make($request->all(), $this->regleModification(request('up_identifiant')),$this->message_inscription(), $this->attr());

        if ($validator->passes()){


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            DB::table('compte_fonc')->where('id_cf', "=", request('id'))->update(
                [
                   'lib' => request('lib'),
                    'identifiant' => request('identifiant'),
                ]
            );



                return response()->json(["success" => true]);


        }else{

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }





    }





    function  ajoutCompte(Request $request){

        // return var_dump($arr);

        /*$data = json_decode(request('data'),true);*/

        $validator = Validator::make($request->all(), $this->regleAjout(),$this->message_inscription(), $this->attr());

        if ($validator->passes()){


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            $id = DB::table('compte_fonc')->insertGetId(
                [
                    'lib' =>  request('lib'),
                    'identifiant' => request('identifiant')

                ]
            );


            return response()->json(["success" => true, 'id' => $id]);


        }else{

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }

    function regleModification($identifiant){

        $a = [

            'lib' =>  'required|min:3|max:255',



        ];


        if($identifiant)
            $a =  array_merge($a, ['identifiant' =>  'required|min:5|max:50|unique:compte_fonc',
            ]);
        else
            $a =  array_merge($a, ['identifiant' =>  'required|min:5|max:50',
            ]);

        return $a;



    }
    function getIdentifiant(Request $request){

        $last_id = DB::table('compte_fonc')
            ->select('id_cf')
            ->orderBy('id_cf', 'desc')
            ->skip(0)->take(1)
            ->get();

        if(count($last_id) > 0){
            return response()->json(['identifiant' => $last_id[0]->id_cf + 1 .'CF'.date('Y')[2].''.date('Y')[3]]);
        }else{

            return response()->json(['identifiant' => 1 .'CF'.date('Y')[2].''.date('Y')[3]]);
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

            'lib' =>  'Nom du compte',
            'identifiant' =>  'Identifiant',

        ];
    }

    function regleAjout(){

        return [

            'lib' =>  'required|min:3|max:255',
            'identifiant' =>  'required|min:5|max:50|unique:compte_fonc',


        ];
    }

}
