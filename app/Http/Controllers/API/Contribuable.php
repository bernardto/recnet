<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use DateInterval;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class Contribuable extends Controller
{
    //

    const  DEPART_COMPTE_CONTRIBUABLE =  1458129  ;

    function ajout(Request $request){

        $data =  json_decode(request('data'));

        $genre = "H";
        if($data->contribuable->sex === 0)
            $genre = "F";


        $id_contribuable = DB::table('contribuable')->insertGetId([
            "date" => $data->contribuable->date,
            "email" => $data->contribuable->email,
            "id_ct" => $data->contribuable->id_ct,
            "nationalite" => $data->contribuable->nationalite,
            "nom" => $data->contribuable->nom,
            "num_cni" => $data->contribuable->num_cni,
            "numero" => $data->contribuable->numero,
            "prenom" => $data->contribuable->prenom,
            "sex" => $genre,
            "date_cre" => now()
        ]);





        $date_pay = $this->calculerDate($data->activite->id_taxe);

        $id_activite = DB::table('activite')->insertGetId([
            "adresse"=> $data->activite->adresse ,
            "descr_act"=> $data->activite->descr_act,
            "gps"=> $data->activite->gps,
            "id_act"=> $data->activite->id_act,
            "id_ct"=> $id_contribuable,
            "id_qt"=> $data->activite->id_qt,
            "id_taxe"=> $data->activite->id_taxe,
            "lib"=> $data->activite->lib,
            "montant_cal"=> $data->activite->montant_cal,
            "montant_sai"=> $data->activite->montant_sai,
            "date_pay" => $date_pay,


        ]);





        //PHOTO CONTRIBUABLE ------------------------------------------------------------------------------------------------------------------------------


        //nom du fichier, susression de l'ancienne version en base de donnée // suspression de l'ancienne version en dur


        if($request->hasFile("file")) {

            $image = $request->file('file');


            $nom_image = $id_contribuable . '_CT_';

            $nom_image = $nom_image . '.' . $image->getClientOriginalExtension();


            //suspression ancien fichier disk


            $nom_ancien_image = DB::table('contribuable')->select("photo")->where("id_ct","=", $id_contribuable)->get();
            $nom_ancien_image = $nom_ancien_image[0]->photo;
            if($nom_ancien_image != "user")
                Storage::delete(public_path('/image/contribuable/'.$nom_ancien_image));



            //disk
             $image_resize = Image::make($image->getRealPath());
            $image_resize->resize(48, 48);
            $image_resize->save(public_path('image/contribuable/' .$id_contribuable. "_" . $nom_image));

            //INSERTION


            DB::table('contribuable')->where('id_ct', '=', $id_contribuable)
                ->update(['photo' => $nom_image]);




            //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
            DB::table('contribuable')->where('id_ct' ,'=', $id_contribuable)
                ->update(['identifiant' => $nom_image]);
        }


        //Comptre contribuable





        DB::table('log_contribuable')->insertGetId(['lib' => "Déclaration du contribuable", "date" => now(), "id_ct" => $id_contribuable]);





        $identifiant =  $id_contribuable .'CT'.date('Y')[2].''.date('Y')[3];


        DB::table('contribuable')->where('id_ct' ,'=', $id_contribuable)
            ->update(['identifiant' => $identifiant]);





        $last_id_c = DB::table('compte_contribuable')
            ->select('id')
            ->orderBy('id', 'desc')
            ->skip(0)->take(1)
            ->get();

        $n_compte = self::DEPART_COMPTE_CONTRIBUABLE;

        if(count($last_id_c)){
           $n_compte = self::DEPART_COMPTE_CONTRIBUABLE + $last_id_c[0]->id;

        }



        $id_compte_contribuable = DB::table('compte_contribuable')
            ->insertGetId(["n_compte" =>  $n_compte,  "id_ct" => $id_contribuable]);

        $compteContribuable = DB::table('compte_contribuable')
            ->select()
            ->where('id','=',$id_compte_contribuable)
            ->get();

        DB::table('contribuable')->where('id_ct', '=', $id_contribuable)
            ->update(['n_compte' => $n_compte]);



       $photo =  DB::table('contribuable')->select("photo")->where('id_ct' ,'=', $id_contribuable)->get();
       $photo = $photo[0]->photo;

        return  response()->json(["identifiant" => $identifiant,"photo" => $photo,"compteContribuable" => $compteContribuable, 'id_ct' => $id_contribuable, "id_act" => $id_activite,
            "date_pay" => $date_pay]);
     }

    function calculerDate($id)
    {


        $nb_jour = DB::table('taxe')
            ->select(DB::raw("periode_taxe.nb_jour as jr"))
            ->join("periode_taxe","periode_taxe.id_prd","=", "taxe.id_prd" )
            ->where("id_tax","=", $id)
            ->get();



        if(count($nb_jour) > 0)
            $nb_jour = $nb_jour[0]->jr;
        else
            $nb_jour = 0;

        try {
            $date = new DateTime(date("j-n-Y"));
            if ($nb_jour > 1)
                $date->add(new DateInterval('P' . $nb_jour . 'D'));
            else
                $date = new DateTime(date("j-n-Y"));

        }catch (\Exception $e){
            return  0;
        }

        return $date->format('d-m-Y');

    }

    function ajouterDateActivite($id_act){
        $id_taxe = DB::table("activite")->select(['id_taxe'])->where("id_act","=",$id_act)->get();

        $nb_jour = DB::table('taxe')
            ->select(DB::raw("periode_taxe.nb_jour as jr"))
            ->join("periode_taxe","periode_taxe.id_prd","=", "taxe.id_prd" )
            ->where("id_tax","=", $id_taxe[0]->id_taxe)
            ->get();






        if(count($nb_jour) > 0)
            $nb_jour = $nb_jour[0]->jr;
        else
            $nb_jour = 0;

        try {
            $date = DB::table("activite")->select(['date_pay'])->where("id_act","=",$id_act)->get();
            $date = new DateTime($date[0]->date_pay);


            $date->add(new DateInterval('P' . $nb_jour . 'D'));


        }catch (\Exception $e){
           $date =  new DateTime(date("j-n-Y"));
        }

        return $date->format('d-m-Y');

    }

    function  PayerTaxe(Request $request){


        try {
            $data = json_decode(request('data'));
            $new_date = $this->ajouterDateActivite($data->id_actvite);

            DB::table("payer_taxe")->insert([

                "date" => now(),
                "id_ct" => $data->id_ct,
                "montant" => $data->montant,
                "id_actvite" => $data->id_actvite,
                "id_coll" => $data->id_coll

            ]);

            DB::table('activite')->where("id_act", "=", $data->id_actvite)->update(["date_pay" => $new_date]);

            return response()->json(["new_date" => $new_date, "success" => true]);

        }catch (\Exception $e){
            return  response()->json(["new_date" => "", "success" => false]);
        }





    }

    function AjoutActivite(Request $request){
        $data =  json_decode(request('data'));

        $date_pay = $this->calculerDate($data->id_taxe);

        $id_activite = DB::table('activite')->insertGetId([
            "adresse"=> $data->adresse ,
            "descr_act"=> $data->descr_act,
            "gps"=> $data->gps,
            "id_act"=> $data->id_act,
            "id_ct"=> $data->id_ct,
            "id_qt"=> $data->id_qt,
            "id_taxe"=> $data->id_taxe,
            "lib"=> $data->lib,
            "montant_cal"=> $data->montant_cal,
            "montant_sai"=> $data->montant_sai,
            "date_pay" => $date_pay,


        ]);



        DB::table('log_contribuable')->insertGetId(['lib' => "Ajout de l'activité : ".$data->lib, "date" => now(), "id_ct" => $data->id_ct]);
        return  response()->json([ "success"  => true,
        "id_act" => $id_activite,
            "date_pay" => $date_pay]);

    }
}
