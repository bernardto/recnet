@extends("home_print")
@section('content')





    <div  style="margin-left: 5%; margin-right: 5%; text-align: center; border-color: black; padding: 15px ; border: 1px solid" >
        <span class="main_titre">HISTORIQUE DES VERSEMENTS DU COLLECTEUR</span>


        <div  style="text-align: initial">
            <img width="50" height="50"  style="border: 1px solid black" src="{{asset("/storage/photo/collecteur")}}/{{$collecteur->photo}}">

            <div style="margin-left: 13px">
                <p ><span class="bold">Nom :</span> {{$collecteur->nom}} <br></p>
                <p><span class="bold"> Contact : </span>{{$collecteur->contact}}  </p>
            </div>




        </div>
        <span style="word-break: keep-all;">Versement du  <span class="bold">{{$date_d}}</span>  Au <span class="bold"> {{$date_f}} </span></span>
    </div>

    <table class="styled-table" >
        <thead>


        <tr>
            <th>N°</th>
            <th>Date</th>

            <th>Montant versé</th>

        </tr>


            {{--{{asset("/image/contribuable")}}/{{$item->photo}}--}}


        </thead>
        <tbody>
        @php $i = 1; ; $total = 0;  @endphp
        @foreach($data as $item)

            <tr >
                <td>{{$i}}</td>
                <td>{{$item->date}}</td>

                <td>{{$item->montant}}</td>

            </tr>
            @php $i++; $total = (float ) $total + $item->montant @endphp
        @endforeach
        <tr>
            <td class="bold">TOTAL</td>
            <td ></td>
            <td >{{$total}} CFA</td>

        </tr>
        </tbody>
    </table>

@stop
