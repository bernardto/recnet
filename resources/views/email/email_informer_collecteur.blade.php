
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
    <title>Electran Ong</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">

        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }
        .styled-table thead tr {
            background-color: #0946e0;
            color: #ffffff;
            text-align: left;
        }
        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }
        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }
    </style>
</head>

<body>
<h2>Cher {{ $data["nom"] }}</h2>
<h3>Vous avez été désigné(e) à parcourir plusieurs  quartier(s) pour la collecte des taxes. </h3>

<table caption="Affectation" class="styled-table">
    <thead>
    <tr>
        <th class="col0">IDENTIFIANT</th>
        <th class="col1">QUARTIER</th>=
    </tr>
    </thead>
    <tbody>

    @foreach($data['quartier'] as $item)

        <tr>
            <td class="col0">{{$item->identifiant}}</td>
            <td class="col1">{{$item->lib}}</td>



        </tr>
    @endforeach

    </tbody>
</table>

<p >Voici votre matricule est : <span style="color: red">{{$data["matricule"]}} </span> et votre mot de passe  : <span style="color: red">{{$data["password"]}}</span>    pour l'authentification.
<p>Télécharger l'application <a href="http://recnet.gerddes-aci.org/recnet.apk">ici</a> </p>




</body>
</html>
