<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
class Quiz extends Controller
{
    //
    function  getQuiz(Request $request){

        $data_quiz = DB::table("quiz")
            ->select()
            ->where("id","=",request("id_quiz"))
            ->get();

        $data_propo = array();

        if(count($data_quiz) > 0 ) {
            $data_quiz = $data_quiz[0];


            //$data_quiz->question = nl2br( $data_quiz->question );
            $data_propo = DB::table("quiz_proposition")
                ->select("proposition")
                ->where("id_quiz", "=", $data_quiz->id)
                ->get();

        }
        return response()->json(["data_quiz" => $data_quiz, "data_propo" => $data_propo ]);
    }

    function remplirDb(Request  $request){

        $data = file_get_contents(public_path("data_quiz.json"));

        $data = json_decode($data);

        $data = $data->data;
        foreach ($data as $quiz){

            $question = $quiz->question;


            $id = DB::table("quiz")->insertGetId(["question" =>
                $question, "type" => $quiz->type, "reponse" =>
                $quiz->reponse]);

            foreach ($quiz->proposition as $pr){
                DB::table("quiz_proposition")->insert(["proposition" => $pr, "id_quiz" => $id]);
            }


        }
        return "ok";




    }
}
