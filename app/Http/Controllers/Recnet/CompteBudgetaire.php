<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CompteBudgetaire extends Controller
{
    //



    function getToutComptePage(Request $request){

        $data =   DB::table('compte_budget')->select(['lib','val as val' ,'id_cp_bd as id'])->paginate(10);


        return response()->json(['data' => $data]);

    }
    function getToutCompte(Request $request){

        $data =   DB::table('compte_budget')->select(['lib','val' ,'id_cp_bd as id'])->get();


        return response()->json(['data' => $data]);

    }
    function  modifierCompte(Request $request){

        // return var_dump($arr);

        $validator = Validator::make($request->all(), $this->regleModification(request('up_val')),$this->message_inscription(), $this->attr());

        if ($validator->passes()){


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            DB::table('compte_budget')->where('id_cp_bd', "=", request('id'))->update(
                [
                    'lib' => request('lib'),
                    'val' => request('val'),
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


            $id = DB::table('compte_budget')->insertGetId(
                [
                    'lib' =>  request('lib'),
                    'val' => request('val')

                ]
            );


            return response()->json(["success" => true, 'id' => $id]);


        }else{

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }


    }
    function regleModification($val){

        $a = [

            'lib' =>  'required|min:3|max:255',



        ];


        if($val)
            $a =  array_merge($a, ['val' =>  'required|min:5|max:50|unique:compte_budget',
            ]);
        else
            $a =  array_merge($a, ['val' =>  'required|min:5|max:50',
            ]);

        return $a;



    }
    function getval(Request $request){

        $last_id = DB::table('compte_budget')
            ->select('id_cp_bd')
            ->orderBy('id_cp_bd', 'desc')
            ->skip(0)->take(1)
            ->get();

        if(count($last_id) > 0){
            return response()->json(['val' => $last_id[0]->id_cp_bd + 1 .'CF'.date('Y')[2].''.date('Y')[3]]);
        }else{

            return response()->json(['val' => 1 .'CF'.date('Y')[2].''.date('Y')[3]]);
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
            'val' =>  'Compte budgétaire',

        ];
    }
    function regleAjout(){

        return [

            'lib' =>  'required|min:3|max:255',
            'val' =>  'required|min:5|max:50|unique:compte_budget',


        ];
    }

}
