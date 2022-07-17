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
            <th>Numero</th>
            <th>Activité(s)</th>
            <th>Montant</th>

{{--{{asset("/image/contribuable")}}/{{$item->photo}}--}}
        </tr>

        </thead>
        <tbody>
        @php $i = 1; $total = 0; @endphp
        @foreach($data as $item)

        <tr >
            <td>{{$i}}</td>
            <td>{{$item->matricule}}</td>
            <td><img height="24px" width="24px" src="{{asset("/image/contribuable")}}/{{$item->photo}}"></td>
            <td>{{$item->nom. " ". $item->prenom}} </td>
            <td>{{$item->numero}}</td>
            <td>@foreach($item->activite as $act  ) {{ $act->lib}}; @endforeach </td>
            <td> {{$item->montant}} </td>


        </tr>
        @php $i++; $total = (float ) $total + $item->montant @endphp
        @endforeach
        <tr>
            <td style="font-weight: bold">TOTAL</td>
            <td COLSPAN="5"></td>
            <td>{{$total}} CFA</td>

        </tr>
        </tbody>
    </table>

@stop
