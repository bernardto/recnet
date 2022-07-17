<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class Regisseur extends Controller
{

    //

    function  updatePassword(Request $request){


        $data = DB::table("regisseurs")->select()->where("id","=", auth()->guard('regisseur')->id())->get();

         $data = $data[0];



        if (Hash::check(request('anc_mp'), $data->password)){



                DB::table('regisseurs')
                    ->where("id","=", auth()->guard('regisseur')->id())
                    ->update(array('password' => Hash::make(request('new_mp') )));

                return response()->json(["success" => true]);


        }
        return response()->json(["success" => false, "error" => true]);


    }
    function getInfoCompte(Request  $request){

        if(auth()->guard('regisseur')->check()) {

            $data = DB::table("regisseurs")->select()->where("id","=", auth()->guard('regisseur')->id())->get();

            return response()->json(["data" => $data, "connected" => true]);
        }

        return response()->json(["data" => [], "connected" => false]);

    }

    function editRegisseur(Request $request){

        // return var_dump($arr);

        $data = json_decode(request('data'), true);
        $validator = Validator::make($data, $this->regleModification($data['up_email']), $this->message_inscription(), $this->attr());

        if ($validator->passes()) {


            //$id  = DB::table('taskbdook')->insertGetId(['data' =>  5555]);


            DB::table('regisseurs')->where('id', "=",  auth()->guard('regisseur')->id())->update(
                [
                    'nom' => $data['nom'],
                    'prenom' => $data['prenom'],
                    'email' => $data['email'],
                    'date_nai' => $data['date_naissance'],
                    'sex' => $data['genre'],
                    'numero_cni' => $data['numero_cni'],
                    'numero' => $data['numero'],
                    'lieu_nai' => $data['lieu_nai'],

                ]
            );


            $bool = false;
            for ($i = 0; $i < request('nb_photo'); $i++) {
                $bool = true;
                $file = request('fichier');
                $nom_du_fichier = str_replace(" ", "_", $file->getClientOriginalName());


                $file->storeAs('public/photo/regisseur/', $data['id'] . "_" . $nom_du_fichier);

                //Suspression de l'ancienne photo

                Storage::delete('public/photo/regisseur/' . $data['photo']);

                //Mise à jour photo
                DB::table('regisseurs')->where('id', '=', $data['id'])->update(['photo' => $data['id'] . "_" . $nom_du_fichier]);

            }

            if ($bool)
                return response()->json(["success" => true, 'id' => $data['id'], 'photo' => $data['id'] . "_" . $nom_du_fichier]);
            else
                return response()->json(["success" => true, 'id' => $data['id'], 'photo' => $data['photo']]);


        } else {

            return response()->json(array('success' => false, 'errors' => $validator->getMessageBag()->toArray()));

        }

    }

    function attr()
    {

        return [

            'nom' => 'Nom',
            'prenom' => 'Prenom',
            'lieu_nai' => 'Lieu de naissance',
            'email' => 'Email',
            'date_naissance' => 'Date Naissance',
            'genre' => 'Genre',
            'numero_cni' => 'Numéro CNI',

            'numero' => 'Téléphone',



        ];
    }

    public function message_inscription()
    {

        return ['password.required' => 'le mot de passe est obligatoire', 'email.required' => 'L\'adresse email est obligatoire.',

        ];

    }

    function regleModification($email)
    {

        $a = [

            'nom' => 'required|min:3|max:50',
            'prenom' => 'required|min:3|max:150',
            'lieu_nai' => '|min:5|max:50',
            'genre' => 'required|max:10',
            'numero_cni' => 'min:5|max:50',
            'numero' => 'required|min:8|max:13',
            'date_naissance' => 'required|min:4|max:15',

        ];
        if ($email)
            $a = array_merge($a, ['email' => 'required|min:5|max:255|email|unique:regisseur',
            ]);

        else
            $a = array_merge($a, ['email' => 'required|min:5|max:255|email',
            ]);



        return $a;


    }

    function createRegisseur(Request $request){


    }
    function connexion(Request $request){

       /* DB::table("regisseurs")->insertGetId([
            "nom" => "TOTO",
            "prenom" => "LAGBEU BERNARD",
            "sex" => "F",
            "numero_cni" => "555555",
            "date_nai" => "06-02-1998",
            "password" => Hash::make("12345"),
            "email" => "totobernard09@gmail.com",
            "lieu_nai" => "ISSIA",
            "numero" => "78803638"
        ]);*/


        $credentials = $request->only('email', 'password');


        if (auth()->guard('regisseur')->attempt($credentials, true)) {

            return response()->json(array(
                'success' => true,

            ));

        } else {

            return response()
                ->json(array(
                    'invalid' => true,
                    'success' => false,
                ));

        }
    }
}
