<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class Parametre extends Controller
{
    //

    /*  $a = new \App\Http\Controllers\Parametre();
    dd($a->config->nom);*/

   public $config = "";


    function getConfig(Request $request)
    {
     $data =   DB::table("mairie")->select("parametre")->get();

     $config = $data;
        $data[0]->parametre =  str_replace( "{" ,"[" ,$data[0]->parametre);
        $data[0]->parametre =  str_replace( "}" ,"]", $data[0]->parametre );
        $data[0]->parametre =   str_replace(":" ,"=>" ,$data[0]->parametre );

        $fp = fopen(base_path() .'/config/website.php' , 'w+');
        fwrite($fp, '<?php return ["config"=> '.$data[0]->parametre.'];');
        fclose($fp);

        return response()->json(["config" => json_encode(Config::get("website.config"))]);

    }

}
