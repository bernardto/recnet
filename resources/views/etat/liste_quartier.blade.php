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
            <th>Identifiant</th>
            <th>Nom du quartier</th>
            <th>Zone du quartier</th>

            {{--{{asset("/image/contribuable")}}/{{$item->photo}}--}}
        </tr>

        </thead>
        <tbody>
        @php $i = 1;  @endphp
        @foreach($data as $item)

            <tr >
                <td>{{$i}}</td>
                <td>{{$item->identifiant}}</td>
                <td>{{$item->lib}} </td>
                <td>{{$item->zone}}</td>


            </tr>
            @php $i++;  @endphp
        @endforeach
        </tbody>
    </table>

@stop
