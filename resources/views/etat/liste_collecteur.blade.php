@extends("home_print")
@section('content')



    <div  >



        <div  style="margin-left: 5%; margin-right: 5%; text-align: center; border-color: black; padding: 15px ; border: 1px solid" outlined >
            <span class="main_titre">{{$titre_etat}}</span>
        </div>

    </div>
        <table class="styled-table" >
        <thead>

        <tr>
            <th>N°</th>
            <th>Matricule</th>
            <th>Photo</th>
            <th>Nom et Prenom</th>
            <th>Genre</th>
            <th>Numero</th>



{{--{{asset("/image/contribuable")}}/{{$item->photo}}--}}
        </tr>

        </thead>
        <tbody>
        @php $i = 1; @endphp
        @foreach($data as $item)

        <tr >
            <td>{{$i}}</td>
            <td>{{$item->matricule}}</td>
            <td><img height="24px" width="24px" src="{{asset("/storage/photo/collecteur")}}/{{$item->photo}}"></td>
            <td>{{$item->nom. " ". $item->prenom}} </td>

            <td> {{ $item->genre == 'H' ?  "HOMME" : "FEMME"   }} </td>
            <td>{{$item->numero}}</td>
        </tr>
        @php $i++; @endphp
        @endforeach
        </tbody>
    </table>

@stop
