<!DOCTYPE html>
<html>
@include("print.header")
<body>



    <div style="margin-bottom: 40px" >


        <span  >{{ Config::get('website.config.nom')}} </span>



        <span  style="float: right">{{$date}}</span>

    </div>






    @yield("content")




@include("print.footer")



</script>

</body>
</html>
