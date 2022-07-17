<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class Zone extends Controller
{
    //$




    function getZoneQuartier(Request $request){

        $data =   DB::table('zone')->select(['lib', 'id_zn'])->orderBy('lib')->get();


        return response()->json(['data' => $data]);

    }

    function getToutZone(Request  $request){


        $data =   DB::table('zone')->select(['lib', 'id_zn'])->orderBy('lib')->get();


        return response()->json(['data' => $data]);


    }

    function getToutZonePage(Request  $request){


        $data =   DB::table('zone')->select(['lib','id_zn', 'identifiant'])->orderBy('lib')->paginate(10);


        return response()->json(['data' => $data]);


    }

    function  ajoutZone(Request $request){

        // return var_dump($arr);

        /*$data = json_decode(request('data'),true);*/

        $validator = Validator::make($request->all(), $this->regleAjout(),$this->message_inscription(), $this->attr());

        if ($validator->passes()){


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            $id = DB::table('zone')->insertGetId(
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

    function getIdentifiant(Request $request){

        $last_id = DB::table('zone')
            ->select('id_zn')
            ->orderBy('id_zn', 'desc')
            ->skip(0)->take(1)
            ->get();

        if(count($last_id) > 0){
            return response()->json(['identifiant' => $last_id[0]->id_zn + 1 .'ZN'.date('Y')[2].''.date('Y')[3]]);
        }else{

            return response()->json(['identifiant' => 1 .'ZN'.date('Y')[2].''.date('Y')[3]]);
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

            'lib' =>  'Nom de la zone',
            'identifiant' =>  'Identifiant',

        ];
    }

    function regleAjout(){

        return [

            'lib' =>  'required|min:3|max:255',
            'identifiant' =>  'required|min:5|max:50|unique:zone',


        ];
    }

    function regleModification($email, $identifiant){

        $a = [

            'nom' =>  'required|min:3|max:50',
            'prenom' =>  'required|min:3|max:255',
            'date_naissance' =>  'required|min:5|max:50',
            'genre' => 'required|max:10',
            'num_cni' => 'min:5|max:50',
            'numero' =>  'required|min:8|max:15',


        ];
        if($email)
            $a =   array_merge($a, ['email' =>  'required|min:5|max:255|email|unique:collecteur',
            ]);

        else
            $a =  array_merge($a, ['email' =>  'required|min:5|max:255|email',
            ]);

        if($identifiant)
            $a =  array_merge($a, ['identifiant' =>  'required|min:5|max:50|unique:collecteur',
            ]);
        else
            $a =  array_merge($a, ['identifiant' =>  'required|min:5|max:50',
            ]);

        return $a;



    }

    public function getToutQuartierEtat(Request $request)
    {

        $data =   DB::table('zone')->select(['lib','id_zn', 'identifiant'])->orderBy('lib')->get();


        return $data;
    }

}
