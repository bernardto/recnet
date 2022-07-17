<?php

namespace App\Http\Controllers\Recnet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use \PDF;

class Imprimer extends Controller
{
    //
    const TITRE_PAGE = "RECNET";


    function  listeZone(Request  $request){

        $qt = new Zone();

        $data = $qt->getToutQuartierEtat($request);


        $date = $this->dateFr();

        $titre_etat = "LISTE DES ZONES DE COLLECTE DE LA MAIRIE DE ".Config::get("website.config.nom");
        $pdf = PDF::loadView('etat.liste_zone', compact("date", "data", "titre_etat"));




        return $this->genererPdf($pdf);
    }


    function  listeQuartier(Request  $request){

        $qt = new Quartier();

        $data = $qt->getToutQuartierEtat($request);

        $date = $this->dateFr();

        $titre_etat = request("titre_impr");
        $pdf = PDF::loadView('etat.liste_quartier', compact("date", "data", "titre_etat"));


        return $this->genererPdf($pdf);
    }

    function historiqueVersementCollecteur(Request  $request){


        $vers = new Versement();

        //return view('etat.hist_versement_collecteur', $vers->getHistoriqueVersementEtat($request));

        $pdf = PDF::loadView('etat.hist_versement_collecteur', $vers->getHistoriqueVersementEtat($request));


        return $this->genererPdf($pdf,"portrait");


    }

    function ListeContribuable(Request $request)
    {

        $select = '

            contribuable.id_ct as id,

            contribuable.identifiant as matricule,
            contribuable.nom as nom ,
            contribuable.prenom as prenom,

            contribuable.numero as numero,
            contribuable.photo as photo,
            contribuable.n_compte as n_compte';

        $ct = new Contribuable();


        $data = $ct->getDataFromTriEtat($select, request("trier_par"), request("val_tri"));

        foreach ($data as $ct) {
            $ct->montant = DB::table("activite")
                ->select(DB::raw("SUM(montant_cal) as montant"))->where("id_ct", "=", $ct->id)->get();

            if (count($ct->montant) > 0) $ct->montant = $ct->montant[0]->montant;
            $ct->activite = DB::table("activite")
                ->select("lib")->where("id_ct", "=", $ct->id)->get();

        }
        $date = $this->dateFr();

        $titre_etat = request("titre_impr");
        $pdf = PDF::loadView('etat.liste_contribuable', compact("date", "data", "titre_etat"));


        return $this->genererPdf($pdf);



    }

    function  genererPdf($pdf, $orientation = "landscape"){
        /*if (request("vue") == 1) {

            return view('etat.liste_contribuable', compact("titre_page", "date", "data", "titre_etat"));
        } else { */


        $pdf->setOptions(['isPhpEnabled' => true, 'isHtml5ParserEnabled' => true, 'isRemoteEnabled' => true]);
        $pdf->setPaper('A4', $orientation);
        return $pdf->stream("dom.pdf");
        //return   $pdf->output(), 'UTF-8', 'UTF-8');

    }

    function ListeCollecteur(Request $request)
    {

        $select = 'collecteur.photo as photo,
            collecteur.identifiant as matricule,
            collecteur.nom as nom,
            collecteur.prenom as prenom,
            collecteur.sex as genre,
            collecteur.numero as numero';

        $ct = new Collecteur();
        $data = $ct->getDataFromTriEtat($select, request("trier_par"), request("val_tri"), request("est_superviseur"));
        $date = $this->dateFr();
        $titre_etat = request("titre_impr");
        $pdf = PDF::loadView('etat.liste_collecteur', compact("date", "data", "titre_etat"));
        return $this->genererPdf($pdf);

    }

    //}
    //  return $pdf->stream('test_pdf.pdf');


    function dateFr()
    {

        $nom_jour_fr = array(
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi"
        );
        $mois_fr = array(
            "",
            "anvier",
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
        list($nom_jour, $jour, $mois, $annee) = explode('/', date("w/d/n/Y"));
        return $nom_jour_fr[$nom_jour] . ' ' . $jour . ' ' . $mois_fr[$mois] . ' ' . $annee;

    }

}
